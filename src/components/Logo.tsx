import { Html } from "@elysiajs/html";

export function Logo(props: Record<string, any>) {
  return (<img src="/bare_logo.png" class="h-8 me-3" alt="BaRe Logo" {...props}/>)
}