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
                <div id='authScroll' className="pt-6 text-black bg-white rounded-md p-5 shadow-2xl overflow-y-auto relative">
                    <div className='flex flex-col items-center gap-5'>
                        <BsExclamationCircle className='text-gray-500' size={40} />
                        <p className='font-serif font-medium text-gray-600'>Your project data will be lost, Are you sure want to continue?</p>
                        <div className='space-x-3'>
                            <Button onClick={handleYes}>Yes, I'm sure</Button>
                            <Button onClick={handleNo} variant="danger">No, cancel</Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    );
};

export default ConfirmationModal;