import React from 'react';
import { BsStars } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { IoMdHome, IoMdImage } from 'react-icons/io';
import { IoArrowBack, IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { MdHistory } from 'react-icons/md';
import { Link, Outlet, useLocation } from 'react-router-dom';

const GenerativeLayout = () => {
    const pathname = useLocation().pathname;

    return (
        <>
            <header>
                <nav className='px-5 py-3 bg-sky-900 text-white'>
                    <ul className='flex gap-10 items-center text-sm'>
                        <li>
                            {pathname === "/api"
                                ? <Link to="/"><IoMdHome size={20} /></Link>
                                : <Link to="/api"><IoArrowBack size={20} /></Link>}
                        </li>
                        <li>
                            <Link to="/api/generate-text" className="flex items-center gap-1.5"><BsStars size={20} /> Text</Link>
                        </li>
                        <li>
                            <Link to="/api/extract-text" className="flex items-center gap-1.5"><IoMdImage size={20} /> Image</Link>
                        </li>
                        <li className='flex items-center gap-1.5 text-gray-400'><IoChatbubbleEllipsesSharp size={20} /> Chat <div className='bg-sky-700 text-xs px-1 rounded-full'>upcoming</div></li>

                        <li className="flex items-center gap-1.5 ml-auto"><MdHistory size={20} /> History</li>
                        <li className="flex items-center gap-1.5"><FaUser size={15} /> Account</li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    );
};

export default GenerativeLayout;