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

const Root = () => {
    const { artistProfile, setArtistProfile, showModal, isModalOpen } = useRootContext();

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
            // Add the class to the body element when the modal is open
            document.body.classList.add("overflow-hidden");
        } else {
            // Remove the class when the modal is closed
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
        <div className='bg-gray-100 min-h-screen'>

            <Navbar setShowToolkit={setShowToolkit} />

            <div className='w-11/12 max-w-screen-xl mx-auto md:grid grid-cols-12 gap-5 items-start mt-5 pb-5'>
                {/* bg unfocused layer */}
                <div onClick={() => dispatch(closeAllDropdown())} className={`${!searchAndFilterModal && !locationDropdown && !loginModal && !accountModal && !skillDropdown && 'hidden'} fixed left-0 top-0 h-screen w-screen`}></div>
                {/* bg unfocused layer */}

                <aside className={`hidden md:block col-span-5 ${showToolkit ? "lg:col-span-4" : "lg:col-span-5"} sticky top-20`}>
                    <LeftAside setShowToolkit={setShowToolkit} />
                </aside>



                <div className={`col-span-7 ${showToolkit ? "lg:col-span-5" : "lg:col-span-7"} relative`}>


                    {/* togglebar */}
                    <TopToggleBar />
                    {/* togglebar */}


                    <main>
                        <AnimatePresence initial={false} exitBeforeEnter>
                            <Outlet key={pathname} />
                        </AnimatePresence>
                    </main>


                </div>


                <aside className={`${showToolkit || "hidden"} col-span-3 sticky top-20 rightSide max-h-[88vh] overflow-y-scroll pb-5`}>
                    <div className='hidden md:block'>
                        <RightAside />
                    </div>
                </aside>

                <div className='lg:hidden'>
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