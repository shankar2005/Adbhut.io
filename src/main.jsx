import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RootProvider from './contexts/RootProvider'
import './styles/index.css'
import 'react-html5video/dist/styles.css';

import store from './app/store'
import { Provider } from 'react-redux'
import NoInternetConnection from './Components/NotFound/NoInternetConnection'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoInternetConnection>
      <Provider store={store}>
        <RootProvider>
          <App />
        </RootProvider>
      </Provider>
    </NoInternetConnection>
  </React.StrictMode>,
)
