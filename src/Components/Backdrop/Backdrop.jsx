import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {
    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default Backdrop;