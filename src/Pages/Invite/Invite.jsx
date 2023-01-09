import React from 'react';
import About from '../../Components/About';
import Hero from '../../Components/Hero';
import Navbar from '../Shared/Navbar';
import Watch from '../../Components/Watch';

const Invite = () => {
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
    );
};

export default Invite;