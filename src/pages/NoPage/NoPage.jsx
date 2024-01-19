import React from "react";
import { Link } from "react-router-dom"
import MainGradient from "../../components/Gradient/MainGradient";

const NoPage = () => {
  return (
    <>
      <section className="section main-section full-height">
        <div className="container">
          {/* gradient bg */}
          <MainGradient />

          <div className="section-wrap align">
            <div className="general-heading-wrapper">
              <div className="general-big-desc mw-900 mw-full-m -mw-full-i text-center">
                <h3>404 ERROR: PAGE NOT FOUND</h3>
              </div>
              <div className="general-subtitle mw-1200 mw-full-m -mw-full-i text-center ">
                <p>The page you are trying to access does not exist on the server.</p>
              </div>
            </div>
            <div className="flex-center btn pt-50">
              <div className="default-btn secondary-btn">
                <Link to="/" className="btn-link">
                  <div className="btn-text" data-replace="Homepage">
                    <span className="inner-btn-text">Homepage</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NoPage;
