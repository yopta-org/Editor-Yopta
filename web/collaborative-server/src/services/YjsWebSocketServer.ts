import { WebSocket, Server as WSServer } from 'ws';
import * as Y from 'yjs';
import { DocumentsService } from './DocumentsService';

enum MessageType {
  SYNC = 0,
  AWARENESS = 1,
  AUTH = 2,
}

export class YjsWebSocketServer {
  private documentManager: DocumentsService;

  constructor(wss: WSServer) {
    this.documentManager = new DocumentsService();

    wss.on('connection', this.handleConnection.bind(this));
  }

  private async handleConnection(ws: WebSocket, req: any) {
    const docId = this.getDocumentId(req.url);
    if (!docId) {
      ws.close();
      return;
    }

    const doc = await this.documentManager.getDocument(docId);
    const awareness = this.documentManager.getAwareness(docId);

    const clientState = {
      ws,
      doc,
      await: awareness,
      subscribedToDoc: false,
      closed: false,
    };

    ws.on('message', async (message: Buffer) => {
      await this.handleMessage(message, clientState, docId);
    });

    ws.on('close', () => {
      this.handleClose(clientState, docId);
    });

    this.sendSync(ws, doc);
  }

  private async handleMessage(message: Buffer, state: any, docId: string) {
    const messageType = message[0];

    switch (messageType) {
      case MessageType.SYNC: {
        if (!state.subscribedToDoc) {
          state.subscribedToDoc = true;
          state.doc.on('update', (update: Uint8Array, origin: any) => {
            if (origin !== state) {
              this.sendUpdate(state.ws, update);
            }
          });
        }

        const update = message.slice(1);
        Y.applyUpdate(state.doc, update, state);

        await this.documentManager.saveDocument(docId);
        break;
      }

      case MessageType.AWARENESS: {
        const awarenessUpdate = message.slice(1);
        state.await.forEach((client: any) => {
          if (client !== state) {
            try {
              client.ws.send(message);
            } catch (e) {}
          }
        });
        break;
      }
    }
  }

  private handleClose(state: any, docId: string) {
    state.closed = true;
    state.await.delete(state);

    if (state.subscribedToDoc) {
      state.doc.off('update', null);
    }

    const awareness = this.documentManager.getAwareness(docId);
    awareness.forEach((client: any) => {
      if (client !== state && !client.closed) {
        try {
          const message = new Uint8Array([MessageType.AWARENESS]);
          client.ws.send(message);
        } catch (e) {}
      }
    });
  }

  private sendSync(ws: WebSocket, doc: Y.Doc) {
    try {
      const stateVector = Y.encodeStateVector(doc);
      const message = new Uint8Array(1 + stateVector.length);
      message[0] = MessageType.SYNC;
      message.set(stateVector, 1);
      ws.send(message);
    } catch (e) {
      console.error('Error sending sync message:', e);
    }
  }

  private sendUpdate(ws: WebSocket, update: Uint8Array) {
    try {
      const message = new Uint8Array(1 + update.length);
      message[0] = MessageType.SYNC;
      message.set(update, 1);
      ws.send(message);
    } catch (e) {
      console.error('Error sending update:', e);
    }
  }

  private getDocumentId(url: string): string | null {
    const match = /\/document\/([^/]+)/.exec(url);
    return match ? match[1] : null;
  }

  public getActiveDocumentsCount(): number {
    return this.documentManager.getActiveDocumentsCount();
  }

  public async shutdown(): Promise<void> {
    console.log('Shutting down YjsWebSocketServer...');

    const savePromises = Array.from(this.documentManager.documents.keys()).map((docId) =>
      this.documentManager.saveDocument(docId),
    );

    try {
      await Promise.all(savePromises);
      console.log('All documents saved successfully');
    } catch (error) {
      console.error('Error saving documents during shutdown:', error);
    }
  }

  public async getDocumentInfo(docId: string): Promise<any> {
    const doc = await this.documentManager.getDocument(docId);
    const awareness = this.documentManager.getAwareness(docId);

    return {
      clientsCount: awareness.size,
      updateCount: doc.store.getState().clock.timestamp,
      lastModified: new Date(),
    };
  }
}
