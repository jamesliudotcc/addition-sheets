import fs from "fs";
import path from "path";

const DIST_DIR = path.resolve("dist");

const log = (message: string) => {
  console.log(`[dev] ${message}`);
};

const copyStatic = () => {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.copyFileSync("index.html", path.join(DIST_DIR, "index.html"));
  if (fs.existsSync("public")) {
    fs.cpSync("public", path.join(DIST_DIR, "public"), { recursive: true });
  }
  log("Static assets copied");
};

const eventControllers = new Set<ReadableStreamDefaultController<Uint8Array>>();
const encoder = new TextEncoder();

const notifyReload = () => {
  const payload = encoder.encode("data: reload\n\n");
  for (const controller of eventControllers) {
    try {
      controller.enqueue(payload);
    } catch (error) {
      console.error("Failed to enqueue reload event", error);
    }
  }
};

const buildResult = await Bun.build({
  entrypoints: ["src/main.tsx"],
  outdir: DIST_DIR,
  target: "browser",
  minify: false,
  publicPath: "/",
  sourcemap: "inline",
  watch: {
    onRebuild(error, result) {
      if (error) {
        console.error(error);
        return;
      }
      if (result?.success) {
        copyStatic();
        log("Rebuilt");
        notifyReload();
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
  const candidatePorts = Array.from({ length: 10 }, (_, i) => preferred + i);
  // Final fallback lets the OS pick an open port so we do not fail when the range is busy.
  candidatePorts.push(0);

  for (const port of candidatePorts) {
    try {
      const srv = Bun.serve({
        port,
        hostname: "127.0.0.1",
        async fetch(req) {
          const url = new URL(req.url);

          if (url.pathname === "/") {
            return Response.redirect(`${url.origin}/addition`, 302);
          }

          if (url.pathname === "/dev-hmr") {
            const { signal } = req;
            return new Response(
              new ReadableStream<Uint8Array>({
                start(controller) {
                  eventControllers.add(controller);
                  signal.addEventListener(
                    "abort",
                    () => {
                      eventControllers.delete(controller);
                    },
                    { once: true },
                  );
                },
              }),
              {
                status: 200,
                headers: {
                  "Content-Type": "text/event-stream",
                  "Cache-Control": "no-cache",
                  Connection: "keep-alive",
                },
              },
            );
          }

          const relativePath =
            url.pathname === "/" || url.pathname === "/index.html"
              ? "index.html"
              : url.pathname.slice(1);
          const filePath = path.join(DIST_DIR, relativePath);

          try {
            const file = Bun.file(filePath);
            if (await file.exists()) {
              return new Response(file);
            }
          } catch (error) {
            console.error(error);
          }

          const acceptsHtml = req.headers.get("accept")?.includes("text/html");
          if (acceptsHtml) {
            const indexFile = Bun.file(path.join(DIST_DIR, "index.html"));
            if (await indexFile.exists()) {
              return new Response(indexFile, {
                headers: { "Content-Type": "text/html" },
              });
            }
          }

          return new Response("Not found", { status: 404 });
        },
      });

      log(`Server running at http://${srv.hostname}:${srv.port}`);
      return srv;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error) {
        const code = (error as { code: string }).code;
        if (code === "EADDRINUSE") {
          log(
            port === 0
              ? "Requested ephemeral port but it was unavailable, trying next..."
              : `Port ${port} in use, trying ${port + 1}...`,
          );
          continue;
        }
        console.error("Server start error", error);
      }
      throw error;
    }
  }

  throw new Error("Could not start dev server after trying multiple ports");
};

const server = startServer();

// Watch static sources for manual copies
fs.watch("index.html", { persistent: false }, copyStatic);
if (fs.existsSync("public")) {
  fs.watch("public", { recursive: true, persistent: false }, copyStatic);
}
