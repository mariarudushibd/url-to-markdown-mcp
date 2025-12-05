export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)',
      color: '#e4e4e7',
      padding: '2rem',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        background: 'linear-gradient(90deg, #f97316, #eab308)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem',
      }}>
        URL to Markdown MCP Server
      </h1>
      <p style={{ color: '#a1a1aa', marginBottom: '2rem', textAlign: 'center' }}>
        Model Context Protocol server for agentic URL processing
      </p>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
      }}>
        <h2 style={{ color: '#f97316', marginBottom: '1rem', fontSize: '1.25rem' }}>Available Tools</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            { name: 'url_to_markdown', desc: 'Convert webpage to Markdown' },
            { name: 'parse_url', desc: 'Parse URL into components' },
            { name: 'build_url', desc: 'Build URL from components' },
            { name: 'validate_url', desc: 'Validate URL format' },
            { name: 'extract_links', desc: 'Extract all links from page' },
          ].map((tool) => (
            <li key={tool.name} style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              borderLeft: '3px solid #f97316',
            }}>
              <code style={{ color: '#a78bfa', fontWeight: 600 }}>{tool.name}</code>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', margin: '0.25rem 0 0' }}>{tool.desc}</p>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#0d0d14', borderRadius: '8px' }}>
          <h3 style={{ color: '#22d3ee', marginBottom: '0.5rem', fontSize: '0.9rem' }}>MCP Endpoint</h3>
          <code style={{ display: 'block', color: '#4ade80', fontSize: '0.85rem' }}>https://your-domain.vercel.app/api/mcp</code>
        </div>
      </div>
      <footer style={{ marginTop: '2rem', color: '#6b7280', fontSize: '0.85rem' }}>Author: Likhon Sheikh</footer>
    </main>
  );
}