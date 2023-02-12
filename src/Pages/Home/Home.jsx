import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import RightAside from './RightAside';

const Home = () => {
    const { setViewAs } = useRootContext();
    const handleViewAs = e => {
        setViewAs(e.target.value);
    }

    return (
        <div className='grid grid-cols-8 gap-5 items-start'>
            <main className='col-span-5'>
                {/*  */}
                <div className='bg-white bg-opacity-90 border border-blue-100 shadow p-2 mb-2 rounded-lg flex justify-between items-center fixed w-[37.40%] z-30'>
                    <div className='text-sm'>
                        <button className={`bg-white border px-3 py-1 rounded-full mr-2`}>Project View</button>
                        <button className={`bg-white border px-3 py-1 rounded-full`}>Artist View</button>
                    </div>
                    <div>
                        <select onChange={handleViewAs} className='text-sm p-1 rounded border outline-gray-100'>
                            <option value="large">Large</option>
                            <option value="details">Details</option>
                            <option value="small">Small</option>
                        </select>
                    </div>
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