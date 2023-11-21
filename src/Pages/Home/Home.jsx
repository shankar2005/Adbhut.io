import logo from '../../assets/logos/nsn-logo.png';
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
import { IoIosArrowDown, IoIosArrowRoundForward, IoMdSend } from 'react-icons/io';
import CTA from './Sections/CTA';
import apps from "../../assets/apps.png";
import { BsStars } from 'react-icons/bs';
import { GiArcheryTarget } from "react-icons/gi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdHistory, MdOutlinePayment } from "react-icons/md";
import { FaSignature } from 'react-icons/fa';
import chat from '../../assets/chat.png';
import project from '../../assets/project.png';
import create_project from '../../assets/create_project.png';
import minali from '../../assets/artists/minali.jpeg';
import aniket_saxena from '../../assets/artists/aniket_saxena.jpg';
import div from '../../assets/artists/div.jpeg';
import jyoti from '../../assets/artists/jyoti.jpg';
import shubham from '../../assets/artists/shubham.jpg';
import sudharshan from '../../assets/artists/sudharshan.jpg';

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
        <div className='font-hero overflow-hidden'>
            <header>
                <nav className='py-3 relative'>
                    <div className='w-10/12 max-w-screen-xl mx-auto flex items-center justify-between'>
                        <div className="flex items-center gap-2">
                            <img src={logo} className='w-20' />
                            <span className="text-3xl font-bold text-cyan-900 tracking-wide">CO</span>
                        </div>
                        {/* <p onClick={() => setIsHovered(!isHovered)} className='flex items-center gap-2 font-medium font-hero cursor-pointer'>
                            <img className='w-24 cursor-pointer' src={carbonNeutral} alt="" />
                            <SlArrowDown className={`${isHovered && "rotate-180"} duration-200`} size={10} />
                        </p> */}
                        {/* {
                            isHovered &&
                            <Brands setIsHovered={setIsHovered} />
                        } */}

                        <div className='flex items-center gap-8'>
                            <Link className='text-sm font-semibold' to="/CreatorFellowship">Creator Fellowship</Link>
                            {
                                user?.email
                                    ? <Link to="/projects/readydemos"><button className='font-semibold bg-sky-500 py-3 px-5 rounded-full text-sm text-white'>Get Started</button></Link>
                                    : <button onClick={() => dispatch(showLogin())} className='font-semibold bg-sky-500 py-3 px-5 rounded-full text-sm text-white'>Login</button>
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
                <section className="relative pt-36 pb-10 bg-gradient-to-b from-sky-800 to-slate-800">
                    <div className='space-y-32'>
                        <div className="grid grid-cols-2 gap-20 items-center justify-between">
                            <div className='w-10/12 ml-auto'>
                                <h1 className='text-5xl leading-[1.2] text-white font-semibold mb-3'>Create your AI Powered Agency in clicks</h1>
                                <p className='mb-8 text-white text-xl'>The Future of Problem Solving—even if your team isn’t.</p>
                                <button className='bg-yellow-400 py-2 px-5 rounded text-gray-800 font-semibold shadow'>Claim your free trial</button>
                            </div>
                            {/* <img className='w-full' src="https://wac-cdn.atlassian.com/misc-assets/webp-images/JSW_ProductTour_DarkModeIllustration_Hero.webp" alt="" /> */}
                            <div className='p-6 relative'>
                                <div className='rounded space-y-6'>
                                    <div className='h-44 bg-gradient-to-r from-black/50 to-black/30 rounded p-5 space-y-5 relative'>
                                        <div className='h-5 bg-gray-700 rounded'></div>
                                        <div className='h-5 bg-gray-700 rounded mr-32'></div>
                                        <div className='mt-auto flex justify-between absolute bottom-0 left-0 w-full p-5'>
                                            <div className='w-5 h-5 bg-blue-600 rounded'></div>
                                            <div className='w-5 h-5 bg-gray-700 rounded-full'></div>
                                        </div>
                                    </div>
                                    <div className='h-44 bg-gradient-to-r from-black/50 to-black/30 rounded p-5 space-y-5 relative'>
                                        <div className='h-5 bg-gray-700 rounded'></div>
                                        <div className='h-5 bg-gray-700 rounded mr-32'></div>
                                        <div className='mt-auto flex justify-between absolute bottom-0 left-0 w-full p-5'>
                                            <div className='w-5 h-5 bg-yellow-600 rounded'></div>
                                            <div className='w-5 h-5 bg-gray-700 rounded-full'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gradient-to-b from-gray-900 to-[#13324a] rounded absolute w-[400px] top-20 -right-10 pr-10'>
                                    <div className='border-b border-gray-800 p-3'>
                                        <img className='w-10 h-10 opacity-80' src="https://freelogopng.com/images/all_img/1681038242chatgpt-logo-png.png" alt="" />
                                    </div>
                                    <div className='p-3'>
                                        <div className='flex gap-x-2'>
                                            <div className='h-10 w-10 bg-slate-500/30 rounded-full'></div>
                                            <div className='h-10 bg-slate-500/30 rounded w-2/4 mb-3'></div>
                                        </div>
                                        <div className='flex gap-x-2'>
                                            <div className='h-10 bg-gray-700 rounded w-3/4 ml-auto mb-3'></div>
                                            <div className='h-10 w-10 bg-slate-500/30 rounded-full'></div>
                                        </div>
                                        <div className='flex gap-x-2'>
                                            <div className='h-10 w-10 bg-slate-500/30 rounded-full'></div>
                                            <div className='h-10 bg-slate-500/30 rounded w-4/6 mb-3'></div>
                                        </div>
                                        <div className='mt-28 flex gap-1.5'>
                                            <div className='h-10 bg-slate-500/30 rounded w-full'></div>
                                            <div className='h-10 bg-slate-500/30 rounded w-12 flex items-center justify-center text-gray-500'>
                                                <IoMdSend size={25} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-10/12 mx-auto'>
                            <div className='w-4/6'>
                                <h1 className='text-5xl font-bold font-serif text-white/90'>One solution for all your <span className='text-blue-500'>client operations</span> challenges</h1>
                                <h5 className='text-2xl mt-10 leading-[1.35] text-slate-300'>Never wonder “Do we have the resources to handle this?”, “Who’s responsible for delivering that?” or “Is this project profitable?” again. All the answers will be available at a glance in <strong>NsNco.in</strong> Always.</h5>
                            </div>
                        </div>
                    </div>
                    <svg className='w-full absolute left-0 top-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1e293b" fill-opacity="1" d="M0,96L48,80C96,64,192,32,288,37.3C384,43,480,85,576,122.7C672,160,768,192,864,176C960,160,1056,96,1152,80C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                </section>
            </header>


            <section className='w-9/12 mx-auto mt-64 mb-24'>
                <h1 className='text-5xl text-center font-semibold mt-2'>What it does for you?</h1>
                <a href="#" className='text-blue-500 text-lg text-center mt-3 flex justify-center items-center'>Browse all the features <IoIosArrowRoundForward size={30} /></a>
                <div className='mt-10 grid grid-cols-4 gap-3'>
                    <div className='p-4 bg-gray-50 border border-gray-100 shadow rounded-xl'>
                        <div className="flex items-center mb-5">
                            <span className='bg-purple-100  p-1.5 rounded'><BsStars className='text-purple-600' size={23} /></span>
                            <h5 className="text-2xl font-semibold ml-2 mr-3">AI</h5>
                            <small className='bg-purple-100 text-purple-700 px-2 py-.5 rounded-full font-semibold'>Now with Q&A</small>
                        </div>
                        <p className='text-sm mb-1'>Ask literally anything. Chatgpt will answer.</p>
                        <a href="#" className='text-sm font-semibold text-purple-700'>Learn more→</a>
                    </div>
                    <div className='p-4 bg-white border border-gray-100 shadow rounded-xl'>
                        <div className="flex items-center mb-5">
                            <span className='bg-sky-100 p-1.5 rounded'><GiArcheryTarget className='text-sky-600' size={23} /></span>
                            <h5 className="text-2xl font-semibold ml-2 mr-3">Project</h5>
                        </div>
                        <p className='text-sm mb-1'>Manage complex projects without the chaos.</p>
                        <a href="#" className='text-sm font-semibold text-sky-700'>Learn more→</a>
                    </div>
                    <div className='p-4 bg-white border border-gray-100 shadow rounded-xl'>
                        <div className="flex items-center mb-5">
                            <span className='bg-orange-100 p-1.5 rounded'><RiCustomerService2Fill className='text-orange-600' size={23} /></span>
                            <h5 className="text-2xl font-semibold ml-2 mr-3">Assistant</h5>
                        </div>
                        <p className='text-sm mb-1'>Servicing assistant 24/7 for your help with project.</p>
                        <a href="#" className='text-sm font-semibold text-orange-700'>Learn more→</a>
                    </div>
                    <div className='p-4 bg-white border border-gray-100 shadow rounded-xl'>
                        <div className="flex items-center mb-5">
                            <span className='bg-lime-100 p-1.5 rounded'><MdHistory className='text-lime-600' size={23} /></span>
                            <h5 className="text-2xl font-semibold ml-2 mr-3">Tracking</h5>
                        </div>
                        <p className='text-sm mb-1'>Keep clear tracking on your project with recorded conversations.</p>
                        <a href="#" className='text-sm font-semibold text-lime-700'>Learn more→</a>
                    </div>
                    <div className='p-4 bg-white border border-gray-100 shadow rounded-xl'>
                        <div className="flex items-center mb-5">
                            <span className='bg-yellow-100 p-1.5 rounded'><FaSignature className='text-yellow-600' size={23} /></span>
                            <h5 className="text-2xl font-semibold ml-2 mr-3">DocuSign</h5>
                        </div>
                        <p className='text-sm mb-1'>Legal authorization with digital project signing.</p>
                        <a href="#" className='text-sm font-semibold text-yellow-700'>Learn more→</a>
                    </div>
                    <div className='p-4 bg-white border border-gray-100 shadow rounded-xl'>
                        <div className="flex items-center mb-5">
                            <span className='bg-green-100 p-1.5 rounded'><MdOutlinePayment className='text-green-600' size={23} /></span>
                            <h5 className="text-2xl font-semibold ml-2 mr-3">Payments</h5>
                        </div>
                        <p className='text-sm mb-1'>Secure payments method and transaction.</p>
                        <a href="#" className='text-sm font-semibold text-green-700'>Learn more→</a>
                    </div>
                </div>
            </section>


            {/* <CTA /> */}




            <section className='w-9/12 mx-auto grid grid-cols-2 items-center gap-10 py-10'>
                <div className='w-11/12 mr-auto relative'>
                    <img className='relative -left-10 rounded-3xl shadow-lg bg-gradient-to-t from-pink-300 via-blue-500 to-pink-400 p-1.5 -rotate-12' src={project} alt="" />
                    <img className='absolute top-0 left-10 rounded-3xl shadow-lg bg-gradient-to-t from-pink-300 via-blue-500 to-pink-400 p-1.5 rotate-[5deg]' src={create_project} alt="" />
                </div>
                <div className='pl-5'>
                    <small className='text-orange-500 font-bold'>BENIFIT</small>
                    <h4 className='text-2xl font-semibold mb-4 mt-2'>Organize everything in one system of record</h4>
                    <p className='text-gray-500 mb-6'>From client assets and project timelines to communications and financial reporting.</p>
                </div>
            </section>

            <section className='w-9/12 mx-auto grid grid-cols-12 items-center gap-5 my-24'>
                <div className='col-span-7 rounded-lg'>
                    <small className='text-green-500 font-bold'>WORK ASSISTANT</small>
                    <h4 className='text-2xl font-semibold mb-4 mt-2'>A Personal Assistant Just For You</h4>
                    <p className='text-gray-500 mb-6 pr-20'>GPT driven custom chat engine to support every customer query, with answers to all possible questions and about your company.</p>
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-4 bg-gradient-to-t from-white via-blue-100 to-white -rotate-12'>
                    <img className='w-full rounded-lg ml-auto rotate-[18deg] shadow-lg border' src={chat} alt="" />
                </div>
            </section>


            <section className="bg-sky-600 text-white my-20 py-20">
                <div className='w-9/12 mx-auto md:grid grid-cols-2 items-center gap-10'>
                    <div>
                        <h2 className="text-5xl font-semibold">We integrate with your work flow</h2>
                        <p className="mt-5 mb-3">
                            NsNco solution gives you the added advantage of integration with several third party apps seamlessly with our apis.
                        </p>

                        <div className='border-l-4 pl-2 border-sky-100 font-bold mt-16'>
                            <button type="button" class="bg-white py-1 px-3 rounded text-sm text-sky-500 font-bold mr-2">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <img className="w-4/5 ml-auto rounded-xl" src={apps} alt="" />
                    </div>
                </div>
            </section>





            <section className="bg-gray-100 my-20 py-20 overflow-hidden border-y border-gray-100">
                <div className='relative w-9/12 mx-auto md:grid grid-cols-2 items-center gap-10'>
                    <div>
                        <h2 className="text-4xl font-bold">Collaborate with over 700+ growing community of artists/ freelancers/ agencies </h2>
                        <p className="mt-5 mb-3">
                            Pickup as many projects as come your way getting them done seamlessly by processing them via 3rd party vendors.
                        </p>

                        <div className='border-l-4 pl-2 border-sky-500 font-bold mt-16'>
                            <button type="button" class="bg-white py-1 px-3 rounded text-sm text-sky-500 font-bold mr-2">
                                Buy Premium
                            </button>
                        </div>
                    </div>
                    <div className="absolute -right-20 w-1/2 -rotate-12">
                        <div className='absolute top-0 left-0 bg-transparent z-50 w-[800px] h-full'></div>

                        <div className='w-[800px] grid grid-cols-3 gap-5'>
                            <div className='flex flex-col gap-3 bg-white p-3 rounded-lg shadow'>
                                <img className='w-12 rounded-full' src={aniket_saxena} alt="" />
                                <div>
                                    <strong>Aniket Saxena</strong>
                                    <p className="text-sm">2D animation Artist</p>
                                </div>
                                <button className='bg-blue-500 text-white p-1 rounded font-semibold text-xs'>Collaborate</button>
                            </div>
                            <div className='flex flex-col gap-3 bg-white p-3 rounded-lg shadow'>
                                <img className='w-12 rounded-full' src="https://i.pravatar.cc/300" alt="" />
                                <div>
                                    <strong>Aditi Gupta</strong>
                                    <p className="text-sm">Writer</p>
                                </div>
                                <button className='bg-blue-500 text-white p-1 rounded font-semibold text-xs'>Collaborate</button>
                            </div>
                            <div className='flex flex-col gap-3 bg-white p-3 rounded-lg shadow'>
                                <img className='w-12 rounded-full' src="https://i.pravatar.cc/300" alt="" />
                                <div>
                                    <strong>Smit Willson</strong>
                                    <p className="text-sm">Graphic Designer</p>
                                </div>
                                <button className='bg-blue-500 text-white p-1 rounded font-semibold text-xs'>Collaborate</button>
                            </div>
                            <div className='flex flex-col gap-3 bg-white p-3 rounded-lg shadow'>
                                <img className='w-12 rounded-full' src={jyoti} alt="" />
                                <div>
                                    <strong>Jyoti Gupta</strong>
                                    <p className="text-sm">Video Producer</p>
                                </div>
                                <button className='bg-blue-500 text-white p-1 rounded font-semibold text-xs'>Collaborate</button>
                            </div>
                            <div className='flex flex-col gap-3 bg-white p-3 rounded-lg shadow'>
                                <img className='w-12 rounded-full' src={shubham} alt="" />
                                <div>
                                    <strong>Shubham Goyal</strong>
                                    <p className="text-sm">Actor</p>
                                </div>
                                <button className='bg-blue-500 text-white p-1 rounded font-semibold text-xs'>Collaborate</button>
                            </div>
                            <div className='flex flex-col gap-3 bg-white p-3 rounded-lg shadow'>
                                <img className='w-12 rounded-full' src={minali} alt="" />
                                <div>
                                    <strong>Minali</strong>
                                    <p className="text-sm">Video Producer</p>
                                </div>
                                <button className='bg-blue-500 text-white p-1 rounded font-semibold text-xs'>Collaborate</button>
                            </div>
                            <div className='flex flex-col gap-3 bg-white p-3 rounded-lg shadow'>
                                <img className='w-12 rounded-full' src={sudharshan} alt="" />
                                <div>
                                    <strong>Sudarshan Birla</strong>
                                    <p className="text-sm">Graphic Designer</p>
                                </div>
                                <button className='bg-blue-500 text-white p-1 rounded font-semibold text-xs'>Collaborate</button>
                            </div>
                            <div className='flex flex-col gap-3 bg-white p-3 rounded-lg shadow'>
                                <img className='w-12 rounded-full' src={div} alt="" />
                                <div>
                                    <strong>Divyansh Srivastav</strong>
                                    <p className="text-sm">Graphic Designer</p>
                                </div>
                                <button className='bg-blue-500 text-white p-1 rounded font-semibold text-xs'>Collaborate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section className='w-9/12 mx-auto mb-24'>
                <h1 className='text-5xl text-center font-semibold mb-16 mt-2'>Affordable pricing that matches your needs</h1>
                <div className='mx-auto grid grid-cols-2'>
                    <div className='relative left-20 bg-white border border-gray-300 rounded-3xl p-10 shadow-sm'>
                        <h6 className='text-2xl font-semibold mb-2'>Basic</h6>
                        <span className='bg-red-100 p-1 font-semibold rounded-sm'>Limited Features</span>

                        <ul className='border-b border-gray-300 pb-6 mb-6 mt-4 space-y-1'>
                            <li className='flex items-center gap-2'>
                                <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                                <span>Simple use cases</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                                <span>Internal users</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <img src="https://kissflow.com/hubfs/kissflow-branding-images/pricing-cross.svg" alt="" />
                                <span className='line-through decoration-red-600'>External users</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <img src="https://kissflow.com/hubfs/kissflow-branding-images/pricing-cross.svg" alt="" />
                                <span className='line-through decoration-red-600'>Private cluster</span>
                            </li>
                        </ul>

                        <h6 className='text-2xl font-semibold mb-2 text-pink-500'>Starts at</h6>
                        <h6 className='text-2xl font-semibold mb-2'>$90/month</h6>

                        <button className='mt-6 border border-blue-600 py-2 px-5 rounded font-semibold text-blue-600'>Get Started</button>
                    </div>

                    <div className='relative -left-20 z-10 bg-gradient-to-r from-pink-600 to-blue-500 p-0.5 rounded-3xl shadow-sm'>
                        <div className='p-10 bg-white rounded-3xl'>
                            <h6 className='text-2xl font-semibold mb-2 flex gap-1'>
                                <span className='text-blue-600'>Enterprise</span>
                                <img className='relative -top-2' src="https://kissflow.com/hubfs/KF%20Brand%20Home/pricing-enterprice.svg" alt="" />
                            </h6>
                            <span className='bg-green-100 p-1 font-semibold rounded-sm'>Full Features</span>

                            <ul className='border-b border-gray-300 pb-6 mb-6 mt-4 space-y-1'>
                                <li className='flex items-center gap-2'>
                                    <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                                    <span>Complex use cases</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                                    <span>Internal users</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                                    <span>External users</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                                    <span>Private cluster</span>
                                </li>
                            </ul>

                            <h6 className='text-2xl font-semibold mb-2 text-pink-500'>Flexible</h6>
                            <h6 className='text-2xl font-semibold mb-2'>$300/month</h6>

                            <button className='mt-6 border bg-blue-600 py-2 px-5 rounded font-semibold text-white'>Get Started</button>
                        </div>
                    </div>
                </div>
            </section>



            {/* <section className="bg-gray-50 text-black mt-10 py-20">
                <div className="w-10/12 mx-auto grid grid-cols-2 items-center gap-10">
                    <div>
                        <h1 className='text-4xl font-semibold mb-5'>Revolutionize your content with cutting-edge ML technology</h1>
                        <small className='text-sm block mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet arcu lacus. Maecenas nec diam hendrerit, finibus nunc eget, pharetra ligula.</small>
                        <button className='bg-white border border-sky-500 py-3 px-5 rounded-full text-sm text-black'>Learn More</button>
                    </div>
                    <iframe className='w-full aspect-video' src="https://player.vimeo.com/video/819139346?h=d6fa5efcc3" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                </div>
            </section> */}

            {/* <section className="py-24 bg-sky-100 bg-[url('https://kitpro.site/ailope/wp-content/uploads/sites/173/2023/06/line.png')] bg-cover">
                <div className='w-10/12 mx-auto'>
                    <p className='text-sky-500 font-bold mb-2'>Common Queries</p>
                    <h1 className='text-5xl font-semibold mb-3'>Frequently Asked Question</h1>
                    <p className='text-sm mb-6 text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                    <ul className='grid grid-cols-2 gap-x-12 gap-y-2'>
                        <li className='bg-white border rounded-r-full border-neutral-300 text-sm text-black flex items-center'>
                            <button className='bg-emerald-500 text-white py-3 px-5 h-full'><IoIosArrowDown size={20} /></button>
                            <p className="py-3 px-5">How to operate this AI tools?</p>
                        </li>
                        <li className='bg-white border rounded-r-full border-neutral-300 text-sm text-black flex items-center'>
                            <button className='bg-emerald-500 text-white py-3 px-5 h-full'><IoIosArrowDown size={20} /></button>
                            <p className="py-3 px-5">How to operate this AI tools?</p>
                        </li>
                        <li className='bg-white border rounded-r-full border-neutral-300 text-sm text-black flex items-center'>
                            <button className='bg-emerald-500 text-white py-3 px-5 h-full'><IoIosArrowDown size={20} /></button>
                            <p className="py-3 px-5">How to operate this AI tools?</p>
                        </li>
                        <li className='bg-white border rounded-r-full border-neutral-300 text-sm text-black flex items-center'>
                            <button className='bg-emerald-500 text-white py-3 px-5 h-full'><IoIosArrowDown size={20} /></button>
                            <p className="py-3 px-5">How to operate this AI tools?</p>
                        </li>
                        <li className='bg-white border rounded-r-full border-neutral-300 text-sm text-black flex items-center'>
                            <button className='bg-emerald-500 text-white py-3 px-5 h-full'><IoIosArrowDown size={20} /></button>
                            <p className="py-3 px-5">How to operate this AI tools?</p>
                        </li>
                        <li className='bg-white border rounded-r-full border-neutral-300 text-sm text-black flex items-center'>
                            <button className='bg-emerald-500 text-white py-3 px-5 h-full'><IoIosArrowDown size={20} /></button>
                            <p className="py-3 px-5">How to operate this AI tools?</p>
                        </li>
                    </ul>
                </div>
            </section> */}

            <section className="py-24 footer-top-section bg-cover text-center">
                <h1 className='text-4xl font-semibold text-white mb-5'>Get Started with NsNco Today</h1>
                <button className='bg-yellow-400 py-3 px-5 rounded-full text-gray-800 font-semibold shadow'>Claim your free trial</button>
            </section>

            {/* auth modal */}
            <AuthModal />

            <Footer />
        </div>
    );
};

export default Home;