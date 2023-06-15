import LeftAside from '../Pages/Home/LeftAside';
import Navbar from './Shared/Navbar';
import RightAside from '../Pages/Home/RightAside';
import { Outlet, useLocation } from 'react-router-dom';
import { useRootContext } from '../contexts/RootProvider';
import ArtistProfile from '../Pages/Artist/ArtistProfile';
import { useEffect } from 'react';
import Backdrop from '../Components/Backdrop/Backdrop';
import { motion, AnimatePresence } from 'framer-motion';
import TopToggleBar from '../Components/Bar/TopToggleBar';
import ConfirmationModal from '../Components/Modal/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeAllDropdown } from '../features/dropdown/dropdownSlice';
import { useState } from 'react';
import FilterArtist from '../Pages/Artist/FilterArtist';

const Root = () => {
    const { artistProfile, setArtistProfile, showModal, isModalOpen } = useRootContext();
    const { user } = useSelector(state => state.auth);

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
        if (artistProfile || isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [artistProfile, isModalOpen]);

    const isShowToolkit = JSON.parse(localStorage.getItem("SHOW_TOOLKIT"));
    const [showToolkit, setShowToolkit] = useState(isShowToolkit);
    useEffect(() => {
        localStorage.setItem("SHOW_TOOLKIT", showToolkit);
    }, [showToolkit])

    const pageTransition = {
        initial: {
            x: "100vw",
        },
        animate: {
            x: 0,
            transition: {
                duration: 0.1
            }
        },
        exit: {
            x: "100vw",
        }
    };

    return (
        <div className='bg-gray-100 overflow-clip'>

            <Navbar showToolkit={showToolkit} setShowToolkit={setShowToolkit} />

            <div className='flex min-h-screen'>
                {/* bg unfocused layer */}
                <div onClick={() => dispatch(closeAllDropdown())} className={`${!searchAndFilterModal && !locationDropdown && !loginModal && !accountModal && !skillDropdown && 'hidden'} fixed left-0 top-0 h-screen w-screen`}></div>
                {/* bg unfocused layer */}

                <main className="flex-grow relative">
                    <Outlet />
                </main>

                <aside className={`hidden md:block ${showToolkit ? "w-72" : "w-0"} sticky top-[57px] whitespace-nowrap h-[91.3vh] border-l bg-white duration-200 rightSide`}>
                    <RightAside />
                </aside>

                <div className='md:hidden'>
                    <AnimatePresence initial={false} exitBeforeEnter>
                        {
                            showToolkit &&
                            <Backdrop onClick={() => setShowToolkit(false)}>
                                <motion.aside
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={pageTransition}
                                    className={`fixed top-0 right-0 w-4/6 lg:w-2/6 h-screen bg-white z-50`}
                                >
                                    <RightAside />
                                </motion.aside>
                            </Backdrop>
                        }
                    </AnimatePresence>
                </div>

                {/* necessary */}
                <AnimatePresence exitBeforeEnter={true}>
                    {
                        artistProfile &&
                        <Backdrop onClick={() => setArtistProfile(null)}>
                            <motion.div
                                onClick={(e) => e.stopPropagation()}
                                className="w-full md:w-5/6 lg:w-4/6 absolute right-0 top-0"
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