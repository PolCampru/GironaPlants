import next from "next";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3040;

// Enhanced logging for production
const log = (level: 'info' | 'error' | 'warn', message: string, meta?: any) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(meta && { meta }),
    pid: process.pid,
    hostname: process.env.HOSTNAME || 'unknown',
  };

  if (dev) {
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, meta || '');
  } else {
    // Structured logging for production
    console.log(JSON.stringify(logEntry));
  }
};

const app = next({ 
  dev, 
  hostname, 
  port,
  // Enable compression in production
  conf: {
    compress: !dev,
    poweredByHeader: false,
    generateEtags: true,
  }
});

const handle = app.getRequestHandler();

let httpServer: ReturnType<typeof createServer> | null = null;

function gracefulShutdown(signal: string) {
  log('info', `Received ${signal}, starting graceful shutdown`);
  
  if (httpServer) {
    httpServer.close((err) => {
      if (err) {
        log('error', 'Error during server close', { error: err.message });
        process.exit(1);
      }
      log('info', 'Server closed successfully');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }

  setTimeout(() => {
    log('error', 'Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
}

app.prepare().then(() => {
  const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
      const startTime = Date.now();
      
      try {
        // Add request ID for tracing
        const requestId = Math.random().toString(36).substring(2, 15);
        (req as any).requestId = requestId;

        // Security headers (additional to Next.js headers)
        res.setHeader('Server', 'GironaPlants/1.0');
        res.setHeader('X-Request-ID', requestId);

        const parsedUrl = parse(req.url || "", true);
        
        // Health check bypass for load balancers
        if (parsedUrl.pathname === '/health') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
          }));
          return;
        }

        await handle(req, res, parsedUrl);

        // Log successful requests in production
        if (!dev) {
          const duration = Date.now() - startTime;
          log('info', 'Request processed', {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.headers['user-agent'],
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            requestId,
          });
        }
      } catch (err) {
        const duration = Date.now() - startTime;
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        
        log('error', 'Request processing error', {
          error: errorMessage,
          stack: err instanceof Error ? err.stack : undefined,
          method: req.method,
          url: req.url,
          duration: `${duration}ms`,
          requestId: (req as any).requestId,
        });

        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end(dev ? errorMessage : 'Internal Server Error');
        }
      }
    }
  );

  httpServer = server;

  server.timeout = 30000;

  server.keepAliveTimeout = 5000; // 5 seconds
  server.headersTimeout = 6000; // 6 seconds

  server
    .listen(port, hostname, () => {
      log('info', `Server ready`, {
        url: `http://${hostname}:${port}`,
        environment: dev ? 'development' : 'production',
        nodeVersion: process.version,
      });
    })
    .on("error", (err: Error) => {
      log('error', 'Server error', { error: err.message, stack: err.stack });
      process.exit(1);
    });

  // Handle graceful shutdown
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle uncaught exceptions and promise rejections
  process.on('uncaughtException', (err) => {
    log('error', 'Uncaught exception', { error: err.message, stack: err.stack });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    log('error', 'Unhandled promise rejection', { 
      reason: reason instanceof Error ? reason.message : String(reason),
      stack: reason instanceof Error ? reason.stack : undefined,
    });
  });
}).catch((err) => {
  log('error', 'Failed to start server', { error: err.message, stack: err.stack });
  process.exit(1);
});
