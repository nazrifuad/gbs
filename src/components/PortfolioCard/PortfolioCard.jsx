import PropTypes from "prop-types";
import MagneticHover from "../Functions/MagneticHover";

const renderServiceTags = (tags) => {
    console.log(tags);
    return tags.map((tag, index) => (
        <div key={index} className="subheader-wrapper general-border third-border">
            <h6>{tag.title}</h6>
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
                                    <MagneticHover>
                                        <div className="default-btn secondary-btn">
                                            <a href={linkTo} className="btn-link">
                                                <div className="btn-text" data-replace="View Case Study">
                                                    <span className="inner-btn-text">View Case Study</span>
                                                </div>
                                            </a>
                                        </div>
                                    </MagneticHover>
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
    title: PropTypes.string,
    description: PropTypes.string,
    // tags: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
    ),
    imageUrl: PropTypes.string,
    linkTo: PropTypes.string, // add linkTo prop for dynamic link
    usability: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userRetention: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PortfolioCard;
