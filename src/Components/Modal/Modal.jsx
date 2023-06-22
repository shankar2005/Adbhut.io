import { RxCross1 } from 'react-icons/rx';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ children, onClick }) => {
    return (
        <Backdrop>
            <div className='w-11/12 max-w-2xl max-h-full relative'>
                {/* <RxCross1 onClick={onClick} className='absolute -top-7 -right-5 md:top-0 md:-right-8 text-white cursor-pointer' size={25} /> */}
                {children}
            </div>
        </Backdrop>
    );
};

export default Modal;