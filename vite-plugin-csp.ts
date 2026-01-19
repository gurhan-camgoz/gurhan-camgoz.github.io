export default function cspPlugin() {
  return {
    name: 'vite-plugin-csp',
    transformIndexHtml(html: string) {
      return html.replace(
        '<head>',
        `<head>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval'">`
      );
    }
  };
}