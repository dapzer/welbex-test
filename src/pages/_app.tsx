import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import React from "react";

function MyApp({Component, pageProps}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
