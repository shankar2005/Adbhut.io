import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Watch from './Watch';

const Invite = () => {
    return (
        <div>
            <header className='hero text-white'>
                <Navbar />
                <Hero />
            </header>
            <Watch />
            <footer className='py-8 text-center border-t text-gray-600'>
                <p>&copy; Copyright NSNCO. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Invite;