import { useEffect, useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
import { Link as ScrollLink, Events, scrollSpy } from 'react-scroll';
import { useLocation } from "react-router-dom";
import MainLogo from "../../components/Logo/MainLogo";

import MagneticHover from "../../components/Functions/MagneticHover";

const Nav = () => {

  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileNavActive, setMobileNavActive] = useState(false);

  useEffect(() => {
    const handleScrollEnd = (to) => {
      setActiveSection(to);
    };

    Events.scrollEvent.register("end", handleScrollEnd);

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("end");
    };
  }, []);

  const isNavLinkActive = (path) => {
    return location.pathname === path || activeSection.includes(path);
  };

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  const openMobileNav = () => {
    setMobileNavActive(true);
    document.body.classList.add("modal-open");
  };

  const closeMobileNav = () => {
    setMobileNavActive(false);
    document.body.classList.remove("modal-open");
  };

  const handleLinkClick = () => {
    closeMobileNav();
    // Remove the modal-open class when a mobile link is clicked
    document.body.classList.remove("modal-open");
  };


      // added class to header when scrolling
      useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
    
          // Hide the header when scrolling down, show when scrolling up
          setIsHidden(scrollTop > lastScrollTop);
          lastScrollTop = scrollTop;
        };
    
        let lastScrollTop = 0;
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

  
  

  return (
    <>
      <header className={`header section ${isMobileNavActive ? 'nav-mobile-active' : 'nav-mobile-not-active'} ${isHidden ? "header-hidden" : ""}`}>
        <div id="navbar" className="navbar">

          {/* desktop */}
          <div className="navbar-wrapper">
            <div className="left-navbar">
              <MagneticHover>
                <div className="btn-link btn-nav-home">
                  <ScrollLink
                    to="/"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={`default-btn-click ${
                      isNavLinkActive("/") ? "active-link" : ""
                    }`}
                    onSetActive={() => handleSetActive("/")}
                  >
                    <MainLogo />
                  </ScrollLink>
                  {/* <NavLink
                    to="/"
                    className={`default-btn-click ${
                      isNavLinkActive("/") ? "active-link" : ""
                    }`}
                  >
                    <MainLogo />
                  </NavLink> */}
                </div>
              </MagneticHover>
            </div>
            <div className="middle-navbar link-navbar-wrapper">
              <ul className="link-desktop link-desktop-center">
                <li className="gbs">
                  <ScrollLink
                    to="hero"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={
                      isNavLinkActive("hero") ? "active-link" : ""
                    }
                    data-replace="GBS"
                    onSetActive={() => handleSetActive("hero")}
                  >
                    <span>GBS</span>
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="about-us"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={
                      isNavLinkActive("about-us") ? "active-link" : ""
                    }
                    data-replace="About"
                    onSetActive={() => handleSetActive("about-us")}
                  >
                    <span>About</span>
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="portfolio"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={
                      isNavLinkActive("portfolio") ? "active-link" : ""
                    }
                    data-replace="Portfolio"
                    onSetActive={() => handleSetActive("portfolio")}
                  >
                    <span>Portfolio</span>
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="faqs"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={
                      isNavLinkActive("faqs") ? "active-link" : ""
                    }
                    data-replace="FAQs"
                    onSetActive={() => handleSetActive("faqs")}
                  >
                    <span>FAQs</span>
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={
                      isNavLinkActive("contact") ? "active-link" : ""
                    }
                    data-replace="Contact"
                    onSetActive={() => handleSetActive("contact")}
                  >
                    <span>Contact</span>
                  </ScrollLink>
                </li>
              </ul>
            </div>
            <div className="right-navbar link-navbar-wrapper">
              <MagneticHover>
                <ul className="link-desktop link-desktop-right">
                  <li>
                    <ScrollLink
                      to="contact"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={
                        isNavLinkActive("contact") ? "active-link" : ""
                      }
                      data-replace="Hire Us"
                      onSetActive={() => handleSetActive("contact")}
                    >
                      <span>Hire Us</span>
                    </ScrollLink>
                  </li>
                </ul>
              </MagneticHover>
            </div>

            {/* mobile nav hamburger */}
            <div className="navbar-mobile">
              <div className="hamburger-wrap">
                <div className="hamburger" data-toggle="modal-nav-mobile" onClick={() => isMobileNavActive ? closeMobileNav() : openMobileNav()}>
                  <div className="hamburger-bar"></div>
                  <div className="hamburger-bar"></div>
                </div>
              </div>
            </div>
          </div>


          {/* mobile nav */}
          <div className="modal-nav-mobile">
            <div className="modal-block">
              <div className="modal-block-background"></div>
              <div className="ul-mobile-wrapper">
                <div id="ul-mobile" className="ul-mobile">
                  <div className="item">
                    <ScrollLink
                      to="about-us"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`mobile-link ${isNavLinkActive("about-us") ? "active-link" : ""}`}
                      onClick={handleLinkClick}
                      onSetActive={() => handleSetActive("about-us")}
                    >
                      <span>About</span>
                    </ScrollLink>
                    {/* <a href="#about-us" className="mobile-link nav-active" data-scroll-to>about</a> */}
                  </div>
                  <div className="item"> 
                    <ScrollLink
                      to="portfolio"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`mobile-link ${isNavLinkActive("portfolio") ? "active-link" : ""}`}
                      onClick={handleLinkClick}
                      onSetActive={() => handleSetActive("portfolio")}
                    >
                      <span>Portfolio</span>
                    </ScrollLink>
                  </div>
                  <div className="item">
                    <ScrollLink
                      to="faqs"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`mobile-link ${isNavLinkActive("faqs") ? "active-link" : ""}`}
                      onClick={handleLinkClick}
                      onSetActive={() => handleSetActive("faqs")}
                    >
                      <span>FAQs</span>
                    </ScrollLink>
                  </div>
                  <div className="item">
                    <ScrollLink
                      to="contact"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`mobile-link ${isNavLinkActive("contact") ? "active-link" : ""}`}
                      onClick={handleLinkClick}
                      onSetActive={() => handleSetActive("contact")}
                    >
                      <span>Contact</span>
                    </ScrollLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-nav-background" data-close="modal" onClick={handleLinkClick}></div>
          </div>

        </div>
      </header>
    </>
  );
};

export default Nav;


