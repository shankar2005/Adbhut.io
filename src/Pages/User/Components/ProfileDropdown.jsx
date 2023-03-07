import { useContext } from 'react';
import { ImOffice } from 'react-icons/im';
import { TfiWorld } from 'react-icons/tfi';
import { FiLogOut } from 'react-icons/fi';
import Cookies from 'universal-cookie';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useRootContext } from '../../../contexts/RootProvider';
import Button from '../../../Components/Button/Button';
import logo from "../../../assets/logos/adbeta.jpeg"

const ProfileDropdown = () => {
    const { user } = useContext(AuthContext);
    const { setIsAuthenticated } = useRootContext();

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove("auth_token", { path: '/' });
        setIsAuthenticated(false);
    }

    return (
        <div className="bg-white w-60 border rounded-md p-3 shadow-2xl">
            <div className='relative'>
                <img className='rounded-t-lg border-b border-orange-400' src="https://cdn.shopify.com/s/files/1/0581/8230/3937/files/Naagin-Logo.png?height=628&pad_color=fff&v=1630922387&width=1200" alt="" />
                <div className='rounded-full bg-white absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2 border-4 border-white'>
                    <img className='w-16 h-16 rounded-full' src={user?.role === "Client" ? "https://www.w3schools.com/howto/img_avatar.png" : logo} alt="" />
                </div>
            </div>
            <div className='mt-12 pt-0 p-4 text-center'>
                <h4 className='font-medium text-lg'>{user.name || user.username}</h4>
                <div className='text-sm text-gray-600'>
                    @Founder  <br />
                    <p className='flex items-center justify-center gap-1 mt-1'><ImOffice /> Company Name</p>
                    <p className='flex items-center justify-center gap-1 mt-1'><TfiWorld /> https://www.companyurl.com/</p>
                </div>
            </div>
            <Button onClick={handleLogout}>Logout <FiLogOut className='w-5 h-5' /></Button>
        </div>
    );
};

export default ProfileDropdown;