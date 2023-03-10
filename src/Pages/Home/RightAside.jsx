import { MdCelebration } from 'react-icons/md';
import { useRootContext } from '../../contexts/RootProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import paypal from "../../assets/placeholders/paypal.png"
import Button from '../../Components/Button/Button';

const RightAside = () => {
    const { selectedContentProducts, setselectedContentProducts, setchatLog, currentProjects, dreamProjects, currentProject, contentProducts, setcurrentProject, setshortlistedArtist, handleSelectContentProduct } = useRootContext();

    const { user } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const navigateCreateProject = () => {
        setcurrentProject(null);
        setchatLog([]);
        setshortlistedArtist([]);
        setselectedContentProducts("");
        navigate("/projects/create-project");
    }

    return (
        <>
            <section className='mb-5 bg-white shadow-md rounded-lg'>
                <div className='border-b shadow-sm font-medium p-3 py-[15px]'>
                    <h3>Toolkit</h3>
                </div>

                <div className='flex justify-between mb-1 text-sm p-4 pb-0'>
                    <h3 className='font-medium'>Content Products</h3>
                    <Link to="/">
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
                        <SwiperSlide>
                            <div onClick={navigateCreateProject} className='group flex flex-col gap-2 items-center cursor-pointer'>
                                <div className='border rounded-md  flex items-center justify-center p-0.5'>
                                    <AiOutlinePlus className='group-hover:scale-110 duration-150 overflow-hidden text-gray-600' size={30} />
                                </div>
                                <p className='text-[0.6rem] leading-tight'>New Project</p>
                            </div>
                        </SwiperSlide>
                        {
                            contentProducts?.map(content => (
                                <SwiperSlide key={content.pk}>
                                    <div onClick={() => handleSelectContentProduct(content)} className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                        <div className={`${currentProject?.project_template === content.pk || selectedContentProducts === content.pk ? 'w-10 h-10' : 'w-9 h-9'} p-1 border rounded-md`}>
                                            <img className='group-hover:scale-110 duration-150 overflow-hidden' src={content.weblink} />
                                        </div>
                                        <p className={`${currentProject?.project_template === content.pk || selectedContentProducts === content.pk && 'text-blue-600 font-medium'} text-[0.6rem] leading-tight`}>{content.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </section>

            <section className='bg-white text-gray-700 rounded-lg shadow-md text-sm'>
                {
                    user.email && currentProjects.length > 0 &&
                    <div className='border-b pb-6 p-4'>
                        <p className='text-black mb-2 font-medium'>Current Projects</p>
                        {
                            currentProjects.map(project => <Link to={`/projects/${project.pk}/${project.stage}/`} key={`recent-project${project.pk}`}>
                                <p className={`flex items-center gap-1 underline hover:text-blue-700 ${project.pk === currentProject?.pk && 'text-blue-700'} cursor-pointer`}>
                                    <MdCelebration className='w-5 h-5 text-yellow-400' />
                                    {project.name?.length > 30 ? project.name.slice(0, 30) + '...' : project.name}
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
                            dreamProjects.map(project => <Link to={`/projects/${project.pk}/${project.stage}`} key={`recent-project${project.pk}`}>
                                <p className={`flex items-center gap-1 underline hover:text-blue-700 ${project.pk === currentProject?.pk && 'text-blue-700'} cursor-pointer`}>
                                    <MdCelebration className='w-5 h-5 text-yellow-400' />
                                    {project.name?.length > 30 ? project.name?.slice(0, 30) + '...' : project.name}
                                </p>
                            </Link>)
                        }
                    </div>
                }
            </section>

            <section className='bg-white text-gray-700 rounded-lg shadow-md text-sm mt-5'>
                <div className='border-b mb-3 pb-6 p-4'>
                    <p className='text-black mb-2 font-medium'>Total Cost</p>
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-200">
                            <tr className="text-left">
                                <th className="p-3">Estimate Fee #</th>
                                <th className="p-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-opacity-20 border-gray-700">
                                <td className="p-3">
                                    <p>Solution Fee</p>
                                </td>
                                <td className="p-3 text-right">
                                    <p>₹ {currentProject?.solution_fee}</p>
                                </td>
                            </tr>
                            <tr className="border-b border-opacity-20 border-gray-700">
                                <td className="p-3">
                                    <p>Production Advance</p>
                                </td>
                                <td className="p-3 text-right">
                                    <p>₹ {currentProject?.production_advance}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Button className="bg-yellow-400 focus:ring-yellow-200 sm:w-full flex justify-center mt-5">
                        <img className='w-20' src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png" alt="" />
                    </Button>
                </div>
            </section>

            {
                <div className='text-xs text-gray-600'>
                    <ul className='flex flex-wrap gap-3 justify-center mt-6'>
                        <li className='border-b border-gray-100 hover:border-gray-400 flex flex-wrap gap-3'>
                            <Link className='flex items-center gap-2' to="/artists/artist-entry">Add Artist <FaPlus /></Link>
                        </li>
                    </ul>
                </div>
            }

            <footer className='text-xs text-gray-600'>
                <ul className='flex flex-wrap gap-3 justify-center mt-6'>
                    <li className='hover:underline'>About</li>
                    <li className='hover:underline'>Advertising</li>
                    <li className='hover:underline'>Get the Adbhut.io app</li>
                    <li className='hover:underline'>More</li>
                </ul>
                <p className='text-center mt-4'>Adbhut.io © 2023</p>
            </footer>
        </>
    );
};

export default RightAside;