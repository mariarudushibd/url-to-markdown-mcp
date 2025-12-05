# URL to Markdown MCP Server

A **Model Context Protocol (MCP)** server for converting URLs to Markdown. Built for agentic AI workflows.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mariarudushibd/url-to-markdown-mcp)

## Live Endpoint

```
https://url-to-markdown-mcp.vercel.app/api/mcp
```

## Tools

| Tool | Description |
|------|-------------|
| `url_to_markdown` | Convert webpage to Markdown |
| `parse_url` | Parse URL components |
| `build_url` | Construct URL from parts |
| `validate_url` | Check URL validity |
| `extract_links` | Extract all page links |

## Setup

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "url-to-markdown": {
      "url": "https://url-to-markdown-mcp.vercel.app/api/mcp"
    }
  }
}
```

### Claude Desktop

```json
{
  "mcpServers": {
    "url-to-markdown": {
      "url": "https://url-to-markdown-mcp.vercel.app/api/mcp"
    }
  }
}
```

### Test with Inspector

```bash
npx @modelcontextprotocol/inspector@latest https://url-to-markdown-mcp.vercel.app
```

## Local Development

```bash
npm install
npm run dev
```

## Author

**Likhon Sheikh**

## License

MIT
