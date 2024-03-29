import { useRootContext } from '../../contexts/RootProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlinePlus, AiOutlineProject, AiOutlineUserAdd, AiTwotoneSetting } from 'react-icons/ai';
import { BsCheck2Square } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { MdEmojiFlags, MdOutlineRssFeed, MdPlaylistAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clearProject, setArtist, setContentProduct } from '../../features/project/projectSlice';
import { FaUserCircle } from 'react-icons/fa';

const RightAside = () => {
    const { contentProducts, handleSelectContentProduct, currentProjects, setSuggestions, setViewAs, setArtistProfile } = useRootContext();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const currentProject = useSelector(state => state.project);
    const { selectedContentProduct } = useSelector(state => state.project);

    const navigate = useNavigate();
    const navigateCreateProject = () => {
        dispatch(clearProject());
        dispatch(setArtist([]));
        dispatch(setContentProduct(""));
        setSuggestions([]);
        navigate("/projects/create-project");
    }

    if (user?.role === "AM") {
        return (
            <section className='w-full md:w-72 bg-white rounded-b-lg'>
                <div className='text-gray-700 p-2 border-b'>
                    <ul className="font-medium text-sm">
                        <li>
                            <Link to="/projects/artist-requirement" className="hover:text-blue-600 flex items-center gap-2 font-hero font-semibold hover:bg-gray-100 p-2 rounded">
                                <AiOutlineDashboard size={20} /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/artists/artist-entry" className="hover:text-blue-600 flex items-center gap-2 font-hero font-semibold hover:bg-gray-100 p-2 rounded">
                                <AiOutlineUserAdd size={20} /> Add New Artist
                            </Link>
                        </li>
                        <li>
                            <Link to="/artists/artist-list" className="hover:text-blue-600 flex items-center gap-2 font-hero font-semibold hover:bg-gray-100 p-2 rounded">
                                <FiUsers size={20} /> View Artists
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className="hover:text-blue-600 flex items-center gap-2 font-hero font-semibold hover:bg-gray-100 p-2 rounded">
                                <AiOutlineProject size={20} /> All Projects
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }

    if (user?.role === "Artist") {
        return (
            <section className='w-full md:w-72 bg-white rounded-b-lg'>
                <div className='text-gray-700 p-2 border-b'>
                    <ul className="font-medium text-sm">
                        <li>
                            <Link to="/artists/demos" className="hover:text-blue-600 flex items-center gap-2 font-hero font-semibold hover:bg-gray-100 p-2 rounded">
                                <MdPlaylistAdd size={20} /> Add New Demo
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => setArtistProfile(user?.id)} className="hover:text-blue-600 flex items-center gap-2 font-hero font-semibold hover:bg-gray-100 p-2 rounded w-full">
                                <FaUserCircle size={20} /> View Profile
                            </button>
                        </li>
                        <li>
                            <Link to="/artists/account" className="hover:text-blue-600 flex items-center gap-2 font-hero font-semibold hover:bg-gray-100 p-2 rounded">
                                <AiTwotoneSetting size={20} /> Account Settings
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className="hover:text-blue-600 flex items-center gap-2 font-hero font-semibold hover:bg-gray-100 p-2 rounded">
                                <MdEmojiFlags size={20} /> Demo Requirements
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section className='w-full md:w-72 bg-white rounded-b-lg'>
            <div className='border-b'>
                <h3 className='font-medium p-3 pb-0'>Content Products</h3>
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
                        <SwiperSlide>
                            <Link to="/projects/readydemos">
                                <div className='group flex flex-col gap-2 items-center cursor-pointer'>
                                    <div className='flex items-center justify-center'>
                                        <BsCheck2Square className="group-hover:scale-110 duration-150 overflow-hidden text-green-500" size={38} />
                                    </div>
                                    <p className='text-[0.6rem] leading-tight'>Ready To Use</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                        {
                            contentProducts?.map(content => (
                                <SwiperSlide key={content.pk}>
                                    <div onClick={() => {
                                        handleSelectContentProduct(content);
                                        navigate("/projects/create-project")
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
            </div>

            <div className='text-gray-700 text-sm p-4 border-b'>
                <ul className="space-y-2">
                    {
                        user?.email &&
                        <li>
                            <Link to="/projects" className='hover:underline flex justify-between'>
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
                    }
                    <li>
                        <Link to="/projects/dreamprojects" className='hover:underline flex justify-between items-center'>
                            <div>
                                <p className='font-medium'>Dream Projects</p>
                                <p className='text-xs'>Insights projects</p>
                            </div>
                            <div className='bg-blue-500 h-fit py-0.5 px-2 text-white text-xs font-medium rounded'>
                                New
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>

            {
                false &&
                <div className='text-gray-700 text-sm border-b'>
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
                    </div>
                </div>
            }
        </section>
    );
};

export default RightAside;