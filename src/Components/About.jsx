import React from 'react';
import reading from '../../assets/icon/reading.png';
import commerce from '../../assets/icon/commerce.png';
import employment from '../../assets/icon/employment.png';
import energy from '../../assets/icon/energy.png';
import gender from '../../assets/icon/gender.png';
import skill from '../../assets/icon/skill.png';
import tree from '../../assets/icon/tree.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const About = () => {
    return (
        <section className='max-w-screen-xl mx-auto px-10 xl:px-0 py-8 text-white'>
            <Swiper
                spaceBetween={1}
                slidesPerView={6}
                className="pb-1 lg:hidden"
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    900: {
                        slidesPerView: 4,
                    },
                    1050: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 6,
                    }
                }}
            >
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={reading} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Child Education</p>
                    </div>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={commerce} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Cause Driven Cansumerism</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={employment} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Employement Generation</p>
                    </div>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={energy} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Renewable Energy Adoption</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={gender} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Gender Inclusivity</p>
                    </div>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={skill} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Child Education</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={tree} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Tree Plantation</p>
                    </div>
                </SwiperSlide>
            </Swiper>
            <Swiper
                spaceBetween={1}
                slidesPerView={6}
                className="hidden lg:block pb-1"
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    900: {
                        slidesPerView: 4,
                    },
                    1050: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 6,
                    }
                }}
            >
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={reading} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Child Education</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={commerce} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Cause Driven Cansumerism</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={employment} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Employement Generation</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={energy} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Renewable Energy Adoption</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={gender} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Gender Inclusivity</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={skill} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Child Education</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-purple-700 bg-opacity-75 h-40 flex flex-col items-center justify-center shadow text-center'>
                        <div className='flex-1 flex items-center'>
                            <img className='w-16' src={tree} alt="" />
                        </div>
                        <p className='bg-white w-full py-4 text-black text-opacity-80 text-xs font-medium'>Tree Plantation</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default About;