import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './contexts/AuthProvider'
import RootProvider from './contexts/RootProvider'
import './styles/index.css'

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootProvider>
          <App />
        </RootProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
