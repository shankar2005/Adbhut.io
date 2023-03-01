import { MdKeyboard } from 'react-icons/md';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import adbhutGIF from '../../assets/logos/adbhutGIF.gif';
import { useState } from 'react';

const Home = () => {
    const { contentProducts, handleSelectContentProduct, skills, setSearchText } = useRootContext();

    const [skillInputValue, setskillInputValue] = useState("");
    const navigate = useNavigate();

    const handleNavigateProject = (e) => {
        setSearchText(skillInputValue);
        navigate("/artists");
    }

    const skillSearchInput = (e) => {
        setskillInputValue(e.target.value);
        console.log(skillInputValue);
    }

    return (
        <section className='h-screen lg:flex items-center justify-center'>
            <div className='relative lg:absolute top-5 left-5 md:left-16'>
                <img src={adbhutGIF} className='w-32' />
            </div>
            <div className='w-11/12 mx-auto pt-24 pb-10 lg:pt-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-20'>
                <div className='order-last lg:order-first'>
                    <h1 className='text-2xl sm:text-3xl leading-tight font-bold'>
                        The Most Efficient <br />
                        Content Production Platform. <br />
                        Now Accessible to Everyone <br />
                        Across the Globe.
                    </h1>
                    {/* <p>
                        We dissected the production processes and built a secure, <br />
                        business content servicing platform. ADBHUT.IO is here to make <br />
                        entertainment content affordable and available for all.
                    </p> */}
                    <div className='mt-8 flex gap-4'>
                        <Link to="/projects/create-project">
                            <button type="button" className="text-white bg-sky-500 hover:bg-sky-600 focus:outline-none font-medium rounded w-full sm:w-auto px-5 py-3.5 text-center flex items-center gap-2 whitespace-nowrap">New Project</button>
                        </Link>
                        <div className='relative'>
                            <form onSubmit={handleNavigateProject} className='relative'>
                                <input onKeyUp={skillSearchInput} type="text" name="skill" className='border py-3.5 w-60 md:w-72 pl-10 pr-3 rounded text-sm outline-none border-gray-700' placeholder='Search your artist by skills' required />
                                <MdKeyboard className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                            </form>
                            {
                                skillInputValue &&
                                <ul id='homeSkillScrollSearch' className='absolute bottom-1 translate-y-full w-full h-fit max-h-52 overflow-y-scroll rounded-b-lg bg-white border shadow-xl'>
                                    {
                                        skills
                                            ?.filter(skill => skill.name?.toLowerCase()?.startsWith(skillInputValue.toLowerCase()))
                                            ?.map(skill => <li className='py-2.5 px-3 hover:bg-gray-200 text-sm font-medium'>
                                                <button onClick={() => {
                                                    setSearchText(skill.name)
                                                    navigate("/artists/")
                                                }} className='w-full text-left'>{skill.name}</button>
                                            </li>)
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                    <div className='my-5 flex flex-wrap items-center gap-2 font-medium'>
                        Popular: {
                            contentProducts?.map(content => <button type='button' onClick={() => {
                                handleSelectContentProduct(content);
                                navigate("/artists");
                            }} className='border whitespace-nowrap border-gray-400 hover:bg-gray-200 text-sm py-1 px-2 rounded-full'>{content.name}</button>)
                        }
                    </div>
                    <div className='border-t border-gray-300 block pt-5 text-gray-700'>
                        <a target="_blank" href="https://nsnco.in/" className='text-blue-600'>Learn more</a> about NsNco
                    </div>
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
                                    <div className='h-60 md:h-80 border border-sky-100 bg-sky-50 rounded-full p-14 flex justify-center items-center'>
                                        <img className='w-80' src={content.weblink} alt="" />
                                    </div>
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