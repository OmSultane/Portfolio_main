import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables into process.env so server-side handler has access
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(env)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'ai-chat-api-plugin',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk: Buffer) => {
                body += chunk.toString();
                if (body.length > 50000) {
                  res.statusCode = 413;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Payload too large' }));
                  req.destroy();
                }
              });

              req.on('end', async () => {
                try {
                  const parsed = JSON.parse(body || '{}');
                  const clientIp = req.socket.remoteAddress || '127.0.0.1';
                  const { handleAIChatRequest } = await import('./server/aiHandler.ts');
                  const result = await handleAIChatRequest(parsed, clientIp);
                  res.statusCode = result.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(result.data));
                } catch (err: unknown) {
                  const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
                  console.error('API Error in dev server:', errorMessage);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: errorMessage }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
  };
});
