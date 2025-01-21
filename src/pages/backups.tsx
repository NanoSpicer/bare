import { PillBadge } from "@components/Badges";
import { Table, TableBody, TableCell, TableRow } from "@components/Table";
import { Html } from "@elysiajs/html";
import Download from "@icons/Download";
import Trash from "@icons/Trash";
import { getFiles } from "../data/uploads";
import PageLayout, { PageTitle } from "./PageLayout";
import type { PageContext } from "./page-context";


function format(date: Date): string {
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/')
}

interface BackupsPageProps {
  context: PageContext
  files: Awaited<ReturnType<typeof getFiles>>
}

export default function BackupsPage({
  context,
  files
}: BackupsPageProps) {
  const token = context.adminToken

  return (
    <PageLayout
      pageTitle={
        <PageTitle>
          Listado de backups
        </PageTitle>
      }
      context={context}>
      <Table
        className="px-4"
        headers={['Nombre original', 'Etiquetas', 'Fecha creación', 'Acciones']}>

        <TableBody hx-confirm="¿Estás seguro de que quieres eliminar este backup?" hx-target="closest tr" >
          {files.map(file => (
            <TableRow key={file.id}>
              <TableCell highlight>
                {file.name}
              </TableCell>
              <TableCell>
                {
                  file.tags.length > 0
                    ? file.tags.map(({ tag }) => <PillBadge text={tag} />)
                    : 'Sin etiquetas'
                }
              </TableCell>
              <TableCell>
                {format(file.createdAt)}
              </TableCell>
              <TableCell className="flex flex-row items-center gap-x-2">
                <a
                  class="flex flex-row items-center mr-2 border border-blue-400 text-blue-400 rounded-full text-sm p-1.5 hover:text-white hover:bg-blue-500"
                  download={file.name}
                  href={`/api/uploads/${file.id}?api_token=${token.token}`}>
                  <Download />
                </a>
                <button
                  hx-delete={`/api/uploads/${file.id}?api_token=${token.token}`}
                  class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-red-800"
                  type="button">
                  <Trash />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  )
}