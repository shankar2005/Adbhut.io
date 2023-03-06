import { motion } from "framer-motion";

const LeftToRight = ({ children }) => {
    const pageTransition = {
        initial: {
            x: "-100vw",
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: "100vw",
            opacity: 0
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
        >
            {children}
        </motion.div>
    );
};

export default LeftToRight;