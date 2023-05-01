import { useRootContext } from '../../contexts/RootProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { clearProject, setArtist, setChatLog, setContentProduct } from '../../features/project/projectSlice';
import { FaPlus } from 'react-icons/fa';

const RightAside = () => {
    const { contentProducts, handleSelectContentProduct, currentProjects, setSuggestions, setViewAs } = useRootContext();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const currentProject = useSelector(state => state.project);
    const { selectedContentProduct } = useSelector(state => state.project);

    const navigate = useNavigate();
    const navigateCreateProject = () => {
        dispatch(clearProject());
        dispatch(setChatLog([]));
        dispatch(setArtist([]));
        dispatch(setContentProduct(""));
        setSuggestions([]);
        navigate("/projects/create-project");
    }

    if (user?.role === "AM") {
        return (
            <>
                <div className='bg-white rounded-lg'>
                    <section className='border-b'>
                        <div className='border-b shadow-sm font-medium p-3.5'>
                            <h3>Toolkit</h3>
                        </div>


                    </section>

                    <section className='text-gray-700 p-4 border-b'>
                        <ul className="space-y-3 font-medium text-sm">
                            <li>
                                <Link to="/projects/project-requirement" className="inline-flex gap-2 hover:text-blue-600">
                                    Project Requirement
                                    <div className='bg-red-500 h-fit py-0.5 px-2 text-white text-xs font-medium rounded'>
                                        2
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/artists/artist-entry" className="hover:text-blue-600">
                                    Add Artist
                                </Link>
                            </li>
                            <li>
                                <Link to="/artists" onClick={() => setViewAs("details")} className="hover:text-blue-600">
                                    View Artists
                                </Link>
                            </li>
                        </ul>
                    </section>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='bg-white rounded-lg'>
                <section className='border-b'>
                    <div className='border-b shadow-sm font-medium p-3.5'>
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
                                        <div onClick={() => {
                                            handleSelectContentProduct(content);
                                            navigate("/artists");
                                        }} className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
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

                <section className='text-gray-700 text-sm p-4 border-b'>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/projects/myprojects" className='hover:underline flex justify-between'>
                                {
                                    user?.role === "PM"
                                        ? <div>
                                            <p className='font-medium'>All Projects</p>
                                            <p className='text-xs'>All on-going projects</p>
                                        </div>
                                        : <div>
                                            <p className='font-medium'>My Projects</p>
                                            <p className='text-xs'>Your current on-going projects</p>
                                        </div>
                                }
                                <div className='bg-red-500 h-fit py-0.5 px-1 text-white font-bold'>
                                    {currentProjects?.length}
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className='hover:underline'>
                                <p className='font-medium'>Dream Projects</p>
                                <p className='text-xs'>Insights projects</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className='hover:underline flex justify-between items-center'>
                                <div>
                                    <p className='font-medium'>Recommended Projects</p>
                                    <p className='text-xs'>Projects you might like</p>
                                </div>
                                <div className='bg-blue-500 h-fit py-0.5 px-2 text-white text-xs font-medium rounded'>
                                    New
                                </div>
                            </Link>
                        </li>
                    </ul>
                </section>

                {
                    false &&
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
                }
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