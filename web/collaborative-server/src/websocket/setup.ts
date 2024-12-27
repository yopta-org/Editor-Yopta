// src/websocket/setup.ts
import * as Y from 'yjs';
import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { Awareness } from 'y-protocols/awareness';

interface SetupWSOptions {
  docName: string;
  gc?: boolean;
  persist?: {
    provider: {
      bindState?: (docName: string, doc: Y.Doc) => Promise<void>;
      writeState?: (docName: string, doc: Y.Doc) => Promise<void>;
    };
  };
}

export function setupWSConnection(ws: WebSocket, req: IncomingMessage, options: SetupWSOptions) {
  const { docName, persist } = options;

  const awareness = new Awareness(options.persist?.provider as any);

  ws.on('message', async (message: Buffer) => {
    try {
      const data = JSON.parse(message.toString());

      switch (data.type) {
        case 'sync': {
          if (persist?.provider?.writeState) {
            await persist.provider.writeState(docName, data.content);
          }
          broadcast({
            type: 'sync',
            content: data.content,
          });
          break;
        }

        case 'awareness': {
          awareness.setLocalState(data.state);
          break;
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  function broadcast(message: any) {
    const messageString = JSON.stringify(message);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  }

  ws.on('close', () => {
    awareness.setLocalState(null);
  });

  if (persist?.provider?.bindState) {
    persist.provider.bindState(docName, options.persist?.provider as any);
  }
}
