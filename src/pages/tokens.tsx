import { Html } from "@elysiajs/html";
import type { PageContext } from "./page-context";
import PageLayout, { PageTitle } from "./PageLayout";
import { PillBadge } from "@components/Badges";
import Download from "@components/icons/Download";
import Trash from "@components/icons/Trash";
import { Table, TableRow, TableCell, TableBody } from "@components/Table";
import { files } from "../database/schema";
import { getTokens } from "../data/api-tokens";
import Button from "@components/Button";

interface TokensPageProps {
  context: PageContext
  tokens: Awaited<ReturnType<typeof getTokens>>
}
function format(date: Date): string {
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/')
}

export default async function TokensPage(props: TokensPageProps) {
  const token = props.context.adminToken
  const tokens = props.tokens

  return (
    <PageLayout
      pageTitle={
        <div class="flex flex-row justify-between items-center w-full">
          <div>
            <PageTitle>API Tokens</PageTitle>
          </div>
          <div class="self-end">
            <Button link href="/tokens/new">
              <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
              </svg>
              Nuevo token
            </Button>
          </div>
        </div>
      }
      context={props.context}>
      <Table
        className="px-4"
        headers={['Nombre', 'Valor', 'Fecha creación', 'Acciones']}>
        <TableBody hx-confirm="¿Estás seguro que quieres eliminar este API Token?" hx-target="closest tr">
          {tokens.map(tok => (
            <TableRow key={tok.name}>
              <TableCell highlight>
                {tok.name}
              </TableCell>
              <TableCell >
                {tok.token}
              </TableCell>
              <TableCell>
                {format(tok.createdAt)}
              </TableCell>
              <TableCell className="flex flex-row items-center gap-x-2">
                <button
                  hx-delete={`/api/tokens/${tok.id}?api_token=${token.token}`}
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