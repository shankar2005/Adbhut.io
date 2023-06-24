import { DefaultPlayer as Video } from 'react-html5video';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { useRootContext } from '../../contexts/RootProvider';
import { useGetDemosQuery } from '../../features/demo/demoApi';
import { setDemo } from '../../features/project/projectSlice';
import WorkDemo from '../Artist/Components/View/WorkDemo';

const ReadyDemos = () => {
    const { user } = useSelector(state => state.auth);
    const { data } = useGetDemosQuery(null, { skip: !user?.email });

    return (
        <section className='w-full'>
            {data?.map(demo => <DemoCard key={demo.id} demo={demo} />)}

            {/* <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                <div className='flex items-center gap-2 mb-3'>
                    <img className='w-12 h-12' src="https://adbhut.io/assets/adbeta-a97ec0b9.jpeg" alt="" />
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
                    <img className='w-12 h-12' src="https://adbhut.io/assets/adbeta-a97ec0b9.jpeg" alt="" />
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
            </div> */}
        </section>
    );
};

export default ReadyDemos;

const DemoCard = ({ demo }) => {
    const { setArtistProfile } = useRootContext();
    const { Title, demo_type, link, artist, artist_name } = demo || {};
    const dispatch = useDispatch();
    const handleCustomize = () => {
        dispatch(setDemo(demo));
    }
    const showProfile = () => {
        setArtistProfile(artist);
    }

    return (
        <div className='mt-3 mb-5 p-5 bg-white rounded-lg shadow-md'>
            <div className='flex items-center gap-2 mb-3'>
                <img className='w-12 h-12' src="https://adbhut.io/assets/adbeta-a97ec0b9.jpeg" alt="" />
                <div className='text-sm'>
                    <p className='text-base font-medium'>Ready to Use</p>
                    <p><span onClick={showProfile} className="hover:underline cursor-pointer">{artist_name}</span>'s demo</p>
                </div>
                <Link to="/projects/create-project" onClick={handleCustomize} className="ml-auto">
                    <Button>Customize</Button>
                </Link>
            </div>
            <WorkDemo demo_type={demo_type} demo_link={link || demo?.document} />
        </div>
    )
}