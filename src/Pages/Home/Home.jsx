import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import RightAside from './RightAside';
import { IoIosArrowBack } from "react-icons/io";

const Home = () => {
    const pathname = useLocation().pathname;

    const { setViewAs, currentProject } = useRootContext();
    const handleViewAs = e => {
        setViewAs(e.target.value);
    }

    return (
        <div className='grid grid-cols-8 gap-5 items-start'>
            <main className='col-span-5'>
                {/*  */}
                <div className='bg-white bg-opacity-90 border border-blue-100 shadow p-2 mb-2 rounded-lg flex justify-between items-center fixed w-[37.40%] z-30'>
                    <div className='text-sm flex items-center gap-2'>
                        {
                            pathname.includes("project") ||
                            <>
                                {
                                    currentProject?.pk &&
                                    <Link to={`/project/${currentProject?.pk}/${currentProject?.stage}`}>
                                        <button className='bg-gray-200 rounded-full p-2'><IoIosArrowBack /></button>
                                    </Link>
                                }
                                <Link to="/">
                                    <button className={`border px-3 py-1 rounded-full ${pathname === "/" && 'bg-blue-400 text-white'}`}>View Projects</button>
                                </Link>
                            </>
                        }
                        <Link to="/artists">
                            <button className={`border px-3 py-1 rounded-full ${pathname === "/artists" && 'bg-blue-400 text-white'}`}>View Artists</button>
                        </Link>
                    </div>
                    {
                        pathname.includes("project") ||
                        <div>
                            <select onChange={handleViewAs} className='text-sm p-1 rounded border outline-gray-100'>
                                <option value="large">Large</option>
                                <option value="details">Details</option>
                                <option value="small">Small</option>
                            </select>
                        </div>
                    }
                </div>
                {/*  */}
                <div className='pt-14'>
                    <Outlet />
                </div>
            </main>

            <aside className='col-span-3 sticky top-20 rightSide max-h-[88vh] overflow-y-scroll'>
                <RightAside />
            </aside>
        </div>
    );
};

export default Home;