import adbhutGIF from '../../assets/logos/adbhutGIF.gif';
import carbonNeutral from "../../assets/logos/cn.jpeg"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../../features/view/viewModeSlice';
import Button from '../../Components/Button/Button';
import { showLogin } from '../../features/dropdown/dropdownSlice';
import AuthModal from '../Auth/Components/AuthModal';
import { SlArrowDown } from "react-icons/sl";
import { useState } from 'react';
import Hero from './Sections/Hero';
import Brands from '../../Components/Sections/Brands';
import { useEffect } from 'react';
import Footer from '../../layouts/Shared/Footer';

const Home = () => {
    const dispatch = useDispatch();
    const { isFullTime } = useSelector(state => state.viewMode);
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
                <nav className='p-2 shadow-sm relative'>
                    <div className='w-11/12 max-w-screen-xl mx-auto  flex items-center justify-between'>
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
                            <Link className='font-semibold' to="/artist">Become an Artist</Link>
                        </div>

                        {
                            user?.email
                                ? <Link to="/projects/readydemos"><Button variant="primary" className='uppercase'>Get Started</Button></Link>
                                : <Button variant="primary" onClick={() => dispatch(showLogin())} className='uppercase'>Login</Button>
                        }
                    </div>
                </nav>

                <section className='w-11/12 md:w-9/12 max-w-screen-xl mx-auto mt-16 py-16'>
                    <h1 className='text-4xl font-bold mb-5'>
                        Create amazing creative content directly via artists
                    </h1>
                    <label htmlFor="userState" className="inline-flex items-center p-1 cursor-pointer bg-gray-300 text-black text-xs font-bold uppercase select-none">
                        <input onChange={() => dispatch(setViewMode())} id="userState" type="checkbox" className="hidden peer" />
                        <span className={`px-3 py-2 ${isFullTime ? "bg-black text-white" : "bg-gray-300"} duration-300`}>Full Time</span>
                        <span className={`px-3 py-2 ${isFullTime ? "bg-gray-300" : "bg-black text-white"} duration-300`}>For Project</span>
                    </label>
                    <Hero />
                </section>
            </header>

            <div onClick={() => setIsHovered(false)} className="bg-gray-100 text-black mt-10 py-20">
                <div className="w-11/12 md:w-9/12 max-w-screen-xl mx-auto">
                    <h1 className='text-4xl font-bold mb-5'>Revolutionize your content with cutting-edge ML technology</h1>
                    <iframe className='w-full aspect-video' src="https://player.vimeo.com/video/819139346?h=d6fa5efcc3" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                </div>
            </div>

            {/* auth modal */}
            <AuthModal />

            <Footer />
        </div>
    );
};

export default Home;