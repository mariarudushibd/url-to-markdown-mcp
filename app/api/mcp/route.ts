import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';

const handler = createMcpHandler((server) => {
  server.tool(
    'url_to_markdown',
    'Fetches a webpage and converts it to clean Markdown format',
    {
      url: z.string().url().describe('The URL of the webpage to convert'),
      include_title: z.boolean().optional().default(true).describe('Include page title as H1'),
      include_source: z.boolean().optional().default(true).describe('Include source URL reference'),
    },
    async ({ url, include_title, include_source }) => {
      try {
        const response = await fetch(url, { headers: { 'User-Agent': 'UrlToMarkdownMCP/1.0' } });
        if (!response.ok) return { content: [{ type: 'text', text: `Error: HTTP ${response.status}` }], isError: true };
        const html = await response.text();
        let markdown = '';
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : '';
        if (include_title && title) markdown += `# ${title}\n\n`;
        if (include_source) markdown += `> Source: ${url}\n\n`;
        let content = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) content = bodyMatch[1];
        content = content
          .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n')
          .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
          .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
          .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
          .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
          .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '_$2_')
          .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
          .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
          .replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/\n{3,}/g, '\n\n').trim();
        markdown += content;
        return { content: [{ type: 'text', text: markdown }] };
      } catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error instanceof Error ? error.message : 'Unknown'}` }], isError: true };
      }
    }
  );

  server.tool(
    'parse_url',
    'Parses a URL and returns its components',
    { url: z.string().describe('The URL to parse') },
    async ({ url }) => {
      try {
        const parsed = new URL(url);
        const params: Record<string, string> = {};
        parsed.searchParams.forEach((v, k) => { params[k] = v; });
        return { content: [{ type: 'text', text: `## URL Components\n\n**href**: ${parsed.href}\n**protocol**: ${parsed.protocol}\n**hostname**: ${parsed.hostname}\n**pathname**: ${parsed.pathname}\n**search**: ${parsed.search || '(none)'}\n**hash**: ${parsed.hash || '(none)'}\n**origin**: ${parsed.origin}\n**params**: ${JSON.stringify(params)}` }] };
      } catch (e) {
        return { content: [{ type: 'text', text: `Error: Invalid URL` }], isError: true };
      }
    }
  );

  server.tool(
    'build_url',
    'Constructs a URL from components',
    {
      base: z.string().url().describe('Base URL'),
      pathname: z.string().optional().describe('Path'),
      params: z.record(z.string()).optional().describe('Query params'),
      hash: z.string().optional().describe('Hash'),
    },
    async ({ base, pathname, params, hash }) => {
      try {
        const url = new URL(base);
        if (pathname) url.pathname = pathname;
        if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
        if (hash) url.hash = hash;
        return { content: [{ type: 'text', text: `**Built URL**: ${url.toString()}` }] };
      } catch (e) {
        return { content: [{ type: 'text', text: `Error building URL` }], isError: true };
      }
    }
  );

  server.tool(
    'validate_url',
    'Validates if a string is a valid URL',
    { url: z.string().describe('URL to validate') },
    async ({ url }) => {
      try { new URL(url); return { content: [{ type: 'text', text: `Valid URL: ${url}` }] }; }
      catch { return { content: [{ type: 'text', text: `Invalid URL: ${url}` }] }; }
    }
  );

  server.tool(
    'extract_links',
    'Extracts all links from a webpage',
    {
      url: z.string().url().describe('URL to extract links from'),
      limit: z.number().optional().default(50).describe('Max links'),
    },
    async ({ url, limit }) => {
      try {
        const response = await fetch(url, { headers: { 'User-Agent': 'UrlToMarkdownMCP/1.0' } });
        if (!response.ok) return { content: [{ type: 'text', text: `Error: HTTP ${response.status}` }], isError: true };
        const html = await response.text();
        const baseUrl = new URL(url);
        const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
        const links: { href: string; text: string }[] = [];
        let match;
        while ((match = linkRegex.exec(html)) !== null && links.length < limit) {
          let href = match[1];
          if (!href || href.startsWith('javascript:') || href.startsWith('#')) continue;
          if (href.startsWith('/')) href = `${baseUrl.origin}${href}`;
          else if (!href.startsWith('http')) href = new URL(href, url).toString();
          links.push({ href, text: match[2].trim() || href });
        }
        const md = links.map((l, i) => `${i + 1}. [${l.text}](${l.href})`).join('\n');
        return { content: [{ type: 'text', text: `## Links (${links.length})\n\n${md}` }] };
      } catch (e) {
        return { content: [{ type: 'text', text: `Error: ${e instanceof Error ? e.message : 'Unknown'}` }], isError: true };
      }
    }
  );
});

export { handler as GET, handler as POST, handler as DELETE };