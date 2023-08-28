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

    // const [isHovered, setIsHovered] = useState(false);

    // useEffect(() => {
    //     if (isHovered) {
    //         document.body.classList.add("overflow-hidden");
    //     } else {
    //         document.body.classList.remove("overflow-hidden");
    //     }
    // }, [isHovered]);

    return (
        <div className='font-hero'>
            <header>
                <nav className='py-5 relative'>
                    <div className='w-10/12 max-w-screen-xl mx-auto flex items-center justify-between'>
                        <img src={adbhutGIF} className='w-28 md:w-32' />
                        {/* <p onClick={() => setIsHovered(!isHovered)} className='flex items-center gap-2 font-medium font-hero cursor-pointer'>
                            <img className='w-24 cursor-pointer' src={carbonNeutral} alt="" />
                            <SlArrowDown className={`${isHovered && "rotate-180"} duration-200`} size={10} />
                        </p> */}
                        {/* {
                            isHovered &&
                            <Brands setIsHovered={setIsHovered} />
                        } */}

                        <div className='flex items-center gap-8'>
                            <Link className='text-sm font-semibold' to="/artist">Creator Fellowship</Link>
                            {
                                user?.email
                                    ? <Link to="/projects/readydemos"><button className='bg-sky-500 py-3 px-5 rounded-full text-sm text-white'>Get Started</button></Link>
                                    : <button onClick={() => dispatch(showLogin())} className='bg-sky-500 py-3 px-5 rounded-full text-sm text-white'>Login</button>
                            }
                        </div>
                    </div>
                </nav>

                {/* <section className='w-11/12 md:w-9/12 max-w-screen-xl mx-auto mt-16 py-16'>
                    <h1 className='text-4xl font-bold mb-5'>
                        Create amazing creative content directly via artists
                    </h1>
                    <label htmlFor="userState" className="inline-flex items-center p-1 cursor-pointer bg-gray-300 text-black text-xs font-bold uppercase select-none">
                        <input onChange={() => dispatch(setViewMode())} id="userState" type="checkbox" className="hidden peer" />
                        <span className={`px-3 py-2 ${isFullTime ? "bg-black text-white" : "bg-gray-300"} duration-300`}>Full Time</span>
                        <span className={`px-3 py-2 ${isFullTime ? "bg-gray-300" : "bg-black text-white"} duration-300`}>For Project</span>
                    </label>
                    <Hero />
                </section> */}
                <section className="w-10/12 mx-auto px-16 py-40 rounded-lg bg-[url('https://kitpro.site/ailope/wp-content/uploads/sites/173/2023/06/bg4.jpg')] bg-cover grid grid-cols-2 items-center justify-between">
                    <div>
                        <h1 className='text-7xl text-gray-900 font-bold mb-5'>AI Powered Innovation</h1>
                        <button className='bg-sky-500 py-3 px-5 rounded-full text-sm text-white mr-4'>Get Started</button>
                        <button className='bg-white border border-sky-500 py-3 px-5 rounded-full text-sm text-black'>Learn More</button>
                    </div>
                    <div className='bg-white p-5 rounded-2xl shadow-lg'>
                        <h4 className='text-xl font-semibold mb-2'>The Future Of Problem Solving</h4>
                        <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare ut lorem et eleifend. Sed id venenatis metus, in finibus enim. Mauris convallis velit arcu, sit amet convallis neque convallis ut. Vivamus rhoncus leo ut nisi feugiat mattis. Etiam ut aliquam sapien.</p>
                    </div>
                </section>
            </header>

            <section className='w-[78%] mx-auto my-20 grid grid-cols-4 gap-10'>
                <div className='border-l-2 border-orange-300 pl-5'>
                    <h4 className='text-xl font-semibold mb-2'>Let our AI handle it</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur. Ut elit tellus, luctus nec ullamcorper.</p>
                </div>
                <div className='py-5 px-3 shadow-lg flex flex-col items-center gap-2 rounded-lg'>
                    <img className='w-12' src="https://kitpro.site/ailope/wp-content/uploads/sites/173/2023/06/artificial-intelligence-15-1.png" alt="" />
                    <h5 className='font-semibold text-lg'>Image Generator</h5>
                </div>
                <div className='py-5 px-3 shadow-lg flex flex-col items-center gap-2 rounded-lg'>
                    <img className='w-12' src="https://kitpro.site/ailope/wp-content/uploads/sites/173/2023/06/artificial-intelligence-15-1.png" alt="" />
                    <h5 className='font-semibold text-lg'>Image Generator</h5>
                </div>
                <div className='py-5 px-3 shadow-lg flex flex-col items-center gap-2 rounded-lg'>
                    <img className='w-12' src="https://kitpro.site/ailope/wp-content/uploads/sites/173/2023/06/artificial-intelligence-15-1.png" alt="" />
                    <h5 className='font-semibold text-lg'>Image Generator</h5>
                </div>
            </section>

            <div className="bg-gray-100 text-black mt-10 py-20">
                <div className="w-10/12 mx-auto grid grid-cols-2 items-center gap-10">
                    <div>
                        <h1 className='text-3xl font-semibold mb-5'>Revolutionize your content with cutting-edge ML technology</h1>
                        <small className='text-sm block mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet arcu lacus. Maecenas nec diam hendrerit, finibus nunc eget, pharetra ligula.</small>
                        <button className='bg-white border border-sky-500 py-3 px-5 rounded-full text-sm text-black'>Learn More</button>
                    </div>
                    <iframe className='w-full aspect-video' src="https://player.vimeo.com/video/819139346?h=d6fa5efcc3" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                </div>
            </div>

            <section className="py-28 bg-[url('https://kitpro.site/ailope/wp-content/uploads/sites/173/2023/06/C4D_035_13_i5-copy.jpg')] bg-cover text-center">
                <h1 className='text-5xl font-bold text-white mb-5'>Let's Find Out Who Else Uses AI Here</h1>
                <button className='bg-white border border-neutral-400 py-3 px-5 rounded-full text-sm text-black shadow'>Learn More</button>
            </section>

            {/* auth modal */}
            <AuthModal />

            <Footer />
        </div>
    );
};

export default Home;