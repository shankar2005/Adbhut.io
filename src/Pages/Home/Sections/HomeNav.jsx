import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import Brands from "../../../Components/Sections/Brands";

const HomeNav = () => {
    return (
        <nav className='p-3 md:px-5 shadow-sm relative'>
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-2">
                    <img src={adbhutGIF} className='w-28 md:w-32 mr-8' />

                    <p onMouseEnter={() => setIsHovered(true)} className='flex items-center gap-2 font-medium font-hero cursor-pointer'>
                        <img className='hidden md:block w-24 cursor-pointer' src={carbonNeutral} alt="" />
                        <SlArrowDown className={`${isHovered && "rotate-180"} duration-200`} size={10} />
                    </p>
                    {
                        isHovered &&
                        <Brands setIsHovered={setIsHovered} />
                    }
                </div>

                {
                    user?.email
                        ? <Link to="/projects/readydemos"><Button variant="primary" className='uppercase'>Get Started</Button></Link>
                        : <Button variant="primary" onClick={() => dispatch(showLogin())} className='uppercase'>Login</Button>
                }
            </div>
        </nav>
    );
};

export default HomeNav;