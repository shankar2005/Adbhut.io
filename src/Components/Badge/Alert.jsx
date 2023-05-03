import { AiOutlineExclamationCircle } from "react-icons/ai";

const Alert = ({ children }) => {
    return (
        <div className='bg-yellow-100 text-yellow-700 font-medium p-3 rounded flex items-center gap-1 shadow-md border-[1.8px] border-yellow-400 text-sm'>
            <AiOutlineExclamationCircle size={20} />
            {children}
        </div>
    );
};

export default Alert;