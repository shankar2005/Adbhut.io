import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Backdrop from "../../../Components/Backdrop/Backdrop";
import AuthSection from "../AuthSection";

const AuthModal = () => {
    const { loginModal } = useSelector(state => state.dropdown);

    if (loginModal) return (
        <Backdrop>
            <motion.div onClick={(e) => e.stopPropagation()} >
                <AuthSection />
            </motion.div>
        </Backdrop>
    );
};

export default AuthModal;