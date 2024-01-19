import React from 'react'
import MainGradient from '../../components/Gradient/MainGradient'


const PageTemplate = () => {
  return (
    <>
      <section className="section main-section full-height">
        <div className="container">
          {/* gradient bg */}
          <MainGradient />

          <div className="section-wrap align">
            <div className="general-heading-wrapper">
              <div className="general-big-desc mw-900 mw-full-m -mw-full-i text-center">
               <h3>THIS IS A DEFAULT LAYOUT</h3>
              </div>
              <div className="general-subtitle mw-1200 mw-full-m -mw-full-i text-center ">
                <p>Copy/Edit this section to have the same layout as the other section</p>
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
  )
}

export default PageTemplate
