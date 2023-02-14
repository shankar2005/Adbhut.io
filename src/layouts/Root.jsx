import LeftAside from '../Pages/Home/LeftAside';
import { useReducer } from 'react';
import Navbar from './Shared/Navbar';
import { dropdownInitialState, dropdownReducers } from '../state/reducers/dropdownReducer';
import RightAside from '../Pages/Home/RightAside';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useRootContext } from '../contexts/RootProvider';
import { routes } from '../Routes/Routes';

const Root = () => {
    const [state, dispatch] = useReducer(dropdownReducers, dropdownInitialState);

    const pathname = useLocation().pathname;

    const { setViewAs, currentProject } = useRootContext();
    const handleViewAs = e => {
        setViewAs(e.target.value);
    }

    return (
        <div className='bg-gray-100'>


            <Navbar
                state={state}
                dispatch={dispatch}
            />


            <div className='w-11/12 mx-auto grid grid-cols-12 gap-5 items-start mt-5 pb-5'>
                {/* bg unfocused layer */}
                <div onClick={() => dispatch({ type: "BODY_TAP_ALL_MODAL_CLOSE" })} className={`${!state.searchAndFilterModal && !state.locationDropdown && !state.loginModal && !state.accountModal && !state.skillDropdown && 'hidden'} fixed left-0 top-0 h-screen w-screen`}></div>
                {/* bg unfocused layer */}

                <aside className='col-span-4 sticky top-20'>
                    <LeftAside />
                </aside>



                <div className='col-span-5'>


                    {/*  */}
                    <div className='bg-white bg-opacity-90 border border-blue-100 shadow p-2 mb-2 rounded-lg flex justify-between items-center fixed w-[37.40%] z-30'>
                        <div className='text-sm flex items-center gap-2'>
                            {
                                currentProject?.pk &&
                                <Link to={routes.project(currentProject.pk, currentProject.stage)}>
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



                    <main className='pt-14'>
                        <Outlet />
                    </main>


                </div>



                <aside className='col-span-3 sticky top-20 rightSide max-h-[88vh] overflow-y-scroll'>
                    <RightAside />
                </aside>



            </div>
        </div>
    );
};

export default Root;