import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "../../pages/Nav/Nav";

import NoPage from "../../pages/NoPage";
import Homepage from "../../pages/Home";
import PortfolioTemplate from "../../pages/PortfolioTemplate";
import Footer from "../Footer/Footer";
import RevealAnimation from "../Functions/RevealAnimation";
import useSmoothScroll from "../Functions/useSmoothScroll";

// header routing
const HeaderRoutes = () => {
    // eslint-disable-next-line no-unused-vars
    const scroll = useSmoothScroll();

    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="*" element={<NoPage />} />
                <Route path="/portfolio/:slug" element={<PortfolioTemplate />} />
            </Routes>
            <Footer />

            <RevealAnimation />
        </Router>
    );
};

export default HeaderRoutes;
