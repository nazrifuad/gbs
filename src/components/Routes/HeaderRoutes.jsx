import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "../../pages/Nav/Nav";
import NoPage from "../../pages/NoPage";
import Homepage from "../../pages/Home";
import PortfolioTemplate from "../../pages/PortfolioTemplate";
import Footer from "../Footer/Footer";
import RevealAnimation from "../Functions/RevealAnimation";
import useSmoothScroll from "../Functions/useSmoothScroll";
import PageTransition from "../Animation/PageTransition";
import { AnimatePresence } from "framer-motion";

const HeaderRoutes = () => {
    useSmoothScroll();
    const location = useLocation();

    return (
        <>
            <Nav />
            <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition routeText={'Home'}><Homepage /></PageTransition>} />
                    <Route path="*" element={<PageTransition routeText={'404'}><NoPage /></PageTransition>} />
                    <Route path="/portfolio/:slug" element={<PageTransition routeText={'Portfolio'}><PortfolioTemplate /></PageTransition>} />
                </Routes>
            </AnimatePresence>
            <Footer />
            <RevealAnimation />
        </>
    );
};

export default HeaderRoutes;
