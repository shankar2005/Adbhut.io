import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useRootContext } from '../../contexts/RootProvider';
import nsnlogo from '../../assets/logos/adbeta.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AuthModal from '../../Pages/Auth/Components/AuthModal';
import ProfileDropdown from '../../Pages/User/Components/ProfileDropdown';
import adbhutGIF from '../../assets/logos/adbhutGIF.gif';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../features/filter/filterSlice';
import { showAccount, showLogin } from '../../features/dropdown/dropdownSlice';

const Navbar = ({ setShowToolkit, showToolkit }) => {
    const { avatar, setPage, setArtists } = useRootContext();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { loginModal, accountModal } = useSelector(state => state.dropdown);

    const navigate = useNavigate();
    // handle search
    const handleSearch = (e) => {
        e.preventDefault();
        // clear
        setPage(1);
        setArtists([]);
        // clear
        if (user?.role === "AM") {
            navigate("/artists/artist-list");
        } else {
            navigate("/artists");
        }
        dispatch(setSearch(e.target.search.value));
        e.target.reset();
    }

    const [profileImageSrc, setProfileImageSrc] = useState(user.image);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageError = () => {
        setIsImageLoaded(true);
        setProfileImageSrc(avatar);
    };

    return (
        <nav className='bg-white border-b sticky top-0 z-50 py-2 h-[57px]'>
            <div className='px-3 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Link to="/" className=''>
                        <img src={adbhutGIF} className='w-28 md:w-32' />
                    </Link>
                    <form onSubmit={handleSearch} className="hidden md:flex relative">
                        <input type="search" name="search" className='border border-gray-300 py-2 w-72 pl-10 pr-3 outline-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm rounded' placeholder='Search your artist here...' required />
                        <AiOutlineSearch className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                        <button className="focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded text-sm px-4 py-2 text-center inline-flex items-center border border-gray-500 text-gray-600 hover:bg-gray-200 ml-2" type="submit">Search</button>
                    </form>
                </div>
                <ul className='flex items-center gap-4 text-gray-500 flex-1 justify-end'>
                    {
                        user.email &&
                        <li className='flex items-center gap-2 relative'>
                            <img
                                onClick={() => dispatch(showAccount())}
                                className='w-10 h-10 rounded-full border object-cover cursor-pointer'
                                src={(user?.role === "AM" || user?.role === "PM") ? nsnlogo : (profileImageSrc || avatar)}
                                alt="Profile Picture"
                                onError={handleImageError}
                                onLoad={() => setIsImageLoaded(true)}
                                style={{ display: isImageLoaded ? 'block' : 'none' }}
                            />
                            {/* modal */}
                            {
                                accountModal &&
                                <div className="absolute top-12 right-0">
                                    <ProfileDropdown />
                                </div>
                            }
                        </li>
                    }
                    {
                        !user.email &&
                        <li>
                            <button onClick={() => dispatch(showLogin())} className="focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded text-sm px-4 py-2 text-center inline-flex items-center border border-gray-500 text-gray-600 hover:bg-gray-200" type="button">Login</button>
                            {/* auth modal */}
                            <AnimatePresence initial={false} exitBeforeEnter={true}>
                                {loginModal && <AuthModal />}
                            </AnimatePresence>
                        </li>
                    }
                    <div className="md:hidden p-1 bg-gray-50 shadow-sm rounded-l-full text-gray-400" onClick={() => setShowToolkit(prev => !prev)}>
                        <MdArrowBackIosNew className={`cursor-pointer ${showToolkit && "rotate-180"} duration-200`} size={25} />
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;