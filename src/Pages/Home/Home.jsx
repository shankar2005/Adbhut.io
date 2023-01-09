import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-5xl font-medium'>This will be home page</h1>
            <Link to="/invite"><button className='bg-purple-500 py-3 px-8 rounded-lg text-white font-medium'>Invite</button></Link>
        </div>
    );
};

export default Home;