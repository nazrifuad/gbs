import React from "react";

const SwiperTeam = ({ image, firstName, secName, position }) => {
  return (
    <>
      <div className="swiper-slide cards-wrap">
        <div className="card-link-wrapper">
          <div className="cards-desc-wrap">
            <div className="cards-image-wrap">
              <img src={image} alt={`${firstName} ${secName}`} />
            </div>
            <div className="cards-title">
              <h4>
                <span className="firstName big">{firstName}</span>
                <span className="secName big">{secName}</span>
              </h4>
            </div>
            <div className="cards-desc">
              <p>{position}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwiperTeam;
