import { Html } from '@elysiajs/html'


export function TableBody({ children, ...rest }: any) {
  return (
    <tbody {...rest} >
      {children}
    </tbody>
  )
}


function TableHeader({ headers }: {
  headers: string[]
}) {
  return (
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {headers.map(header => (
          <th scope="col" class="px-6 py-3">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export function TableRow({ children }: any) {

  return (
    <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
      {children}
    </tr>
  )
}

export function TableCell({ 
  children, 
  highlight = false,
  className,
  ...props
}: {
  children: any,
  highlight?: boolean
} & Record<string, any>) {
  if (highlight) {
    return (
      <th 
        scope="row" 
        class={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "+className}
        {...props}>
        {children}
      </th>
    )
  }

  return (
    <td class={"px-6 py-4 "+className} {...props}>
      {children}
    </td>
  )
}


export function Table({ 
  children, 
  headers, 
}: { className?: string, children?: any, headers: string[] }) {

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg" >
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader headers={headers} />
        {children}
      </table>
    </div>
  )
}