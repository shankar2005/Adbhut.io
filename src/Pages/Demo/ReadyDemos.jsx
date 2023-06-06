import { DefaultPlayer as Video } from 'react-html5video';
import ReactPlayer from 'react-player'

const ReadyDemos = () => {
    return (
        <div>
            <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                <div className='flex items-center gap-2 mb-3'>
                    <img className='w-12 h-12' src="http://localhost:5173/src/assets/logos/adbeta.jpeg" alt="" />
                    <div className='text-sm'>
                        <p className='text-base font-medium'>Adbhut.io</p>
                        <p>Ready to use Demos</p>
                    </div>
                    <button className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-2.5 px-4 rounded-lg font-medium'>View</button>
                </div>
                <div className="w-60 rounded-lg p-2 bg-gray-300">
                    <Video autoPlay={false} loop={false}
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        onCanPlayThrough={() => { }}>
                        <source src="https://res.cloudinary.com/djqnk6djr/video/upload/v1681813785/aastey_Tribe_gbr8as.mp4" type="video/webm" />
                    </Video>
                </div>
            </div>
        </div>
    );
};

export default ReadyDemos;