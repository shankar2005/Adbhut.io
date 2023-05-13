import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const NothingFound = () => {
    return (
        <div className='flex flex-col items-center mt-10'>
            <img className='w-36 opacity-80' src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png" alt="" />
            <h1 className='text-xl font-mono opacity-80'>Nothing found!</h1>
            <Link to="/projects/chat" className='md:hidden flex items-center mt-2 gap-1'><IoMdArrowBack /> Go Back</Link>
        </div>
    );
};

export default NothingFound;