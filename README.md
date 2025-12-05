# URL to Markdown MCP Server

A **Model Context Protocol (MCP)** server for converting URLs to Markdown, built for deployment on Vercel. Perfect for agentic AI workflows.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mariarudushibd/url-to-markdown-mcp)

## Features

| Tool | Description |
|------|-------------|
| `url_to_markdown` | Convert any webpage to clean Markdown |
| `parse_url` | Parse URL into components (protocol, host, path, etc.) |
| `build_url` | Construct URLs from components |
| `validate_url` | Check if a URL is valid |
| `extract_links` | Extract all links from a webpage |

## Quick Start

### Deploy to Vercel

1. Click the "Deploy with Vercel" button above
2. Your MCP server will be available at `https://your-project.vercel.app/api/mcp`

### Local Development

```bash
npm install
npm run dev
npx @modelcontextprotocol/inspector@latest http://localhost:3000
```

## Usage with AI Assistants

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "url-to-markdown": {
      "url": "https://your-project.vercel.app/api/mcp"
    }
  }
}
```

### Claude Desktop

```json
{
  "mcpServers": {
    "url-to-markdown": {
      "url": "https://your-project.vercel.app/api/mcp"
    }
  }
}
```

## Author

**Likhon Sheikh**

## License

MIT
