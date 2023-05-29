import { motion } from "framer-motion";
import { format } from 'timeago.js';

const MessageNew = ({ msg, isOwn }) => {
    if (isOwn) {
        return (
            <motion.div
                initial={{ translateX: '100%' }}
                animate={{ translateX: '0%' }}
                transition={{ delay: 0.2 }}
                className="w-fit ml-auto"
            >
                <div className='text-sm flex gap-2'>
                    <div className='ml-12 flex flex-col items-end'>
                        {/* <h4 className='font-medium text-right'>{name}</h4> */}
                        <p className='bg-sky-100 w-fit ml-auto p-2.5 rounded-bl-lg rounded-br-lg rounded-tl-lg border border-gray-200'>
                            {msg.message}
                        </p>
                        <p className="text-gray-400 flex items-center gap-1 text-xs mt-1">{format(msg.timestamp)}</p>
                    </div>
                    {/* <img className='w-10 h-10 rounded-full' src={image} alt="" /> */}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ translateX: '-100%' }}
            animate={{ translateX: '0%' }}
            transition={{ delay: 0.2 }}
        >
            <div className='text-sm flex gap-2'>
                {/* <img className='w-10 h-10 rounded-full' src={image} alt="" /> */}
                <div className='mr-12 flex flex-col items-start'>
                    {/* <h4 className='font-medium'>{name}</h4> */}
                    <p className='bg-sky-500 text-white p-3 rounded-bl-lg rounded-br-lg rounded-tr-lg w-fit'>
                        {msg.message}
                    </p>
                    <p className="text-gray-400 flex items-center gap-1 text-xs mt-1">{format(msg.timestamp)}</p>
                </div>
            </div>
        </motion.div>
    )
};

export default MessageNew;