import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

const log = (message: string) => {
  console.log(`[dev] ${message}`);
};

const copyStatic = () => {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.copyFileSync('index.html', path.join(DIST_DIR, 'index.html'));
  if (fs.existsSync('public')) {
    fs.cpSync('public', path.join(DIST_DIR, 'public'), { recursive: true });
  }
  log('Static assets copied');
};

const buildResult = await Bun.build({
  entrypoints: ['src/main.tsx'],
  outdir: DIST_DIR,
  target: 'browser',
  minify: false,
  publicPath: '/',
  sourcemap: 'inline',
  watch: {
    onRebuild(error, result) {
      if (error) {
        console.error(error);
        return;
      }
      if (result?.success) {
        copyStatic();
        log('Rebuilt');
      }
    },
  },
});

if (!buildResult.success) {
  buildResult.logs.forEach(({ message }) => console.error(message));
  process.exit(1);
}

copyStatic();

const startServer = () => {
  const preferred = Number(process.env.PORT) || 3000;
  const maxAttempts = 10;

  for (let i = 0; i < maxAttempts; i += 1) {
    const port = preferred + i;
    try {
      const srv = Bun.serve({
        port,
        hostname: '127.0.0.1',
        async fetch(req) {
          const url = new URL(req.url);
          const relativePath =
            url.pathname === '/' || url.pathname === '/index.html'
              ? 'index.html'
              : url.pathname.slice(1);
          const filePath = path.join(DIST_DIR, relativePath);

          try {
            const file = Bun.file(filePath);
            if (await file.exists()) {
              return new Response(file);
            }src
          } catch (error) {
            console.error(error);
          }

          return new Response('Not found', { status: 404 });
        },
      });

      log(`Server running at http://${srv.hostname}:${srv.port}`);
      return srv;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        const code = (error as { code: string }).code;
        if (code === 'EADDRINUSE') {
          log(`Port ${port} in use, trying ${port + 1}...`);
          continue;
        }
        console.error('Server start error', error);
      }
      throw error;
    }
  }

  throw new Error('Could not start dev server after trying multiple ports');
};

const server = startServer();

// Watch static sources for manual copies
fs.watch('index.html', { persistent: false }, copyStatic);
if (fs.existsSync('public')) {
  fs.watch('public', { recursive: true, persistent: false }, copyStatic);
}
