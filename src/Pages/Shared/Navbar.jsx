import React from 'react';
import fb from '../../assets/ui/facebook (1).png';
import gmail from '../../assets/ui/gmail.png';
import instagram from '../../assets/ui/instagram.png';
import linkedin from '../../assets/ui/linkedin.png';
import logo from '../../assets/thhs.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <navbar className='fixed z-40 w-full top-0 left-0 flex gap-8 justify-between items-center backdrop-blur py-4 px-6 shadow-lg'>
                <div>
                    <Link to="/"><img className='w-72' src={logo} alt="" /></Link>
                </div>
                <ul className='hidden md:flex gap-6'>
                    <a target="_blank" href='https://www.linkedin.com/company/the-happy-hippies-show'><li className='duration-100 bg-white p-2 rounded-full grayscale hover:grayscale-0'><img className='w-5' src={linkedin} alt="" /></li></a>
                    <a target="_blank" href='https://www.facebook.com/happy.hippie.969/'><li className='duration-100 bg-white p-2 rounded-full grayscale hover:grayscale-0'><img className='w-5' src={fb} alt="" /></li></a>
                    <a target="_blank" href='mailto:happyhippie@thhs.in'><li className='duration-100 bg-white p-2 rounded-full grayscale hover:grayscale-0'><img className='w-5' src={gmail} alt="" /></li></a>
                    <a target="_blank" href='https://www.instagram.com/thehappyhippiesshow/?hl=en'><li className='duration-100 bg-white p-2 rounded-full grayscale hover:grayscale-0'><img className='w-5' src={instagram} alt="" /></li></a>
                </ul>
            </navbar>
            <ul className='md:hidden fixed right-0 bottom-0 grid gap-2 bg-purple-400 p-1 rounded-t-full z-40'>
                <a target="_blank" href='https://www.linkedin.com/company/the-happy-hippies-show'><li className='duration-100 p-2 bg-white rounded-full'><img className='w-5' src={linkedin} alt="" /></li></a>
                <a target="_blank" href='https://www.facebook.com/happy.hippie.969/'><li className='duration-100 p-2 bg-white rounded-full'><img className='w-5' src={fb} alt="" /></li></a>
                <a target="_blank" href='mailto:happyhippie@thhs.in'><li className='duration-100 p-2 rounded-full bg-white'><img className='w-5' src={gmail} alt="" /></li></a>
                <a target="_blank" href='https://www.instagram.com/thehappyhippiesshow/?hl=en'><li className='duration-100 p-2 bg-white rounded-full'><img className='w-5' src={instagram} alt="" /></li></a>
            </ul>
        </>
    );
};

export default Navbar;