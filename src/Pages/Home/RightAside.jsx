import { MdCelebration } from 'react-icons/md';
import { useRootContext } from '../../contexts/RootProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useGetDreamProjectsQuery } from '../../features/project/projectApi';
import { setArtist, setChatLog, setContentProduct } from '../../features/project/projectSlice';

const RightAside = () => {
    const { currentProjects, currentProject, contentProducts, setcurrentProject, handleSelectContentProduct } = useRootContext();

    const dispatch = useDispatch();
    const { data: dreamProjects = [] } = useGetDreamProjectsQuery();
    const { user } = useSelector(state => state.auth);
    const { selectedContentProduct } = useSelector(state => state.project);

    const navigate = useNavigate();
    const navigateCreateProject = () => {
        setcurrentProject(null);
        dispatch(setChatLog([]));
        dispatch(setArtist([]));
        dispatch(setContentProduct(""));
        navigate("/projects/create-project");
    }

    return (
        <>
            <div className='bg-white rounded-lg'>
                <section className='border-b'>
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
                                            <div className={`${currentProject?.project_template === content.pk || selectedContentProduct === content.pk ? 'w-10 h-10' : 'w-9 h-9'} p-1 border rounded-md`}>
                                                <img className='group-hover:scale-110 duration-150 overflow-hidden' src={content.weblink} />
                                            </div>
                                            <p className={`${currentProject?.project_template === content.pk || selectedContentProduct === content.pk && 'text-blue-600 font-medium'} text-[0.6rem] leading-tight`}>{content.name}</p>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </section>

                <section className='text-gray-700 text-sm'>
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

                <section className='text-gray-700 text-sm border-b'>
                    <div className='p-4'>
                        <p className='text-black mb-2 font-medium'>Total Cost</p>
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-200">
                                <tr className="text-left">
                                    <th className="p-2.5">Estimate Fee #</th>
                                    <th className="p-2.5 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-opacity-20 border-gray-700">
                                    <td className="p-2">
                                        <p>Solution Fee</p>
                                    </td>
                                    <td className="p-2 text-right">
                                        <p>₹ {currentProject?.solution_fee || 0}</p>
                                    </td>
                                </tr>
                                <tr className="border-b border-opacity-20 border-gray-700">
                                    <td className="p-2">
                                        <p>Production Advance</p>
                                    </td>
                                    <td className="p-2 text-right">
                                        <p>₹ {currentProject?.production_advance || 0}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <PayPalScriptProvider options={{ "client-id": "test" }}>
                            <PayPalButtons style={{ layout: "horizontal" }} />
                        </PayPalScriptProvider>

                        {/* <Button className="bg-yellow-400 focus:ring-yellow-200 sm:w-full flex justify-center mt-5">
                            <img className='w-20' src={paypal} alt="" />
                        </Button> */}
                    </div>
                </section>
            </div>

            {/* <footer className='text-xs text-gray-600'>
                <ul className='flex flex-wrap gap-3 justify-center mt-6'>
                    <li className='hover:underline'>About</li>
                    <li className='hover:underline'>Advertising</li>
                    <li className='hover:underline'>Get the Adbhut.io app</li>
                    <li className='hover:underline'>More</li>
                </ul>
                <p className='text-center mt-4'>Adbhut.io © 2023</p>
            </footer> */}
        </>
    );
};

export default RightAside;