import { DefaultPlayer as Video } from 'react-html5video';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactAudioPlayer from 'react-audio-player';


const ReadyDemos = () => {
    return (
        <section>
            <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                <div className='flex items-center gap-2 mb-3'>
                    <img className='w-12 h-12' src="http://localhost:5173/src/assets/logos/adbeta.jpeg" alt="" />
                    <div className='text-sm'>
                        <p className='text-base font-medium'>Adbhut.io</p>
                        <p>Ready to use Demos</p>
                    </div>
                    <button className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-2.5 px-4 rounded-lg font-medium'>Click to Use</button>
                </div>
                <Video autoPlay={false} loop={false}
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
                    <source src="https://res.cloudinary.com/djqnk6djr/video/upload/v1681813785/aastey_Tribe_gbr8as.mp4" type="video/webm" />
                </Video>
            </div>
            <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                <div className='flex items-center gap-2 mb-3'>
                    <img className='w-12 h-12' src="http://localhost:5173/src/assets/logos/adbeta.jpeg" alt="" />
                    <div className='text-sm'>
                        <p className='text-base font-medium'>Adbhut.io</p>
                        <p>Ready to use Demos</p>
                    </div>
                    <button className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-2.5 px-4 rounded-lg font-medium'>Click to Use</button>
                </div>
                <Video autoPlay={false} loop={false}
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="video/webm" />
                </Video>
                {/* <AudioPlayer
                    autoPlay={false}
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    onPlay={e => console.log("onPlay")}
                // other props here
                /> */}
            </div>
        </section>
    );
};

export default ReadyDemos;