import adbhutGIF from '../../assets/logos/adbhutGIF.gif';
import { Link } from 'react-router-dom';
import LeftAside from './LeftAside';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../../features/view/viewModeSlice';
import Button from '../../Components/Button/Button';
import { closeLogin, showLogin } from '../../features/dropdown/dropdownSlice';
import { AnimatePresence } from 'framer-motion';
import AuthModal from '../Auth/Components/AuthModal';
import { SlArrowDown } from "react-icons/sl";
import { useState } from 'react';
import MentorSection from './Sections/MentorSection';

const Home = () => {
    const dispatch = useDispatch();
    const { isFullTime } = useSelector(state => state.viewMode);
    const { loginModal } = useSelector(state => state.dropdown);
    const { user } = useSelector(state => state.auth);

    const [isMentorHovered, setIsMentorHovered] = useState(false);
    const toggleMentor = () => {
        setIsMentorHovered(prev => !prev);
    }

    return (
        <header>
            <nav className='p-3 md:px-5 shadow-sm relative'>
                <div className='flex items-center justify-between'>
                    <div className="flex items-center gap-2">
                        <img src={adbhutGIF} className='w-28 md:w-32 mr-8' />
                        <p onMouseEnter={() => setIsMentorHovered(true)} onClick={toggleMentor} className='flex items-center gap-2 font-medium font-hero cursor-pointer'>
                            Mentors
                            <SlArrowDown className={`${isMentorHovered && "rotate-180"} duration-200`} size={10} />
                        </p>

                        {
                            isMentorHovered &&
                            <MentorSection setIsMentorHovered={setIsMentorHovered} />
                        }
                    </div>

                    <div className='flex items-center gap-2'>
                        <p className='hidden font-medium uppercase md:flex items-center gap-1.5 text-sm'>
                            <Link to="/artists">Artist</Link>
                            <a target="_blank" href='https://www.linkedin.com/company/the-happy-hippies-show' className='block mr-1'>Hiring</a>
                        </p>

                        <label htmlFor="userState" className="hidden md:inline-flex items-center p-1 cursor-pointer bg-gray-300 text-black text-xs font-bold uppercase select-none rounded-full">
                            <input onChange={() => dispatch(setViewMode())} id="userState" type="checkbox" className="hidden peer" />
                            <span className={`px-3 py-2 ${isFullTime ? "bg-black text-white" : "bg-gray-300"} duration-300 rounded-full`}>Full Time</span>
                            <span className={`px-3 py-2 ${isFullTime ? "bg-gray-300" : "bg-black text-white"} duration-300 rounded-full`}>For Project</span>
                        </label>

                        {
                            user?.email
                                ? <Link to="/projects/myprojects"><Button variant="primary" className='uppercase'>Get Started</Button></Link>
                                : <Button variant="primary" onClick={() => dispatch(showLogin())} className='uppercase'>Login</Button>
                        }
                    </div>
                </div>
            </nav>

            <section onClick={() => setIsMentorHovered(false)} className='pt-10 lg:flex justify-center items-center'>
                <div className='w-11/12 md:w-10/12 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 justify-between gap-20'>
                    <div className='order-last w-full lg:w-5/6 ml-auto'>
                        <div className='border border-gray-50 rounded-lg shadow'>
                            <LeftAside />
                        </div>
                        <div className='mt-5 text-gray-500 text-sm font-hero'>
                            &copy; about Mirashious Technologies Pvt Ltd
                        </div>
                    </div>

                    <div className='order-first lg:mt-24 font-hero'>
                        <h1 className='text-4xl font-bold mb-4'>
                            Creating the most <br /> amazing creative content, <br />
                            now available at convenience of a conversation.
                        </h1>
                        <p>
                            The Most Efficient Content Production Platform of Artists. <br />
                            Accessible to everyone via this chat. Adbhut.io, try it.
                        </p>
                    </div>
                </div>
            </section>

            <div onClick={() => setIsMentorHovered(false)} className="flex flex-col justify-center items-center bg-gray-200 mt-10 pt-12 relative">
                <h1 className='text-4xl font-bold absolute 2xl:static top-16 px-5 md:px-0 '>Revolutionize your content with cutting-edge AI technology</h1>
                <iframe className='px-5 md:px-0 w-full md:w-3/6' src="https://player.vimeo.com/video/819139346?h=d6fa5efcc3" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>

            {/* auth modal */}
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {loginModal && <AuthModal onClick={() => dispatch(closeLogin())} />}
            </AnimatePresence>

        </header>
    );
};

export default Home;