import React from 'react';

const PlayInviteModal = ({ modal, setModal }) => {
    return (
        <div className={`${modal ? 'fixed' : 'hidden'} z-50 top-0 left-0 bg-black bg-opacity-70 w-full h-screen flex items-center justify-center`}>
            <div className='bg-white w-full md:w-fit mx-5 rounded-lg text-black p-5 relative'>
                <p onClick={() => { setModal(false) }} className='absolute top-0 right-0 m-3 mr-4 cursor-pointer font-bold'>✕</p>
                <h3>Play Invites</h3>
                <div className="w-full md:w-[700px] h-64 sm:h-[450px] mt-3">
                    <iframe className='w-full h-full rounded-lg' src="https://www.youtube.com/embed/HBxSmhigFQk?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    );
};

export default PlayInviteModal;