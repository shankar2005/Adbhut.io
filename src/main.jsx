import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RootProvider from './contexts/RootProvider'
import './styles/index.css'
import 'react-html5video/dist/styles.css';

import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RootProvider>
        <App />
      </RootProvider>
    </Provider>
  </React.StrictMode>,
)
