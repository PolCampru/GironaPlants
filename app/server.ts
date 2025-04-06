import next from "next";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3040;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
      try {
        const parsedUrl = parse(req.url || "", true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error al manejar la solicitud:", err);
        res.statusCode = 500;
        res.end("Error interno del servidor");
      }
    }
  );

  server
    .listen(port, () => {
      console.log(`> Servidor listo en http://${hostname}:${port}`);
    })
    .on("error", (err: Error) => {
      console.error("Error del servidor:", err);
    });
});
