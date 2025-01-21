import { html, Html } from '@elysiajs/html'
import Elysia from "elysia";
import BackupsPage from './backups';
import HomePage from './home';
import TokensPage from './tokens';
import { pageContext } from './page-context';
import NewTokenPage from './tokens/new';
import { getFiles } from '../data/uploads';
import { getTokens } from '../data/api-tokens';


export const pages = new Elysia()
  .use(html())
  .get('/bare_logo.png', () => Bun.file('./assets/bare_logo.png'))
  .use(pageContext)
  // Remember that you must return JSX.Elements meaning you cannot have async pages
  .get('/', ctx => <HomePage context={ctx} />)
  .get('/tokens/new', ctx => <NewTokenPage context={ctx} />)
  .get('/backups', async ctx => {
    const files = await getFiles()
    return <BackupsPage files={files} context={ctx} />
  })
  .get('/tokens', async ctx => {
    const tokens = await getTokens()
    return <TokensPage tokens={tokens} context={ctx} />
  })