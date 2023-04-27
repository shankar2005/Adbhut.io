import React from 'react';
import { BsFilePdfFill, BsMusicNoteBeamed } from 'react-icons/bs';
import { IoMdVideocam } from 'react-icons/io';

const Demo = ({ demo }) => {
    return (
        <div>
            {
                // images
                (demo?.document?.includes(".png") || demo?.document?.includes(".jpg") || demo?.document?.includes(".jpeg") || demo?.document?.includes(".webp")) &&
                <div className='w-32 h-32'>
                    <img className="w-full h-full object-cover p-2 bg-gray-100 rounded-lg" src={demo?.document} alt="" />
                </div>
            }
            {
                // pdf
                demo?.document?.includes(".pdf") &&
                <div className='relative w-32 h-32 p-2 bg-gray-200  border rounded-lg'>
                    <div className='bg-gray-50 h-full flex items-center justify-center'>
                        <BsFilePdfFill className='text-red-400' size={30} />
                    </div>
                </div>
            }
            {
                // audios
                demo?.document?.includes(".mp3") &&
                <div className='relative w-32 h-32 p-2 bg-gray-200  border rounded-lg'>
                    <div className='bg-gray-50 h-full flex items-center justify-center'>
                        <BsMusicNoteBeamed className='text-red-400' size={30} />
                    </div>
                </div>
            }
            {
                // videos
                demo?.document?.includes(".mp4") &&
                <div className='relative'>
                    <img className="w-32 h-32 p-2 bg-gray-300 rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO45C5bfZ4pz2OXyyIpO-tGWvL0_Beead3g9gdEIuEAg&s" alt="" />
                    <div className='text-white/90 absolute bottom-3 left-3 flex items-center gap-1'>
                        <IoMdVideocam />
                        <p className="text-xs">0:10</p>
                    </div>
                </div>
            }

            {/* <div className="w-60 rounded-lg p-2 bg-gray-300">
                    <Video autoPlay={false} loop={false}
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        onCanPlayThrough={() => { }}>
                        <source src="https://res.cloudinary.com/djqnk6djr/video/upload/v1681813785/aastey_Tribe_gbr8as.mp4" type="video/webm" />
                    </Video>
                </div> */}
        </div>
    );
};

export default Demo;