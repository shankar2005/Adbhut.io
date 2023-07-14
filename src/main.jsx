import React from 'react'
import App from './App'
import RootProvider from './contexts/RootProvider'
import './styles/index.css'
import 'react-html5video/dist/styles.css';

import store from './app/store'
import { Provider } from 'react-redux'

import { hydrate, render } from "react-dom";
import { createRoot } from 'react-dom';

const APP = (
  <React.StrictMode>
    <Provider store={store}>
      <RootProvider>
        <App />
      </RootProvider>
    </Provider>
  </React.StrictMode>
);
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  createRoot(rootElement).hydrate(APP);
} else {
  createRoot(rootElement).render(APP);
}