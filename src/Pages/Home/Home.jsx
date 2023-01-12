import React, { useContext, useState } from 'react';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { MdCelebration } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import LeftAside from './LeftAside';
import RightAside from './RightAside';
import Cookies from 'universal-cookie';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import Feed from './Feed';

const Home = () => {
    const [showSearch, setShowSearch] = useState(false);
    const { setIsAuthenticated } = useContext(AuthContext);
    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove("auth_token");
        setIsAuthenticated(false);
    }

    return (
        <div className='bg-gray-100'>
            <nav className='bg-white shadow-md sticky top-0 z-50'>
                <div className='w-11/12 mx-auto flex items-center justify-between'>
                    <div className='flex items-center gap-8 py-3'>
                        <Link to="/"><h4 className='font-medium text-lg'>NsN Co</h4></Link>
                        <div className='relative'>
                            <div>
                                <input onClick={() => setShowSearch(true)} type="text" className='border bg-blue-50 py-2 w-72 pl-10 pr-3 rounded text-sm' placeholder='Search your artist here...' />
                                <AiOutlineSearch className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                            </div>
                            <div className={`${!showSearch && 'hidden'} absolute left-0 bg-white w-full border rounded-md p-3`}>
                                <h3 className='font-medium border-b pb-2 mb-3'>Advance Search</h3>
                                Lorem ipsum dolor sit amet. <br />
                                Lorem ipsum dolor sit amet. <br />
                                Lorem ipsum dolor sit amet. <br />
                                Lorem ipsum dolor sit amet. <br />
                            </div>
                        </div>
                    </div>
                    <ul onClick={() => setShowSearch(false)} className='flex gap-4 text-gray-500 flex-1 py-3'>
                        <li className='ml-auto'><AiFillHome className='w-6 h-6' /></li>
                        <li><MdCelebration className='w-6 h-6' /></li>
                        <li>
                            <button onClick={handleLogout}><FiLogOut className='w-6 h-6' /></button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='w-11/12 mx-auto grid grid-cols-12 gap-5 items-start mt-5 pb-5'>
                {/* bg unfocused layer */}
                <div onClick={() => setShowSearch(false)} className={`${!showSearch && 'hidden'} fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-70 z-30`}></div>
                {/* bg unfocused layer */}



                <aside className='col-span-3 sticky top-20'>
                    <RightAside />
                </aside>

                <main className='col-span-6'>
                    <Feed />
                </main>
                
                <aside className='col-span-3'>
                    <LeftAside />
                </aside>

            </div>
        </div>
    );
};

export default Home;