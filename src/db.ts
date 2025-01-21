import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './database/schema'

const sqlite = new Database('sqlite.db');
export const db = drizzle({ client: sqlite, schema });
