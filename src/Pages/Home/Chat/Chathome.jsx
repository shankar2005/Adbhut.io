import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineGif, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRootContext } from '../../../contexts/RootProvider';
import { clearProject } from '../../../features/project/projectSlice';
import nsnlogo from '../../../assets/logos/adbeta.jpeg';
import ChatHeading from './ChatHeading';
import { BsCheck2Square, BsEmojiSmile, BsFillMicFill, BsImageFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';

const Chathome = () => {
    const dispatch = useDispatch();
    const { isFullTime } = useSelector(state => state.viewMode);
    const { selectedContentProduct } = useSelector(state => state.project);
    const currentProject = useSelector(state => state.project);

    const { contentProducts, handleSelectContentProduct, isMobile, skills, handleSelectSkill } = useRootContext();
    const navigate = useNavigate();

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setSuggestions(skills.map(skill => [skill.name, skill.pk]));
    }, [skills])

    useEffect(() => {
        sessionStorage.removeItem("CURRENT_PROJECT");
    }, [])

    useEffect(() => {
        dispatch(clearProject());
    }, []);

    const chatboxRef = useRef();
    useEffect(() => {
        const chatboxElement = chatboxRef.current;
        chatboxElement.scrollTo(0, chatboxElement.scrollHeight);
    }, [])

    useEffect(() => {
        if (chatboxRef) {
            chatboxRef.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    return (
        <div ref={chatboxRef} className='overflow-hidden relative'>
            <ChatHeading />
            <div className='flex flex-col p-3'>
                <motion.div
                    initial={{ translateX: '-100%' }}
                    animate={{ translateX: '0%' }}
                    transition={{ delay: 0.2 }}
                >
                    <div className='text-sm flex gap-2 mb-5'>
                        <img className='w-10 h-10' src={nsnlogo} alt="" />
                        <div className='mr-5'>
                            <h4 className='font-medium'>Adbhut.io</h4>
                            <p className='bg-sky-500 text-white p-3 rounded-bl-lg rounded-br-lg rounded-tr-lg w-fit mb-1'>
                                Hello, I'm Adbhut. Lets {isFullTime ? "Hire" : "Create"}! <br />
                                Select any of the content products to get started
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {
                !isFullTime && contentProducts.length > 0 &&
                <div className='sticky bottom-0 bg-white p-3 pb-2 contentProducts text-center select-none mt-8'>
                    <Swiper
                        spaceBetween={5}
                        slidesPerView={4}
                        modules={[Navigation]}
                        navigation
                        className='px-3'
                    >
                        <SwiperSlide>
                            <Link to="/projects/create-project">
                                <div className='group flex flex-col gap-2 items-center'>
                                    <div className='border rounded-md h-[76px] w-[76px] flex items-center justify-center'>
                                        <AiOutlinePlus className='group-hover:scale-110 duration-150 overflow-hidden text-gray-600' size={40} />
                                    </div>
                                    <p className='text-[0.6rem] leading-tight'>New Project</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/projects/readydemos"><div className='group flex flex-col gap-2 items-center cursor-pointer'>
                                <div className='flex items-center justify-center'>
                                    <BsCheck2Square className="scale-110 duration-150 overflow-hidden text-green-500" size={78} />
                                </div>
                                <p className='text-[0.6rem] leading-tight'>Ready To Use</p>
                            </div>
                            </Link>
                        </SwiperSlide>
                        {
                            contentProducts?.map(content => (
                                <SwiperSlide key={content.pk}>
                                    <div onClick={() => {
                                        handleSelectContentProduct(content)
                                        if (isMobile) {
                                            navigate("/projects/chat");
                                        } else {
                                            navigate("/artists");
                                        }
                                    }} className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                        <div className={`${currentProject?.project_template === content.pk || selectedContentProduct === content.pk ? 'w-20 h-20' : 'w-[75px] h-[75px]'} p-1 border rounded-md`}>
                                            <img className='group-hover:scale-110 duration-150 overflow-hidden' src={content.weblink} />
                                        </div>
                                        <p className={`${currentProject?.project_template === content.pk || selectedContentProduct === content.pk && 'text-blue-600 font-medium'} text-[0.6rem] leading-tight`}>{content.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            }
            {
                isFullTime && suggestions.length > 0 &&
                <div className='sticky bottom-0 p-2 bg-white mt-28'>
                    <div className='pb-2 skillScroll overflow-x-scroll flex gap-2 text-sm font-medium select-none'>
                        {
                            suggestions &&
                            suggestions.map(skill => <div
                                onClick={() => {
                                    handleSelectSkill(skill)
                                    navigate("/artists")
                                }}
                                key={`suggestedSkill${skill[1]}`}
                                className='whitespace-nowrap py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>
                                {skill[0]}
                            </div>)
                        }
                    </div>
                </div>
            }

            <div className='p-3 border-t-[3px] mt-2 border-gray-300'>
                <textarea className="p-2 rounded-lg bg-gray-100 w-full focus:outline-none text-sm cursor-not-allowed" rows="4" placeholder='Start a briefing...' disabled></textarea>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <BsEmojiSmile className="opacity-30" />
                        <ImAttachment className="opacity-30" />
                        <BsImageFill className="opacity-30" />
                        <AiOutlineGif className="opacity-30" />
                    </div>
                    <div className='flex items-center space-x-1'>
                        <BsFillMicFill className="opacity-30" />
                        <button type='button' className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chathome;