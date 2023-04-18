import { DefaultOptions } from 'react-query'

export const config: ReactAppConfig = {

  query: {
    queries: {
      staleTime: 120000 || undefined,
      cacheTime: 150000 || undefined,
      refetchInterval:
        150000 || undefined,
      refetchOnWindowFocus:
        true || undefined,
      refetchOnMount:
        true || undefined
    }
  }
}

type ReactAppConfig = {
  query: DefaultOptions
}
