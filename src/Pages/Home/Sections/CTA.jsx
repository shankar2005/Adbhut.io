import React from 'react';
import { useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { BsCheck2Square } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRootContext } from '../../../contexts/RootProvider';

const CTA = () => {
    const navigate = useNavigate();
    const { contentProducts, handleSelectContentProduct } = useRootContext();

    const contentSwiperRef = useRef();
    const brandNextSlide = () => {
        contentSwiperRef.current?.swiper.slideNext();
    };
    const brandPrevSlide = () => {
        contentSwiperRef.current?.swiper.slidePrev();
    };

    return (
        <section className='w-[78%] mx-auto my-20 grid grid-cols-4 gap-10 items-center'>
            <div className='col-span-1 border-l-2 border-orange-300 pl-5'>
                <h4 className='text-xl font-semibold mb-2'>Let our AI handle it</h4>
                <p>Lorem ipsum dolor sit amet, consectetur. Ut elit tellus, luctus nec ullamcorper.</p>
            </div>
            <div className='col-span-3 select-none'>
                <Swiper
                    className='p-5'
                    slidesPerView={3}
                    spaceBetween={40}
                    ref={contentSwiperRef}
                >
                    <SwiperSlide>
                        <div className='cursor-pointer py-5 px-3 shadow-lg flex flex-col items-center gap-2 rounded-lg'>
                            <img className='w-12 h-12 object-contain' src="https://kitpro.site/ailope/wp-content/uploads/sites/173/2023/06/artificial-intelligence-15-1.png" alt="" />
                            <h5 className='font-semibold text-lg'>New Project</h5>
                        </div>
                    </SwiperSlide>

                    {contentProducts?.map(content => (
                        <SwiperSlide
                            key={content.pk}
                            onClick={() => {
                                handleSelectContentProduct(content);
                                navigate("/projects/create-project");
                            }}
                        >
                            <div className='cursor-pointer py-5 px-3 shadow-lg flex flex-col items-center gap-2 rounded-lg'>
                                <img className='w-12 h-12 object-contain' src={content.weblink} alt="" />
                                <h5 className='font-semibold text-lg'>{content.name}</h5>
                            </div>
                        </SwiperSlide>
                    ))}
                    <button onClick={brandPrevSlide} className="bg-gray-400 rounded-full text-white absolute top-1/2 -translate-y-1/2 left-1 z-50"><BiChevronLeft size={30} /></button>
                    <button onClick={brandNextSlide} className="bg-gray-400 rounded-full text-white absolute top-1/2 -translate-y-1/2 right-1 z-10"><BiChevronRight size={30} /></button>
                </Swiper>
            </div>
        </section>
    );
};

export default CTA;