import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './database/schema'
import { configuration } from '@configuration';

const sqlite = new Database(configuration.DB_PATH)
export const db = drizzle({ client: sqlite, schema });
