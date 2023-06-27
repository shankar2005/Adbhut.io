import { motion } from "framer-motion";
import Backdrop from "../../../Components/Backdrop/Backdrop";
import AuthSection from "../AuthSection";

const AuthModal = () => {
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
            >
                <AuthSection />
            </motion.div>
        </Backdrop>
    );
};

export default AuthModal;