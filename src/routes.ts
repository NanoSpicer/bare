import { configuration } from "./configuration";
import path from 'path'


/**
 * Builds a pathname taking in account whether the application is hosted a Reverse proxy
 */
export function url(pathname: string): string {
  if(!configuration.APP_ROOT) {
    return pathname
  }

  return path.join(configuration.APP_ROOT, pathname)
}