import LeftAside from '../Pages/Home/LeftAside';
import Navbar from './Shared/Navbar';
import RightAside from '../Pages/Home/RightAside';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useRootContext } from '../contexts/RootProvider';
import { BiMessageDots } from 'react-icons/bi';
import { TbTools } from 'react-icons/tb';
import { CiViewTimeline } from 'react-icons/ci';
import ArtistProfile from '../Pages/Artist/ArtistProfile';
import { useEffect } from 'react';
import Backdrop from '../Components/Backdrop/Backdrop';
import { motion, AnimatePresence } from 'framer-motion';
import TopToggleBar from '../Components/Bar/TopToggleBar';
import ConfirmationModal from '../Components/Modal/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeAllDropdown } from '../features/dropdown/dropdownSlice';

const Root = () => {
    const { artistProfile, setArtistProfile, showModal } = useRootContext();

    const location = useLocation();
    const pathname = location.pathname;

    const dispatch = useDispatch();
    const {
        skillDropdown,
        locationDropdown,
        loginModal,
        accountModal,
        searchAndFilterModal,
    } = useSelector(state => state.dropdown);


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
                <div onClick={() => dispatch(closeAllDropdown())} className={`${!searchAndFilterModal && !locationDropdown && !loginModal && !accountModal && !skillDropdown && 'hidden'} fixed left-0 top-0 h-screen w-screen`}></div>
                {/* bg unfocused layer */}

                <aside className='hidden md:block col-span-5 lg:col-span-4 sticky top-20'>
                    <LeftAside />
                </aside>



                <div className='col-span-7 lg:col-span-5 relative'>


                    {/* togglebar */}
                    <TopToggleBar className="hidden lg:block" />
                    {/* togglebar */}


                    <main>
                        <AnimatePresence initial={false} exitBeforeEnter>
                            <Outlet key={pathname} />
                        </AnimatePresence>
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

                <AnimatePresence exitBeforeEnter={true}>
                    {
                        artistProfile &&
                        <Backdrop onClick={() => setArtistProfile(null)}>
                            <motion.div
                                onClick={(e) => e.stopPropagation()}
                                className="w-full md:w-5/6 lg:w-1/2 absolute right-0 top-0 h-full"
                                initial={{ translateX: 100 }}
                                animate={{ translateX: 0 }}
                                exit={{ translateX: 100 }}
                            >
                                <ArtistProfile />
                            </motion.div>
                        </Backdrop>
                    }
                </AnimatePresence>

                <AnimatePresence exitBeforeEnter={true}>
                    {
                        showModal &&
                        <ConfirmationModal />
                    }
                </AnimatePresence>

            </div>
        </div >
    );
};

export default Root;