import { Html } from "@elysiajs/html";
import Layout from "./Layout";
import type { PageContext } from "./page-context";
import { logger } from "@logging";


interface PageLayoutProps {
  /**
   * String or JSX Element.
   */
  pageTitle?: any
  context: PageContext
  children: any
}

export function PageTitle(props: { children: any }) {

  return (
<h1 class="px-4 py-6 text-2xl">{props.children}</h1> 
  )
}


/**
 * Includes page layout and a title
 */
export default function PageLayout(props: PageLayoutProps) {

  return (
    <Layout context={props.context}>
      { props.pageTitle }
      { props.children }
    </Layout>
  )
}