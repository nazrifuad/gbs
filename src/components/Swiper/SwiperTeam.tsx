import React from 'react'
import { getStrapiMedia } from "../../utils/getStrapiMedia";

export default function SwiperTeam({ member_image, first_name, last_name, job_title }: any) {
  return (
    <>
      <div className="swiper-slide cards-wrap">
        <div className="card-link-wrapper">
          <div className="cards-desc-wrap">
            <div className="cards-image-wrap">
              <img src={getStrapiMedia(member_image.data.attributes.url)} alt={`${first_name} ${last_name}`} />
            </div>
            <div className="cards-title">
              <h4>
                <span className="firstName big">{first_name}</span>
                <span className="secName big">{last_name}</span>
              </h4>
            </div>
            <div className="cards-desc">
              <p>{job_title}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
