import React, { useEffect, useState } from 'react';

const Watch = () => {
    const [btsPlaylist, setBtsPlaylist] = useState([]);
    const [showPlaylist, setShowPlaylist] = useState([]);

    useEffect(() => {
        fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLxNKsHD8bM1mPUBrFSmXy7lJD5tWdit-w&key=AIzaSyAxW8h9knx67oUIxLc_pAFTljByXQ0gJzY')
            .then(res => res.json())
            .then(data => setBtsPlaylist(data.items));
        fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLxNKsHD8bM1m0XLQIBGnXNApencPe-XwK&key=AIzaSyAxW8h9knx67oUIxLc_pAFTljByXQ0gJzY')
            .then(res => res.json())
            .then(data => setShowPlaylist(data.items));
    }, []);

    return (
        <>
            <section className='max-w-screen-xl mx-auto px-10 xl:px-0 py-10 my-5'>
                <h1 className='text-center text-4xl font-bold mb-10 text-purple-700 text-opacity-80'>Watch Episode</h1>
                <div className={` ${showPlaylist?.length <= 1 ? 'md:w-[630px] mx-auto' : 'grid lg:grid-cols-2'} gap-5`}>
                    {
                        showPlaylist?.map(item => (
                            <div className="w-full h-64 sm:h-[350px]">
                                <iframe className='w-full h-full rounded-lg' src={`https://www.youtube.com/embed/${item.contentDetails.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section className='max-w-screen-xl mx-auto px-10 xl:px-0 py-10'>
                <h1 className='text-center text-4xl font-bold mb-10 text-purple-700 text-opacity-80'>Behind The Scenes</h1>
                <div className={` ${btsPlaylist?.length <= 1 ? 'md:w-[630px] mx-auto' : 'grid lg:grid-cols-2'} gap-5`}>
                    {
                        btsPlaylist?.map(item => (
                            <div className="w-full h-64 sm:h-[350px]">
                                <iframe className='w-full h-full rounded-lg' src={`https://www.youtube.com/embed/${item.contentDetails.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    );
};

export default Watch;