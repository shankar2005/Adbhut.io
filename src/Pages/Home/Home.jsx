import adbhutGIF from '../../assets/logos/adbhutGIF.gif';
import carbonNeutral from "../../assets/logos/cn.jpeg"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../../features/view/viewModeSlice';
import Button from '../../Components/Button/Button';
import { closeLogin, showLogin } from '../../features/dropdown/dropdownSlice';
import { AnimatePresence } from 'framer-motion';
import AuthModal from '../Auth/Components/AuthModal';
import { SlArrowDown } from "react-icons/sl";
import { useState } from 'react';
import MentorSection from './Sections/MentorSection';
import Hero from './Sections/Hero';
import Brands from '../../Components/Sections/Brands';
import { useEffect } from 'react';
import Footer from '../../layouts/Shared/Footer';

const Home = () => {
    const dispatch = useDispatch();
    const { isFullTime } = useSelector(state => state.viewMode);
    const { loginModal } = useSelector(state => state.dropdown);
    const { user } = useSelector(state => state.auth);

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isHovered]);

    return (
        <div className='font-hero'>
            <header>
                <nav className='p-3 md:px-5 shadow-sm relative'>
                    <div className='flex items-center justify-between'>
                        <div className="flex items-center gap-4">
                            <img src={adbhutGIF} className='w-28 md:w-32' />

                            <p onClick={() => setIsHovered(!isHovered)} className='flex items-center gap-2 font-medium font-hero cursor-pointer'>
                                <img className='w-24 cursor-pointer' src={carbonNeutral} alt="" />
                                <SlArrowDown className={`${isHovered && "rotate-180"} duration-200`} size={10} />
                            </p>
                            {
                                isHovered &&
                                <Brands setIsHovered={setIsHovered} />
                            }
                        </div>

                        {
                            user?.email
                                ? <Link to="/projects/readydemos"><Button variant="primary" className='uppercase'>Get Started</Button></Link>
                                : <Button variant="primary" onClick={() => dispatch(showLogin())} className='uppercase'>Login</Button>
                        }
                    </div>
                </nav>

                <section className='px-5 md:px-0 w-full md:w-4/6 mx-auto mt-20'>
                    <h1 className='text-4xl font-bold mb-5'>
                        Create amazing creative content directly via artists
                    </h1>
                    <label htmlFor="userState" className="hidden md:inline-flex items-center p-1 cursor-pointer bg-gray-300 text-black text-xs font-bold uppercase select-none">
                        <input onChange={() => dispatch(setViewMode())} id="userState" type="checkbox" className="hidden peer" />
                        <span className={`px-3 py-2 ${isFullTime ? "bg-black text-white" : "bg-gray-300"} duration-300`}>Full Time</span>
                        <span className={`px-3 py-2 ${isFullTime ? "bg-gray-300" : "bg-black text-white"} duration-300`}>For Project</span>
                    </label>
                    <Hero />
                </section>
            </header>

            <div onClick={() => setIsHovered(false)} className="flex flex-col justify-center items-center bg-gray-100 text-black mt-10 pt-12 relative">
                <h1 className='text-4xl font-bold absolute 2xl:static top-16 px-5 md:px-0 '>Revolutionize your content with cutting-edge ML technology</h1>
                <iframe className='px-5 md:px-0 w-full md:w-3/6' src="https://player.vimeo.com/video/819139346?h=d6fa5efcc3" height="564" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
            </div>

            {/* auth modal */}
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {loginModal && <AuthModal onClick={() => dispatch(closeLogin())} />}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Home;