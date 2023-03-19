import { motion } from 'framer-motion';
import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import Backdrop from '../../../Components/Backdrop/Backdrop';
import RegisterForm from '../../Auth/RegisterForm';
import logo from '../../../assets/logos/adbeta.jpeg';

const GetInvitedModal = ({ setShowRegisterModal }) => {
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.2,
                type: "string",
                damping: 25,
                stiffness: 500,
            }
        },
        exit: {
            y: "-100vh",
            opacity: 0,
        },
    }

    return (
        <Backdrop>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"

                id='authScroll'
                className="pt-6 text-black bg-white w-96 max-h-[90vh] border rounded-md p-5 shadow-2xl overflow-y-auto relative"
            >
                <button onClick={() => setShowRegisterModal(false)} className='absolute right-3 top-3'><RxCross1 size={25} /></button>
                <img className='w-16 mx-auto mb-5' src={logo} alt="" />
                <h2 className="mb-3 text-2xl font-semibold text-center">Sign up a account</h2>
                <RegisterForm />
            </motion.div>
        </Backdrop>
    );
};

export default GetInvitedModal;