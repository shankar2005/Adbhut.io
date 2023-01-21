import React from 'react';

const ShortlistedArtists = () => {
    return (
        <div className='bg-white p-5 rounded-lg grid grid-cols-2 gap-5'>
            {
                [...Array(10).keys()].map(i => (
                    <div key={i} className="bg-gray-50 border flex flex-col items-center py-3 px-5 text-center rounded-lg">
                        <img className='w-24 h-24 border bg-white p-1 rounded-full' src="https://thhs.in/assets/avatar-2200a5cf.png" alt="" />
                        <p className='mt-2'>User Name</p>
                        <p className='text-sm'>Web developer, Singer, Dancer</p>
                        <button className='w-full border bg-gray-200 py-2 rounded-lg mt-4'>View Profile</button>
                    </div>
                ))
            }
        </div>
    );
};

export default ShortlistedArtists;