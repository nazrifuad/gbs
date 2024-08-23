import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function PageTransition({ children }) {
    const slide = {
        initial: {
            top: "0",
        },
        enter: {
            top: "-100vh",
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.76, 0, 0.24, 1],
            },
        },
        exit: {
            top: "0",
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    };

    return (
        <motion.div
            className="pageTransitionHolder"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={slide}
        >
            {/* This wraps your children with the motion element */}
            {children}
        </motion.div>
    );
}

PageTransition.propTypes = {
    children: PropTypes.node,
};
