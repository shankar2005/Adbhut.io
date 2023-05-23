import { motion } from "framer-motion";

const Message = ({ name, image, text, isOwn }) => {
    if (isOwn) {
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
                        <p className='bg-sky-100 w-fit ml-auto  p-3 rounded-bl-lg rounded-br-lg rounded-tl-lg'>
                            {text}
                        </p>
                    </div>
                    <img className='w-10 h-10 rounded-full' src={image} alt="" />
                </div>
            </motion.div>
        );
    }

    return <motion.div
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
};

export default Message;