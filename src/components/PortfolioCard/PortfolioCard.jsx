import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const renderServiceTags = (tags) => {
  return tags.map((tag, index) => (
    <div key={index} className="subheader-wrapper general-border third-border">
      <h6>{tag}</h6>
    </div>
  ));
};

const PercentageInfo = ({ label, value }) => {
  return (
    <div className="cards-info">
      <h5>{label}</h5>
      <p className="big">{`${value}%`}</p>
    </div>
  );
};

PercentageInfo.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const PortfolioCard = ({ title, description, tags, imageUrl, linkTo, usability, userRetention }) => {

  return (
    <>
      <div className="cards-wrap pinned">
        <div className="card-link-wrapper">
          <div className="cards-desc-wrap">
            <div className="row">
              <div className="col-6">
                <div className="cards-title">
                  <h4>{title}</h4>
                </div>
                <div className="cards-desc">
                  <p>{description}</p>
                </div>
                <div className="services-tag">{renderServiceTags(tags)}</div>
                <div className="flex-center flex-start btn">
                  <div className="default-btn secondary-btn m-hover">
                    <Link to={linkTo} className="btn-link">
                      <div className="btn-text" data-replace="View Case Study">
                        <span className="inner-btn-text">View Case Study</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="cards-image-wrap">
                  <div className="overlay">
                    <img src={imageUrl} alt={title} />
                  </div>
                </div>
                <div className="cards-info-wrapper">
                  <PercentageInfo label="Usability" value={usability} />
                  <PercentageInfo label="User Retention" value={userRetention} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PortfolioCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired, // add linkTo prop for dynamic link
  usability: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  userRetention: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PortfolioCard;
