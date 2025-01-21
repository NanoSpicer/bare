import { sql } from "drizzle-orm";
import { primaryKey, text, sqliteTable, blob, integer } from "drizzle-orm/sqlite-core";

export const files = sqliteTable('files', {
  id: text('id').notNull().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  contents: blob('contents', { mode: 'buffer' }).notNull(),
})

export const tags = sqliteTable('tags', {
  tag: text('tag').notNull().primaryKey(),
})

export const taggedFiles = sqliteTable('tagged_files', {
  tag: text('tag').notNull().references(() => tags.tag),
  fileId: text('file_id').notNull().references(() => files.id),
}, table => ({
  pk: primaryKey({
    columns: [table.fileId, table.tag]
  })
}))


/**
 * Access tokens to determine whether an app has access to the API
 */
export const apiTokens = sqliteTable('api_tokens', {
  id: text('id').notNull().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  name: text('name').notNull().unique(),
  token: text('token').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})