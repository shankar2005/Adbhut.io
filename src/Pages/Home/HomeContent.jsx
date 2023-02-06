import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { MdKeyboard } from 'react-icons/md';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import nsnlogo from '../../assets/logo.jpeg';

const HomeContent = () => {
    return (
        <section className='h-screen flex justify-center items-center'>
            <nav className='absolute left-0 top-2 ml-16'>
                <img className='w-10' src={nsnlogo} alt="" />
            </nav>
            <div className='w-11/12 mx-auto pt-10 grid grid-cols-2 items-center justify-between gap-20'>
                <div>
                    <h1 className='text-[40px] leading-tight mb-5'>
                        Premium content production. <br />
                        Now affordable for everyone.
                    </h1>
                    <p className='text-lg text-gray-500'>We dissected the production processes and built a secure, business content servicing platform. NsNco, to make entertainment content affordable and available for all. </p>
                    <div className='mt-12 flex gap-6 border-b pb-10 border-gray-300'>
                        <button type="submit" class="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded w-full sm:w-auto px-5 py-2.5 text-center flex items-center gap-2"><IoCreateOutline className='mb-1' size={25} /> New Project</button>
                        <form className='relative'>
                            <input type="text" name="search" className='border py-3.5 w-72 focus:w-80 pl-10 pr-3 rounded text-sm outline-none border-gray-700' placeholder='Enter email to login' required />
                            <MdKeyboard className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                        </form>
                    </div>
                    <p className='mt-6 text-gray-500'><span className='text-blue-500'>Learn more</span> about NsNco</p>
                </div>

                <div className='homeContent'>
                    <Swiper
                        slidesPerView={1}
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        <SwiperSlide>
                            <div className='text-center w-4/6 mx-auto'>
                                <img className='w-80 mx-auto' src="https://www.gstatic.com/meet/meet_google_one_carousel_promo_icon_0f14bf8fc61484b019827c071ed8111d.svg" alt="" />
                                <h3 className='text-2xl mt-4'>Group calls will be limited to 1 hour</h3>
                                <p className='mt-2 text-sm'>To get longer calls after 13 February, subscribe to a Google One Premium plan. </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='text-center w-4/6 mx-auto'>
                                <img className='w-80 mx-auto' src="https://www.gstatic.com/meet/meet_google_one_carousel_promo_icon_0f14bf8fc61484b019827c071ed8111d.svg" alt="" />
                                <h3 className='text-2xl mt-4'>Group calls will be limited to 1 hour</h3>
                                <p className='mt-2 text-sm'>To get longer calls after 13 February, subscribe to a Google One Premium plan. </p>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>
            </div>
        </section>
    );
};

export default HomeContent;