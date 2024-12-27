import * as Y from 'yjs';
import { sequelize } from '@/db/config';
import { Document } from '@/db/models/Document';

export class DocumentsService {
  private documents: Map<string, Y.Doc>;
  private awareness: Map<string, Set<any>>;

  constructor() {
    this.documents = new Map();
    this.awareness = new Map();
  }

  async getDocument(documentId: string): Promise<Y.Doc> {
    let doc = this.documents.get(documentId);

    if (!doc) {
      doc = new Y.Doc();

      const savedDoc = await Document.findByPk(documentId);
      if (savedDoc && savedDoc.ydoc_state) {
        Y.applyUpdate(doc, savedDoc.ydoc_state);
      }

      this.documents.set(documentId, doc);
      this.awareness.set(documentId, new Set());
    }

    return doc;
  }

  async saveDocument(documentId: string): Promise<void> {
    const doc = this.documents.get(documentId);
    if (!doc) return;

    const update = Y.encodeStateAsUpdate(doc);

    await Document.update(
      {
        ydoc_state: Buffer.from(update),
        version: sequelize.literal('version + 1'),
      },
      {
        where: { id: documentId },
      },
    );
  }

  getAwareness(documentId: string): Set<any> {
    let awarenessSet = this.awareness.get(documentId);
    if (!awarenessSet) {
      awarenessSet = new Set();
      this.awareness.set(documentId, awarenessSet);
    }
    return awarenessSet;
  }

  getActiveDocumentsCount(): number {
    return this.documents.size;
  }
}
