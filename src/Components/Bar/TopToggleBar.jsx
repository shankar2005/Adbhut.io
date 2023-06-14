import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import Cta from '../../Pages/Home/Components/Cta';

const TopToggleBar = ({ className }) => {
    const currentProject = useSelector(state => state.project);
    const { user } = useSelector(state => state.auth);

    const { setViewAs, suggestions, removedSkills } = useRootContext();
    const pathname = useLocation().pathname;

    const handleViewAs = e => {
        setViewAs(e.target.value);
    }

    // shows only on artists route
    if ((!pathname.includes("/artists") && !pathname.includes("/projects")) || pathname.includes("/projects/inbox")) return;

    if (user?.role === "AM") {
        return (
            <section className={`w-full bg-white shadow ${className || ""}`}>
                <div className="flex justify-between items-center p-4">
                    <h4 className='font-sans font-medium text-lg'>Artist Manager Panel</h4>
                </div>
            </section>
        )
    }

    return (
        <section className={`w-full bg-white border-b border-gray-200 shadow-sm ${className || ""}`}>
            <div className="flex justify-between items-center">
                <nav className="flex items-center gap-2" aria-label="Breadcrumb">
                    <div className='space-y-1'>
                        <h4 className='font-sans font-medium p-2 px-3'>{
                            currentProject?.pk
                                ? currentProject.title?.length > 30 ? currentProject.title?.slice(0, 30) + '...' : currentProject.title
                                : "Create a Project"
                        }</h4>
                        <ol className="flex items-center">
                            <li className="md:hidden flex items-center gap-2 bg-gray-100 p-2 border-t-2 border-t-blue-600 border-x">
                                <Link to="/projects/chat" className="relative text-sm hover:text-blue-600">
                                    Chat
                                </Link>
                            </li>
                            <li className="bg-gray-100 p-2 border-t-2 border-t-blue-600 border-x">
                                <div className="flex items-center">
                                    <Link to={
                                        currentProject?.pk ? `/projects/${currentProject?.pk}` : "/projects/create-project"
                                    } className="text-sm hover:text-blue-600">Dashboard</Link>
                                </div>
                            </li>
                        </ol>
                    </div>
                </nav>


                <div className='flex items-center gap-3'>
                    {
                        pathname === "/artists/" &&
                        <div>
                            <select onChange={handleViewAs} className='text-sm p-1 rounded border outline-gray-100'>
                                <option value="large">Large</option>
                                <option value="details">Details</option>
                                <option value="small">Small</option>
                            </select>
                        </div>
                    }
                </div>
            </div>

        </section>
    );
};

export default TopToggleBar;