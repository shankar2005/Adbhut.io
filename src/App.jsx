import './styles/App.css'
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './Routes/Routes';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'react-loading-skeleton/dist/skeleton.css'

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
