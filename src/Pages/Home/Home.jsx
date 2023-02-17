import React, { useReducer } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { MdKeyboard } from 'react-icons/md';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/Shared/Navbar';
import { dropdownInitialState, dropdownReducers } from '../../state/reducers/dropdownReducer';
import { TfiBackRight } from 'react-icons/tfi';
import { useRootContext } from '../../contexts/RootProvider';

const Home = () => {
    const { contentProducts } = useRootContext();

    const navigate = useNavigate();
    const handleNavigateProject = (e) => {
        e.preventDefault();
        navigate(`/projects/${e.target.project.value}/DreamProject/`);
    }

    const [state, dispatch] = useReducer(dropdownReducers, dropdownInitialState);

    return (
        <section className='h-screen'>
            <Navbar
                state={state}
                dispatch={dispatch}
            />
            <div className='w-11/12 mx-auto pt-10 grid grid-cols-2 items-center justify-between gap-20'>
                <button onClick={() => history.back()} type='button' className='absolute z-50 top-32 right-20 bg-gray-100 p-3 rounded-l-full text-blue-500'>
                    <TfiBackRight size={30} />
                </button>
                <div>
                    <h1 className='text-[40px] leading-tight mb-5'>
                        The Most Efficient Content Production Platform. <br />
Now Accessible to Everyone Across the Globe.
                    </h1>
                    <p className='text-lg text-gray-500'>We dissected the production processes and built a secure, business content servicing platform. NsNco is here to make entertainment content affordable and available for all. </p>
                    <div className='mt-12 flex gap-6 border-b pb-10 border-gray-300'>
                        <Link to="/projects/create-project">
                            <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded w-full sm:w-auto px-5 py-2.5 text-center flex items-center gap-2"><IoCreateOutline className='mb-1' size={25} /> New Project</button>
                        </Link>
                        <form onSubmit={handleNavigateProject} className='relative'>
                            <input type="text" name="project" className='border py-3.5 w-72 focus:w-80 pl-10 pr-3 rounded text-sm outline-none border-gray-700' placeholder='Enter project id to continue' required />
                            <MdKeyboard className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                        </form>
                    </div>
                    <a target="_blank" href="https://nsnco.in/">
                        <p className='mt-6 text-gray-500'><span className='text-blue-500'>Learn more</span> about NsNco</p>
                    </a>
                </div>

                <div className='homeContent'>
                    <Swiper
                        slidesPerView={1}
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {
                            contentProducts.map(content => <SwiperSlide>
                                <div className='text-center w-4/6 mx-auto'>
                                    <img className='w-80 mx-auto' src="https://www.gstatic.com/meet/meet_google_one_carousel_promo_icon_0f14bf8fc61484b019827c071ed8111d.svg" alt="" />
                                    <h3 className='text-2xl mt-4'>{content.name}</h3>
                                    <p className='mt-2 text-sm'>{content.details}</p>
                                </div>
                            </SwiperSlide>)
                        }
                    </Swiper>

                </div>
            </div>
        </section>
    );
};

export default Home;