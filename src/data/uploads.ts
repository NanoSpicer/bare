import { tags } from '../database/schema';
import { getTableColumns, desc, eq } from "drizzle-orm"
import { files, taggedFiles } from "../database/schema"
import { db } from "../db"

export async function getFiles() {
  const { contents, ...columnsWithoutContents } = getTableColumns(files)
  const entries = await db.select(columnsWithoutContents).from(files).orderBy(
    desc(files.createdAt)
  )
  return Promise.all(entries.map(async it => {
    const tags = await db.select({ tag: taggedFiles.tag }).from(taggedFiles).where(
      eq(taggedFiles.fileId, it.id)
    )
    return {
      ...it,
      tags
    }
  }))
}

export async function deleteFileById(id: string) {
  await db.delete(files).where(
    eq(files.id, id)
  )
}


export async function getFileById(id: string) {
  const [file] = await db.select().from(files).where(
    eq(files.id, id)
  )
  return file
}

interface SaveFileOptions {
  file: File,
  meta: {
    tags: string[]
  }
}

export function saveFile({ file, meta }: SaveFileOptions) {
  return db.transaction(async t => {
    const [row] = await (db
      .insert(files).values({
        name: file.name,
        type: file.type,
        contents: Buffer.from(await file.arrayBuffer())
      })
      .returning({
        id: files.id
      })
    )

    await t.insert(taggedFiles).values(meta.tags.map(tag => ({
      fileId: row.id,
      tag
    })))

    return row
  })
}