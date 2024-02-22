import React from "react";
import { Link } from "react-router-dom";

import gbsHorizontalLogo from "../../assets/img/full-logo-horizontal.svg";

// icons
import IgIcon from "../Icons/IgIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import MagneticHover from "../Functions/MagneticHover";

const Footer = () => {
  return (
    <>
      <footer className="section footer dark-theme">
        <div className="container">
          <div className="footer-wrap">
            <div className="row footer-row footer-row-one">
              <div className="col-6 no-padding">
                <div className="footer-logo">
                  <Link to="/">
                    <img src={gbsHorizontalLogo} alt="Gravitas Business Solution" />
                  </Link>
                </div>
              </div>
              <div className="col-6 no-padding">
                <div className="footer-link-wrapper pt-50-m">
                  <div className="menu-link-footer">
                    <div className="label">
                      <p>Locate us</p>
                    </div>
                    <div className="desc">
                      <p>
                        D-01-01, Menara Mitraland No, 13A, <br />
                        Jalan PJU 5/1, Kota Damansara, <br />
                        47810 Petaling Jaya, Selangor
                      </p>
                    </div>
                  </div>
                  <div className="menu-link-footer">
                    <div className="label">
                      <p>Mail to</p>
                    </div>
                    <div className="desc">
                      <Link to="mailto:hello@gravitas.my">hello@gravitas.my</Link>
                    </div>
                  </div>
                  <div className="menu-link-footer">
                    <div className="label">
                      <p>Or call us</p>
                    </div>
                    <div className="desc">
                      <Link to="tel:+60123456789">+60123456789</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row footer-row footer-row-two">
              <div className="col-6 no-padding">
                <p className="small">
                  © <script>document.write(new Date().getFullYear())</script> Gravitas Integrated. All Rights Reserved.
                </p>
              </div>
              <div className="col-6 no-padding">
                <div className="footer-socials-wrapper">
                  <div className="footer-socials-img">
                    <MagneticHover>
                      <Link to="https://www.instagram.com/gravitas.my/" target="_blank">
                        <IgIcon />
                      </Link>
                    </MagneticHover>
                  </div>
                  <div className="footer-socials-img">
                    <MagneticHover>
                      <Link to="https://my.linkedin.com/company/gravitas-my" target="_blank">
                        <LinkedInIcon />
                      </Link>
                    </MagneticHover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
