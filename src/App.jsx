import './App.css'
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Watch from './Components/Watch';

function App() {
  return (
    <div>
      <header className='hero text-white'>
        <Navbar />
        <Hero />
      </header>
      <About />
      <Watch />
      <footer className='py-8 text-center border-t text-gray-600'>
        <p>&copy; Copyright NSNCO. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default App
