import { Html } from "@elysiajs/html";
import { logger } from "@logging";


export function SidebarItem(props: {
  iconSlot: any;
  children: string | any
  href: string
  active?: boolean
}) {
  const active = props.active ?? false;
  logger.debug('SidebarItem', {href: props.href, active}); 
  const baseClasses = "flex items-center p-2 text-gray-900 rounded-lg dark:text-white";
  const hoverClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const activeClasses = active ? "bg-gray-100 dark:bg-gray-700" : "";

  return (
    <li>
      <a href={props.href} class={`${baseClasses} ${hoverClasses} ${activeClasses} group`}>
        {props.iconSlot}
        <span class="ms-3">{props.children}</span>
      </a>
    </li>
  )
}

export default function Sidebar(props: any) {

  return (
    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          {props.children}
        </ul>
      </div>
    </aside>
  )

}

