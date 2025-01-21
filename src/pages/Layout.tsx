import Sidebar, { SidebarItem } from '@components/Sidebar'
import Topbar from '@components/Topbar'
import { Html } from '@elysiajs/html'
import type { PageContext } from './page-context'
import { InlineBadge } from '@components/Badges'

interface LayoutProps {
  title?: string
  children: any
  context: PageContext
}

export default function Layout({
  title = 'Backup repository',
  context,
  children
}: LayoutProps) {

  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="icon" href="/bare_logo.png" type="image/png" />
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
        <script defer src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
      </head>
      <body>
        <Topbar />
        <Sidebar >
          <SidebarItem
            href="/"
            active={context.url === '/'}
            iconSlot={
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd" />
              </svg>
            }>
              Home
            </SidebarItem>
          <SidebarItem
            href="/backups"
            active={context.url.startsWith('/backups')}
            iconSlot={
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
              </svg>
            }>
              Backups
              <InlineBadge color='red'>{context.backups}</InlineBadge>
          </SidebarItem>
          <SidebarItem
            href="/tokens"
            active={context.url.startsWith('/tokens')}
            iconSlot={
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" />
              </svg>
            }>
              API Tokens
              <InlineBadge color='red'>{context.tokens}</InlineBadge>
          </SidebarItem>
        </Sidebar>

        {/* original k */}

        <div class="p-4 sm:ml-64 pt-16">
          <main class="flex flex-col h-full w-full mx-auto max-w-screen-lg" >
            {children}
          </main>
        </div>

      </body>
    </html>
  )
}