import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <section id="contact" className="section contact-section dark-theme no-padding" data-scroll-section>
        <div className="container">
          <div className="general-heading-wrapper">
            <div className="sub-description mw-600 mw-full-m mw-full-i">
              <h3 className="font-white">Let’s talk about you</h3>
            </div>
          </div>

          <div className="row contact-row triggerElement">
            <div className="col-4">
              <h4>
                <span className="main-font-gradient">Free</span> consultation
              </h4>
              <p className="font-grey">Have a new project in mind? Schedule a 30-minute discovery call or fill out the quick form, and together we'll explore the possibilities.</p>
              <div className="flex-center flex-start btn">
                <div className="default-btn secondary-btn m-hover">
                  <Link to="/" className="btn-link" data-scroll-to>
                    <div className="btn-text" data-replace="Schedule a Call">
                      <span className="inner-btn-text">Schedule a Call</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="form-wrapper">
                <div className="form-inner-wrapper">
                  {/* form */}
                  <div className="form-wrapper form-two-layout">
                    <form className="form-custom" action="index.php" method="post">
                      <div className="form-row">
                        <div className="form-col">
                          <label htmlFor="name">Your name</label>
                          <input id="name" name="name" type="text" placeholder="Type your name" autoComplete="name" required />
                        </div>

                        <div className="form-col">
                          <label htmlFor="email">Email</label>
                          <input id="email" name="email" type="email" placeholder="Type your email" autoComplete="email" required />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-col">
                          <label htmlFor="phoneNumber">Phone</label>
                          <input id="phoneNumber" name="phoneNumber" type="text" placeholder="Type your phone number" />
                        </div>

                        <div className="form-col">
                          <label htmlFor="budget">Estimated Budget</label>
                          <select id="budget" className="custom-select form-select" defaultValue="RM5,000">
                            <option value="RM5,000">RM5,000</option>
                            <option value="RM10,000">RM10,000</option>
                            <option value="RM25,000">RM25,000</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-col">
                          <label htmlFor="messages">Project Brief</label>
                          <textarea cols="10" rows="4" id="messages" name="messages" placeholder="Simply explain your project"></textarea>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-col form-submit-btn">
                          <div className="default-btn secondary-btn m-hover">
                            <div className="btn-link">
                              <button type="submit" className="btn-text" data-replace="Send">
                                <span className="inner-btn-text">Send</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
