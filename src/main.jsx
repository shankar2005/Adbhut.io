import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RootProvider from './contexts/RootProvider'
import './styles/index.css'

import store from './app/store'
import { Provider } from 'react-redux'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <RootProvider>
            <App />
          </RootProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
