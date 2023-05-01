import { RxCross1 } from 'react-icons/rx';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ children, onClick }) => {
    return (
        <Backdrop>
            <div className='w-full max-w-2xl max-h-full relative'>
                <RxCross1 onClick={onClick} className='absolute top-3 right-6 cursor-pointer' size={25} />
                {children}
            </div>
        </Backdrop>
    );
};

export default Modal;