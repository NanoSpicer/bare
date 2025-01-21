import { Html } from "@elysiajs/html";
import PageLayout, { PageTitle } from "../PageLayout";
import type { PageContext } from "../page-context";
import Button from "@components/Button";


interface NewTokenPageProps {

  context: PageContext
}

const onsubmit = `
async function createNewToken(event) {
  event.preventDefault()
  event.stopPropagation()
  const formData = new FormData(event.target)
  const jsonData = {
    name: formData.get('name')
  };
  const response = await fetch('/api/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })

  if (response.ok) {
    window.location.replace("/tokens");
  } else {
    alert('Ha ocurrido un error')
  }
}
`

export default function NewTokenPage({ context }: NewTokenPageProps) {

  return (
    <PageLayout
      context={context}
      pageTitle={
        <PageTitle>Create a new API token</PageTitle>
      }>
      
      <script>{onsubmit}</script>
      <form 
        class="max-w-lg mx-auto"
        onsubmit="createNewToken(event)">
        <div class="mb-5">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del token</label>
          <input type="text" id="name" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre del servicio que usará el token" required />
        </div>
        <div>
          <Button type="submit">
            Create
          </Button>
          <div id="response" class="mt-5"></div>
        </div>
      </form>
    </PageLayout>
  )
}