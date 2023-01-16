import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './contexts/AuthProvider'
import RootProvider from './contexts/RootProvider'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RootProvider>
        <App />
      </RootProvider>
    </AuthProvider>
  </React.StrictMode>,
)
