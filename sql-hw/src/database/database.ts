import pkg from 'pg';
import dotenv from 'dotenv'

const { Pool } = pkg;

dotenv.config();

export default class Database {
  private pool: pkg.Pool;

  constructor() {
    const port = +(process.env.PORT || '5432');

    this.pool = new Pool({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.NAME,
      password: process.env.PASSWORD,
      port: port,
    });
  }

  async query(queryString: string, params?: any[]): Promise<any[]> {
    try {
      const client = await this.pool.connect();
      const result = await client.query(queryString, params);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }

  close(): void {
    this.pool.end();
  }
}
