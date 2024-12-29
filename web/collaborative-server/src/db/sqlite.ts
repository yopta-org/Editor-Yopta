import { Database } from 'sqlite3';
import { open } from 'sqlite';

export class SqliteDB {
  private db: any;

  async initialize() {
    this.db = await open({
      filename: 'db.sqlite',
      driver: Database,
    });

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS documents (
        name TEXT PRIMARY KEY,
        content TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async getDocument(name: string) {
    const row = await this.db.get('SELECT content FROM documents WHERE name = ?', [name]);

    if (row) {
      return JSON.parse(row.content);
    }
    return null;
  }

  async saveDocument(name: string, content: any) {
    const contentString = JSON.stringify(content);

    await this.db.run(
      `INSERT INTO documents (name, content) 
       VALUES (?, ?)
       ON CONFLICT(name) DO UPDATE SET 
       content = ?, 
       updated_at = CURRENT_TIMESTAMP`,
      [name, contentString, contentString],
    );
  }
}
