import LeftAside from '../Pages/Home/LeftAside';
import Navbar from './Shared/Navbar';
import RightAside from '../Pages/Home/RightAside';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useRootContext } from '../contexts/RootProvider';
import { BiMessageDots } from 'react-icons/bi';
import { TbTools } from 'react-icons/tb';
import { CiViewTimeline } from 'react-icons/ci';
import ArtistProfile from '../Pages/Artist/ArtistProfile';
import { useEffect } from 'react';

const Root = () => {
    const { dropdownState, dropdownDispatch } = useRootContext();

    const location = useLocation();
    const pathname = location.pathname;
    const fromCreateProject = location.state?.from?.pathname?.includes("/create-project");

    const { setViewAs, currentProject, artistProfile, setArtistProfile } = useRootContext();
    const handleViewAs = e => {
        setViewAs(e.target.value);
    }

    useEffect(() => {
        if (artistProfile) {
            // Add the class to the body element when the modal is open
            document.body.classList.add("overflow-hidden");
        } else {
            // Remove the class when the modal is closed
            document.body.classList.remove("overflow-hidden");
        }
    }, [artistProfile]);

    return (
        <div className='bg-gray-100 min-h-screen'>

            <Navbar />

            <div className='w-11/12 max-w-screen-xl mx-auto md:grid grid-cols-12 gap-5 items-start mt-5 pb-5'>
                {/* bg unfocused layer */}
                <div onClick={() => dropdownDispatch({ type: "BODY_TAP_ALL_MODAL_CLOSE" })} className={`${!dropdownState.searchAndFilterModal && !dropdownState.locationDropdown && !dropdownState.loginModal && !dropdownState.accountModal && !dropdownState.skillDropdown && 'hidden'} fixed left-0 top-0 h-screen w-screen`}></div>
                {/* bg unfocused layer */}

                <aside className='hidden md:block col-span-5 lg:col-span-4 sticky top-20'>
                    <LeftAside />
                </aside>



                <div className='col-span-7 lg:col-span-5 relative'>


                    {/*  */}
                    <div className='hidden lg:flex bg-white border border-blue-100 shadow p-2 py-3 mb-2 rounded-t-lg justify-between items-center sticky top-20 w-full z-30'>
                        <div className='text-sm flex items-center gap-2'>
                            {
                                currentProject?.pk && pathname.includes("/artists") &&
                                <Link to={`/projects/${currentProject.pk}/${currentProject.stage}`}>
                                    <button className='bg-gray-200 rounded-full p-2'><IoIosArrowBack /></button>
                                </Link>
                            }
                            {
                                fromCreateProject && pathname.includes("/artists") &&
                                <Link to="/projects/create-project">
                                    <button className='bg-gray-200 rounded-full p-2'><IoIosArrowBack /></button>
                                </Link>
                            }
                            <Link to="/projects">
                                <button className={`border px-3 py-1 rounded-full ${pathname === "/projects" && 'bg-blue-400 text-white'}`}>View Projects</button>
                            </Link>
                            <Link to="/artists">
                                <button className={`border px-3 py-1 rounded-full ${pathname === "/artists" && 'bg-blue-400 text-white'}`}>View Artists</button>
                            </Link>
                        </div>
                        {
                            pathname.includes("project") ||
                            <div>
                                <select onChange={handleViewAs} className='text-sm p-1 rounded border outline-gray-100'>
                                    <option value="large">Large</option>
                                    <option value="details">Details</option>
                                    <option value="small">Small</option>
                                </select>
                            </div>
                        }
                    </div>
                    {/*  */}



                    <main>
                        <Outlet />
                    </main>


                </div>



                <aside className='hidden lg:block col-span-3 sticky top-20 rightSide max-h-[88vh] overflow-y-scroll'>
                    <RightAside />
                </aside>

                {/* mobile toggle */}
                <div className='lg:hidden z-50 fixed left-0 top-1/2 -translate-y-20 bg-white'>
                    <Link to="/projects/chat">
                        <div className='p-3 border border-b-0 md:hidden'><BiMessageDots /></div>
                    </Link>
                    <Link to="/artists">
                        <div className='p-3 border border-b-0'><CiViewTimeline /></div>
                    </Link>
                    <Link to="/projects/toolkit">
                        <div className='p-3 border'><TbTools /></div>
                    </Link>
                </div>
                {/* mobile toggle */}

                {
                    <div className={`${artistProfile ? 'bg-opacity-60' : 'bg-opacity-0 -z-50'} fixed right-0 top-0 bg-black h-screen z-50 w-full overflow-hidden`}>
                        <div onClick={() => setArtistProfile(null)} className="w-1/2 absolute left-0 top-0  h-full"></div>
                        <div className={`w-full md:w-5/6 lg:w-1/2 absolute ${artistProfile ? 'right-0' : '-right-full'} top-0 h-full duration-200`}>
                            <ArtistProfile />
                        </div>
                    </div>
                }

            </div>
        </div >
    );
};

export default Root;