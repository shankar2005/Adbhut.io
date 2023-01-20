import React from 'react';
import Feed from './Feed';
import RightAside from './RightAside';

const Home = () => {
    return (
        <div className='grid grid-cols-8 gap-5 items-start'>
            <main className='col-span-5'>
                <Feed />
            </main>

            <aside className='col-span-3 sticky top-20'>
                <RightAside />
            </aside>
        </div>
    );
};

export default Home;