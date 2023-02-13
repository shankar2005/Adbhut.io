import React, { useContext } from 'react';
import { MdCelebration } from 'react-icons/md';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { useRootContext } from '../../contexts/RootProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const category = [
    {
        pk: 6,
        name: "Artwork",
        image: "https://img.icons8.com/external-ddara-flat-ddara/64/null/external-artwork-digital-marketing-ddara-flat-ddara.png"
    },
    {
        pk: 1,
        name: "Chat Show",
        image: "https://img.icons8.com/color/48/null/filled-chat.png"
    },
    {
        pk: 2,
        name: "Documentary",
        image: "https://img.icons8.com/color-glass/48/null/documentary.png"
    },
    {
        pk: 4,
        name: "Fiction & Reality",
        image: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-fiction-literature-flaticons-lineal-color-flat-icons.png"
    },
    {
        pk: 3,
        name: "Musical",
        image: "https://img.icons8.com/cute-clipart/64/null/musical.png"
    },
    {
        pk: 5,
        name: "Web 3.0 Solutions",
        image: "https://img.icons8.com/color/48/null/bitcoin--v1.png"
    },
]

const RightAside = () => {
    const { selectedContentProducts, setselectedContentProducts, setchatLog, currentProjects, dreamProjects, currentProject } = useRootContext();

    const { isAuthenticated, user } = useContext(AuthContext);

    const sender = user.role === "Client" ? "user" : "bot";

    const handleSelectContentProducts = (product) => {
        const isExist = selectedContentProducts === product.pk;
        if (!isExist) {
            setselectedContentProducts(product.pk);
            // chatlog
            setchatLog(current => [...current, { msgID: current.length + 1, [sender]: product.name }]);
        } else {
            toast('Already selected');
        }
    }

    return (
        <>
            <section className='mb-5 bg-white shadow-md rounded-lg'>
                <div className='border-b shadow-sm font-medium p-3 py-[15px]'>
                    <h3>Toolkit</h3>
                </div>

                <div className='flex justify-between mb-1 text-sm p-4 pb-0'>
                    <h3 className='font-medium'>Content Products</h3>
                    <Link to="/home">
                        <p className='text-blue-500'>Search project</p>
                    </Link>
                </div>
                <div className='contentProducts text-center py-3 px-2 select-none'>
                    <Swiper
                        spaceBetween={5}
                        slidesPerView={4}
                        modules={[Navigation]}
                        navigation
                        className='px-3'
                    >
                        {
                            category?.map((item, idx) => (
                                <SwiperSlide key={idx}>
                                    <div onClick={() => handleSelectContentProducts(item)} className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                        <div className='w-9 h-9 p-1 border rounded-md '>
                                            <img className='group-hover:scale-110 duration-150 overflow-hidden' src={item.image} />
                                        </div>
                                        <p className='text-xs'>{item.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </section>

            <section className='bg-white text-gray-700 rounded-lg shadow-md text-sm'>
                {
                    isAuthenticated && currentProjects.length > 0 &&
                    <div className='border-b pb-6 p-4'>
                        <p className='text-black mb-2 font-medium'>Current Projects</p>
                        {
                            currentProjects.map(project => <Link to={`/project/${project.pk}/${project.stage}`} key={`recent-project${project.pk}`}>
                                <p className={`flex items-center gap-1 underline hover:text-blue-700 ${project.pk === currentProject?.pk && 'text-blue-700'} cursor-pointer`}>
                                    <MdCelebration className='w-5 h-5 text-yellow-400' />
                                    {project.name.length > 30 ? project.name.slice(0, 30) + '...' : project.name}
                                </p>
                            </Link>)
                        }
                    </div>
                }
                {
                    dreamProjects.length > 0 &&
                    <div className='border-b mb-3 pb-6 p-4'>
                        <p className='text-black mb-2 font-medium'>Dream Projects</p>
                        {
                            dreamProjects.map(project => <Link to={`/project/${project.pk}/${project.stage}`} key={`recent-project${project.pk}`}>
                                <p className={`flex items-center gap-1 underline hover:text-blue-700 ${project.pk === currentProject?.pk && 'text-blue-700'} cursor-pointer`}>
                                    <MdCelebration className='w-5 h-5 text-yellow-400' />
                                    {project.name.length > 30 ? project.name?.slice(0, 30) + '...' : project.name}
                                </p>
                            </Link>)
                        }
                    </div>
                }
            </section>

            {
                isAuthenticated &&
                <div className='text-xs text-gray-600'>
                    <ul className='flex flex-wrap gap-3 justify-center mt-6'>
                        {/* <li className='border-b border-gray-100 hover:border-gray-400 flex flex-wrap gap-3'>
                            <Link className='flex items-center gap-2' to="/artist-entry">Add Artist <FaPlus /></Link>
                        </li> */}
                        <li className='border-b border-gray-100 hover:border-gray-400 flex flex-wrap gap-3'>
                            <Link className='flex items-center gap-2' to="/create-project">Create Project <FaPlus /></Link>
                        </li>
                    </ul>
                </div>
            }

            <footer className='text-xs text-gray-600'>
                <ul className='flex flex-wrap gap-3 justify-center mt-6'>
                    <li className='hover:underline'>About</li>
                    {/* <li className='hover:underline'>Accessibility</li> */}
                    {/* <li className='hover:underline'>Help Center</li> */}
                    {/* <li className='hover:underline'>Privacy & Terms</li> */}
                    {/* <li className='hover:underline'>Ad Choices</li> */}
                    <li className='hover:underline'>Advertising</li>
                    {/* <li className='hover:underline'>Business Services</li> */}
                    <li className='hover:underline'>Get the NsN Co app</li>
                    <li className='hover:underline'>More</li>
                </ul>
                <p className='text-center mt-4'>NsN Co © 2023</p>
            </footer>
        </>
    );
};

export default RightAside;