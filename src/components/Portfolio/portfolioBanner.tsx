import React from 'react'
import { getStrapiURL } from '../../utils/getStrapiMedia';

type tags = {
  id: number;
  title: string;
}

export default function PortfolioBanner({title, tags, bannerImage} : {title: string, tags: tags[], bannerImage: string}) {
  return (
    <section className='section custom-section-spacing portfolio-banner-section dark-theme'>
      <div className="container">
        <div className="general-heading-wrapper portfolio-wrapper">
          <div className="sub-description mw-600 text-center mw-full-m mw-full-i">
            <h3 className="font-white">{title}</h3>
          </div>
          {/* portfolio tags */}
          {tags.length > 0 && (
            <div className="services-tag flex flex-center mt-20">
              {tags.map((tag, index) => (
                  <div key={`tag-${index}`} className="subheader-wrapper general-border third-border">
                      <h6>{tag.title}</h6>
                  </div>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio Image */}
        {bannerImage && (
          <div className="cards-grid portfolio">
            <div className="cards-wrap">
              <div className="card-link-wrapper">
                <div className="cards-desc-wrap">
                  <div className="row">
                    <div className="col-12">
                      <div className="cards-image-wrap">
                        <div className="overlay">
                          <img src={getStrapiURL(bannerImage)} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
