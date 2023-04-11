import { ImOffice } from 'react-icons/im';
import { FiLogOut } from 'react-icons/fi';
import Cookies from 'universal-cookie';
import Button from '../../../Components/Button/Button';
import logo from "../../../assets/logos/adbeta.jpeg"
import profileCover from "../../../assets/placeholders/profile_cover.png"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearProject } from '../../../features/project/projectSlice';
import { useRootContext } from '../../../contexts/RootProvider';
import { FaEnvelope } from 'react-icons/fa';

const ProfileDropdown = () => {
    const { avatar } = useRootContext();
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
        dispatch(clearProject());
        // removing authtoke from cookies
        const cookies = new Cookies();
        cookies.remove("auth_token", { path: '/' });
    }

    return (
        <div className="bg-white w-60 border rounded-md shadow-2xl">
            <div className='relative'>
                <img className='rounded-t-lg border-b h-32 w-full' src={profileCover} alt="" />
                <div className='rounded-full bg-white absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2 border-4 border-white'>
                    <img className='w-16 h-16 rounded-full' src={user?.role === "Client" ? (user?.image || avatar) : logo} alt="" />
                </div>
            </div>
            <div className='mt-10 pt-0 p-4 text-center'>
                <h4 className='font-medium text-lg'>{user.name || "N/A"}</h4>
                <div className='text-sm text-gray-600'>
                    @{user.role}  <br />
                    <p className='flex items-center justify-center gap-1'><FaEnvelope /> {user.email}</p>
                    <p className='flex items-center justify-center gap-1 mt-1'><ImOffice /> {user.company && user.company[0] || "N/A"}</p>
                </div>
                <Button variant="primary" onClick={handleLogout} className="flex gap-2 mx-auto mt-4">Logout <FiLogOut className='w-5 h-5' /></Button>
            </div>
        </div>
    );
};

export default ProfileDropdown;