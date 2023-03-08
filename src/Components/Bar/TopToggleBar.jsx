import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';

const TopToggleBar = ({ className }) => {
    const { currentProject, setViewAs, shortlistedArtist, isMobile } = useRootContext();
    const location = useLocation();
    const pathname = useLocation().pathname;
    const fromCreateProject = location.state?.from?.pathname?.includes("/create-project");

    const handleViewAs = e => {
        setViewAs(e.target.value);
    }

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 500); // Set the timeout to the duration of the animation (in milliseconds)
    }, [shortlistedArtist])

    return (
        <section className={`sticky top-20 w-full z-30 bg-white border border-blue-100 shadow p-2 py-3 mb-2 rounded-t-lg ${className}`}>
            <div className="flex justify-between items-center ">

                <div className='text-sm flex items-center gap-2'>
                    {
                        isMobile
                            ? <>
                                {
                                    shortlistedArtist.length > 0 &&
                                    <Link to="/projects/chat">
                                        <button className={`bg-gray-200 rounded-full p-2 relative ${clicked ? 'animate-vibrate' : ''}`}>
                                            <IoIosArrowBack />
                                            <span className='absolute -top-1.5 -right-1.5 rounded-full bg-red-500 h-4 w-4 text-xs text-white'>
                                                {shortlistedArtist.length}
                                            </span>
                                        </button>
                                    </Link>
                                }
                            </>
                            : <>
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
                            </>
                    }

                    {/* <Link to="/projects">
                        <button className={`border px-3 py-1 rounded-full ${pathname === "/projects" && 'bg-blue-400 text-white'}`}>View Projects</button>
                    </Link>
                    <Link to="/artists">
                        <button className={`border px-3 py-1 rounded-full ${pathname === "/artists" && 'bg-blue-400 text-white'}`}>View Artists</button>
                    </Link> */}
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
        </section>
    );
};

export default TopToggleBar;