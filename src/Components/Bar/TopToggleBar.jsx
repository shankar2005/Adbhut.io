import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import Cta from '../../Pages/Home/Components/Cta';
import { RiArrowRightSLine } from 'react-icons/ri';
import { BsFillChatFill, BsThreeDots, BsTrash } from 'react-icons/bs';
import { ImUsers } from 'react-icons/im';
import { FcDocument } from 'react-icons/fc';
import { useDeleteProjectMutation } from '../../features/project/projectApi';
import { toast } from 'react-hot-toast';
import { clearProject } from '../../features/project/projectSlice';

const TopToggleBar = ({ className }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shortlistedArtists } = useSelector(state => state.project);
    const currentProject = useSelector(state => state.project);
    const { user } = useSelector(state => state.auth);
    const [deleteProject] = useDeleteProjectMutation();

    const { setViewAs, suggestions, removedSkills, setSuggestions, setRemovedSkill } = useRootContext();
    const pathname = useLocation().pathname;

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

    const [actionToggle, setactionToggle] = useState(false);

    const handleDeleteProject = () => {
        deleteProject(currentProject.pk)
            .then(data => {
                toast.success(data.data.message);
                setactionToggle(false);
                dispatch(clearProject());
                setSuggestions([]);
                setRemovedSkill([]);
                navigate("/projects/create-project");
            });
    }

    // shows only on artists route
    if ((!pathname.includes("/artists") && !pathname.includes("/projects")) || pathname.includes("/projects/inbox")) return;

    return (
        <section className={`sticky top-20 w-full z-30 bg-white  shadow mb-2 rounded-t-lg ${className}`}>
            <div className="flex justify-between items-center p-2">
                <nav className="flex items-center gap-2" aria-label="Breadcrumb">
                    <FcDocument size={40} />
                    <div className='space-y-1'>
                        <h4 className='font-sans font-medium'>{
                            currentProject?.pk
                                ? currentProject.title?.length > 30 ? currentProject.title?.slice(0, 30) + '...' : currentProject.title
                                : "New Project"
                        }</h4>
                        <ol className="inline-flex items-center gap-2">
                            <li className={`md:hidden flex items-center gap-4 ${clicked && 'animate-vibrate'}`}>
                                <Link to="/projects/chat" className="relative text-sm hover:text-blue-600">
                                    <span className='flex items-center gap-1.5'>
                                        <BsFillChatFill />
                                        Chat
                                    </span>
                                    <span className='absolute -top-1.5 -right-4 rounded-full bg-red-500 h-4 w-4 text-xs text-white flex justify-center items-center'>
                                        {shortlistedArtists?.length}
                                    </span>
                                </Link>
                                <RiArrowRightSLine />
                            </li>
                            <li className={`hidden md:flex items-center gap-4 ${clicked && 'animate-vibrate'}`}>
                                <Link to="/projects/shortlisted-artists" className="relative text-sm hover:text-blue-600">
                                    <span className='flex items-center gap-1.5'>
                                        <ImUsers />
                                        Shortlisted Artists
                                    </span>
                                    <span className='absolute -top-1.5 -right-4 rounded-full bg-red-500 h-4 w-4 text-xs text-white flex justify-center items-center'>
                                        {shortlistedArtists?.length}
                                    </span>
                                </Link>
                                <RiArrowRightSLine />
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <Link to={
                                        currentProject?.pk ? `/projects/${currentProject?.pk}/${currentProject?.stage}` : "/projects/create-project"
                                    } className="text-sm hover:text-blue-600">Dashboard</Link>
                                </div>
                            </li>
                            <li>
                                <div className="md:hidden flex items-center">
                                    <RiArrowRightSLine />
                                    <Link to="/projects/shortlisted-artists" className="ml-1 text-sm hover:text-blue-600 md:ml-2">Shortlisted Artist</Link>
                                </div>
                            </li>
                        </ol>
                    </div>
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

                {
                    currentProject?.pk &&
                    <BsThreeDots onClick={() => setactionToggle(!actionToggle)} className='pr-2 cursor-pointer' size={25} />
                }
                {
                    actionToggle && user.email &&
                    <div className='absolute right-0 -bottom-5 border bg-white shadow-lg select-none'>
                        <button onClick={handleDeleteProject} className='flex items-center gap-2 text-sm py-3 px-5'>Delete <BsTrash size={20} /></button>
                    </div>
                }
            </div>

            {
                (suggestions?.length > 0 || removedSkills?.length > 0) && pathname.includes("/artists") &&
                <Cta className="border-t" />
            }

        </section>
    );
};

export default TopToggleBar;