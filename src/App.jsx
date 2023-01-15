import './styles/App.css'
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          className: '',
          style: {
            background: '#666666',
            color: 'white',
            borderRadius: '50px',
          },
          duration: 1000,
        }}
      />
    </>
  )
}

export default App
