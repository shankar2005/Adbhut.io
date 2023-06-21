
import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import { BsExclamationCircle } from 'react-icons/bs';
import { useRootContext } from '../../contexts/RootProvider';
import { useEffect } from 'react';

const ConfirmationModal = () => {
    const { setConfirm, setShowModal } = useRootContext();

    useEffect(() => {
        setConfirm(false);
    }, [])

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

    // handle decissions
    const handleNo = () => {
        setShowModal(false);
    }

    const handleYes = () => {
        setConfirm(true);
        handleNo();
    }

    return (
        <Backdrop>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="font-hero pt-6 text-black bg-white rounded-md p-5 shadow-2xl overflow-y-auto scroll-none relative mx-5 md:mx-0">
                    <div className='flex flex-col items-center gap-5'>
                        <BsExclamationCircle className='text-gray-500' size={40} />
                        <p className='font-medium text-gray-600'>Your project data will be lost, Are you sure want to continue?</p>
                        <div className='space-x-3'>
                            <Button variant="primary" onClick={handleYes}>Yes, I'm sure</Button>
                            <Button variant="danger" onClick={handleNo}>No, cancel</Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    );
};

export default ConfirmationModal;