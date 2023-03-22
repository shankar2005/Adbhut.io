import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import Cta from '../../Pages/Home/Components/Cta';
import { RiArrowRightSLine } from 'react-icons/ri';
import { BsFillChatFill } from 'react-icons/bs';

const TopToggleBar = ({ className }) => {
    const { shortlistedArtists } = useSelector(state => state.project);
    const currentProject = useSelector(state => state.project);

    const { setViewAs, isMobile, suggestions, removedSkills } = useRootContext();
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
    }, [shortlistedArtists])

    // shows only on artists route
    if (!pathname.includes("/artists")) return;

    return (
        <section className={`sticky top-20 w-full z-30 bg-white border border-blue-100 shadow mb-2 rounded-t-lg ${className}`}>
            <div className="flex justify-between items-center p-2">
                <nav className="flex px-2" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className={`mr-3 ${clicked ? 'animate-vibrate' : ''}`}>
                            <Link to="/projects/chat" className="relative text-sm hover:text-blue-600">
                                <span className='flex items-center gap-1.5'>
                                    <BsFillChatFill />
                                    Chat
                                </span>
                                <span className='absolute -top-1.5 -right-4 rounded-full bg-red-500 h-4 w-4 text-xs text-white flex justify-center items-center'>
                                    {shortlistedArtists?.length}
                                </span>
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <RiArrowRightSLine />
                                <Link to={
                                    currentProject?.pk ? `/projects/${currentProject?.pk}/${currentProject?.stage}` : "/projects/create-project"
                                } className="ml-1 text-sm hover:text-blue-600 md:ml-2">Dashboard</Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <RiArrowRightSLine />
                                <a href="#" className="ml-1 text-sm hover:text-blue-600 md:ml-2">Feed</a>
                            </div>
                        </li>
                    </ol>
                </nav>


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

            {
                (suggestions?.length > 0 || removedSkills?.length > 0) &&
                <Cta className="border-t" />
            }

        </section>
    );
};

export default TopToggleBar;