import { Client } from 'pg';
import type { User } from './User';

// Odpowiednik UserRepository.java — JDBC zastąpione przez `pg` (node-postgres)
export class UserRepository {
  constructor(private readonly client: Client) {}

  async createTable(): Promise<void> {
    await this.client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id    SERIAL PRIMARY KEY,
        name  VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      )
    `);
  }

  async insertUser(name: string, email: string): Promise<void> {
    await this.client.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      [name, email]
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.client.query<User>(
      'SELECT id, name, email FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] ?? null;
  }

  async countUsers(): Promise<number> {
    const result = await this.client.query<{ count: string }>('SELECT COUNT(*) FROM users');
    return parseInt(result.rows[0].count, 10);
  }
}