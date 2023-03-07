import { motion } from "framer-motion";

const MessageReceiver = ({ name, image, text }) => {
    return (
        <motion.div
            initial={{ translateX: '-100%' }}
            animate={{ translateX: '0%' }}
            transition={{ delay: 0.2 }}
        >
            <div className='text-sm flex gap-2 mb-5'>
                <img className='w-10 h-10' src={image} alt="" />
                <div className='mr-12'>
                    <h4 className='font-medium'>{name}</h4>
                    <p className='bg-sky-500 text-white p-3 rounded-bl-lg rounded-br-lg rounded-tr-lg w-fit mb-1'>
                        {text}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default MessageReceiver;