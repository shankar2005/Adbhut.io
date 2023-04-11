import adbhutGIF from '../../assets/logos/adbhutGIF.gif';
import { Link } from 'react-router-dom';
import LeftAside from './LeftAside';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../../features/view/viewModeSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { isFullTime } = useSelector(state => state.viewMode);

    return (
        <header>
            <nav className='p-3 border-b'>
                <div className='w-10/12 max-w-screen-xl mx-auto flex items-center justify-between'>
                    <img src={adbhutGIF} className='w-28 md:w-32' />
                    <div className='flex items-center gap-4'>
                        <p className='font-medium uppercase space-x-2 text-xs md:text-base'>
                            <Link className=''>Artist</Link>
                            <a target="_blank" href='https://www.linkedin.com/company/the-happy-hippies-show' className=''>Hiring</a>
                        </p>
                        <label htmlFor="userState" className="inline-flex items-center p-1 cursor-pointer bg-gray-300 text-black text-xs md:text-sm font-medium uppercase select-none">
                            <input onChange={() => dispatch(setViewMode())} id="userState" type="checkbox" className="hidden peer" />
                            <span className={`px-4 py-2 ${isFullTime ? "bg-black text-white" : "bg-gray-300"} duration-300`}>Full Time</span>
                            <span className={`px-4 py-2 ${isFullTime ? "bg-gray-300" : "bg-black text-white"} duration-300`}>For Project</span>
                        </label>
                    </div>
                </div>
            </nav>


            <section className='h-screen lg:flex justify-center items-center'>

                <div className='w-10/12 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 justify-between gap-20'>
                    <div className='order-last w-full lg:w-5/6 ml-auto'>
                        <div className='border rounded-lg shadow-lg'>
                            <LeftAside />
                        </div>
                        <div className='mt-5 text-gray-500 text-sm'>
                            &copy; about Mirashious Technologies Pvt Ltd
                        </div>
                    </div>

                    <div className='order-first lg:mt-24'>
                        <h1 className='text-4xl font-medium mb-4'>
                            Creating the most amazing creative content, <br />
                            now available at convenience of a conversation.
                        </h1>
                        <p>
                            The Most Efficient Content Production Platform of Artists. <br />
                            Accessible to everyone via this chat. Adbhut.io, try it.
                        </p>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Home;