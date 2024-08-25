import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function PageTransition({ children, routeText }) {
    const text = {
        initial: {
            opacity: 0,
        },

        enter: {
            opacity: 1,
            transition: { duration: 0.15, delay: 0, ease: [0.76, 0, 0.24, 1] },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.15, delay: 0, ease: [0.33, 1, 0.68, 1] },
        },
    };

    const translate = {
        initial: {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        enter: {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
            transitionEnd: {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            },
        },
        exit: {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
        },
    };

    return (
        <motion.div>
            <motion.div className="pageTransitionHolder" initial="initial" animate="enter" exit="exit" variants={translate}>
                <motion.p className="route" variants={text}>
                    {routeText}
                </motion.p>
            </motion.div>
            {children}
        </motion.div>
    );
}

PageTransition.propTypes = {
    children: PropTypes.node.isRequired,
    routeText: PropTypes.string,
};
