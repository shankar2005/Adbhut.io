import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { BsCheck2Square } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRootContext } from '../../../contexts/RootProvider';

const Hero = () => {
    const contentSwiperRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isFullTime } = useSelector(state => state.viewMode);
    const { selectedContentProduct } = useSelector(state => state.project);
    const currentProject = useSelector(state => state.project);
    const { contentProducts, handleSelectContentProduct, handleSelectSkill, skills } = useRootContext();
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setSuggestions(skills.map(skill => [skill.name, skill.pk]));
    }, [skills]);

    const [limit, setLimit] = useState(20);

    const brandNextSlide = () => {
        contentSwiperRef.current?.swiper.slideNext();
    };
    const brandPrevSlide = () => {
        contentSwiperRef.current?.swiper.slidePrev();
    };

    return (
        <div>
            {
                !isFullTime && contentProducts.length > 0 &&
                <div className='text-center select-none mt-8'>
                    <Swiper
                        className='px-4'
                        ref={contentSwiperRef}
                        slidesPerView={7}
                        breakpoints={{
                            320: {
                                slidesPerView: 3,
                            },
                            480: {
                                slidesPerView: 4,
                            },
                            640: {
                                slidesPerView: 7,
                            }
                        }}
                    >
                        <SwiperSlide>
                            <Link to="/projects/create-project">
                                <div className='group flex flex-col gap-2 items-center'>
                                    <div className='border rounded-md h-[76px] w-[76px] flex items-center justify-center'>
                                        <AiOutlinePlus className='group-hover:scale-110 duration-150 overflow-hidden text-gray-600' size={40} />
                                    </div>
                                    <p className='text-xs leading-tight font-semibold'>New Project</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/projects/readydemos">
                                <div className='group flex flex-col gap-2 items-center cursor-pointer'>
                                    <div className='flex items-center justify-center'>
                                        <BsCheck2Square className="scale-110 duration-150 overflow-hidden text-green-500" size={78} />
                                    </div>
                                    <p className='text-xs leading-tight font-semibold'>Ready To Use</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                        {
                            contentProducts?.map(content => (
                                <SwiperSlide key={content.pk}>
                                    <div onClick={() => {
                                        handleSelectContentProduct(content);
                                        navigate("/projects/create-project");
                                    }} className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                        <div className={`${currentProject?.project_template === content.pk || selectedContentProduct === content.pk ? 'w-20 h-20' : 'w-[75px] h-[75px]'} p-1 border rounded-md`}>
                                            <img className='group-hover:scale-110 duration-150 overflow-hidden' src={content.weblink} />
                                        </div>
                                        <p className={`${currentProject?.project_template === content.pk || selectedContentProduct === content.pk && 'text-blue-600 font-bold'} font-semibold text-xs leading-tight`}>{content.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                        <button onClick={brandPrevSlide} className="bg-gray-400 rounded-full text-white absolute top-1/2 -translate-y-1/2 left-0 z-10"><BiChevronLeft size={30} /></button>
                        <button onClick={brandNextSlide} className="bg-gray-400 rounded-full text-white absolute top-1/2 -translate-y-1/2 right-0 z-10"><BiChevronRight size={30} /></button>
                    </Swiper>
                </div>
            }
            {
                isFullTime && suggestions.length > 0 &&
                <div className='sticky bottom-0 p-2 bg-white mt-5'>
                    <div className='pb-2 flex flex-wrap gap-2 text-sm font-medium select-none'>
                        {
                            suggestions.slice(0, limit).map(skill => <div
                                onClick={() => {
                                    handleSelectSkill(skill)
                                    navigate("/artists")
                                }}
                                key={`suggestedSkill${skill[1]}`}
                                className='whitespace-nowrap py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>
                                {skill[0]}
                            </div>)
                        }
                        {limit === 20
                            ? <button className='text-blue-700 hover:underline' onClick={() => setLimit()}>View all</button>
                            : <button className='text-blue-700 hover:underline' onClick={() => setLimit(20)}>Hide</button>
                        }
                    </div>
                </div>
            }
        </div >
    );
};

export default Hero;