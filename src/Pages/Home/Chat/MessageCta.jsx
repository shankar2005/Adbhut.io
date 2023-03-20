import { motion } from "framer-motion";

const MessageCta = ({ name, image, children }) => {
    return (
        <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            transition={{ delay: 0.2 }}
            className="ml-auto"
        >
            <div className='text-sm flex gap-2 mb-5'>
                <div className='ml-12'>
                    <h4 className='font-medium text-right'>{name}</h4>
                    {children}
                </div>
                <img className='w-10 h-10 rounded-full' src={image} alt="" />
            </div>
        </motion.div>
    );
};

export default MessageCta;