import express from 'express';
import http from 'http';
import { Server as WSServer } from 'ws';
import { YjsWebSocketServer } from './services/YjsWebSocketServer';
import { sequelize } from './db/config';

class Application {
  private app: express.Application;
  private server: http.Server;
  private wss: WSServer;
  private yjsWSServer: YjsWebSocketServer;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.wss = new WSServer({ server: this.server });

    this.yjsWSServer = new YjsWebSocketServer(this.wss);

    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use((req, res, next) => {
      res.locals.yjsWSServer = this.yjsWSServer;
      next();
    });
  }

  private setupRoutes(): void {
    this.app.get('/health', (_, res) => {
      res.json({ status: 'ok' });
    });

    this.app.get('/ws-status', (_, res) => {
      const clientsCount = this.wss.clients.size;
      const documentsCount = this.yjsWSServer.getActiveDocumentsCount();

      res.json({
        status: 'ok',
        websocket_clients: clientsCount,
        active_documents: documentsCount,
      });
    });
  }

  private setupErrorHandling(): void {
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Unhandled error:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
  }

  public async start(): Promise<void> {
    try {
      await sequelize.sync();

      const PORT = process.env.PORT || 3000;

      this.server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`WebSocket server is ready for connections`);
      });

      this.setupGracefulShutdown();
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(): void {
    const shutdown = async () => {
      console.log('Shutdown signal received');

      this.wss.close(() => {
        console.log('WebSocket server closed');
      });

      await this.yjsWSServer.shutdown();

      this.server.close(() => {
        console.log('HTTP server closed');

        sequelize.close().then(() => {
          console.log('Database connection closed');
          process.exit(0);
        });
      });

      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  }

  public getYjsServer(): YjsWebSocketServer {
    return this.yjsWSServer;
  }
}

const app = new Application();
app.start().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

export default app;
