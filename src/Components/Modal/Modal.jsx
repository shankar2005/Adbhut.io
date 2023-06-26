import { RxCross1 } from 'react-icons/rx';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ children, onClick, className }) => {
    return (
        <Backdrop>
            <div className={`${className} max-h-full relative`}>
                <RxCross1 onClick={onClick} className='absolute top-0 right-0 m-4 cursor-pointer' size={25} />
                {children}
            </div>
        </Backdrop>
    );
};

export default Modal;