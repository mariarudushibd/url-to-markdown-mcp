export const metadata = {
  title: 'URL to Markdown MCP Server',
  description: 'MCP Server for converting URLs to Markdown - By Likhon Sheikh',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}