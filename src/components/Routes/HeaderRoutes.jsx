import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "../../pages/Nav/Nav";

import NoPage from "../../pages/NoPage";
import Homepage from "../../pages/Home";
import PortfolioTemplate from "../../pages/PortfolioTemplate";

// header routing
const HeaderRoutes = () => {
  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioTemplate />} />
        </Routes>
      </>
    </Router>
  );
};

export default HeaderRoutes;
