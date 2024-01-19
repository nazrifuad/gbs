import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MainLogo from "../../components/Logo/MainLogo";

import previewIcon from "../../assets/img/preview-icon.svg";

const Nav = () => {
  // active nav function
  const location = useLocation();
  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="header section nav-mobile-not-active">
        <div id="navbar" className="navbar">

          {/* desktop */}
          <div className="navbar-wrapper">
            <div className="left-navbar">
              <div className="btn-link btn-nav-home">
                <NavLink
                  to="/"
                  className={`default-btn-click ${
                    isNavLinkActive("/") ? "active-link" : ""
                  }`}
                >
                  <MainLogo />
                </NavLink>
              </div>
            </div>
            <div className="middle-navbar link-navbar-wrapper">
              <ul className="link-desktop link-desktop-center">
                <li className="gbs">
                  <NavLink
                    to="/"
                    className={
                      isNavLinkActive("/") ? "active-link" : ""
                    }
                    data-replace="GBS"
                  >
                    <span>GBS</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={
                      isNavLinkActive("/about") ? "active-link" : ""
                    }
                    data-replace="About"
                  >
                    <span>About</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/portfolio"
                    className={
                      isNavLinkActive("/portfolio") ? "active-link" : ""
                    }
                    data-replace="Portfolio"
                  >
                    <span>Portfolio</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/faqs"
                    className={
                      isNavLinkActive("/faqs") ? "active-link" : ""
                    }
                    data-replace="FAQs"
                  >
                    <span>FAQs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={
                      isNavLinkActive("/contact") ? "active-link" : ""
                    }
                    data-replace="Contact"
                  >
                    <span>Contact</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="right-navbar link-navbar-wrapper">
              <ul className="link-desktop link-desktop-right">
                <li>
                  <NavLink
                    to="/contact"
                    className={
                      isNavLinkActive("/contact") ? "active-link" : ""
                    }
                    data-replace="Hire Us"
                  >
                    <span>Hire Us</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>


          
        </div>
      </header>
    </>
  );
};

export default Nav;
