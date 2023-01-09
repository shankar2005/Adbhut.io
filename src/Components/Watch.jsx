import React from 'react';

const Watch = () => {
    return (
        <section className='max-w-screen-xl mx-auto px-10 xl:px-0 py-10'>
            <h1 className='text-center text-4xl font-bold mb-10 text-purple-700 text-opacity-80'>Watch Us</h1>
            <div className='flex flex-col lg:flex-row gap-5'>
                <div className="w-full h-56 sm:h-[350px]">
                    <iframe className='w-full h-full rounded-lg' src="https://www.youtube.com/embed/HBxSmhigFQk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div className="w-full h-56 sm:h-[350px]">
                    <iframe className='w-full h-full rounded-lg' src="https://www.youtube.com/embed/ScXNHO-RoEM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
        </section>
    );
};

export default Watch;