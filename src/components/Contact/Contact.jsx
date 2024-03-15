import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

import closeIcon from "../../assets/img/close-icon.svg";

// functions
import MagneticHover from "../Functions/MagneticHover";


const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);


  // outside modal also close
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-section")) {
      closeModal();
    }
  };

  // close the modal
  const closeModal = () => {
    setShowConfirmation(false);
    setShowError(false);
    form.current.reset(); // Reset the form to clear input fields
  };

  const sendEmail = (e) => {
    e.preventDefault();

    setIsSending(true);

    if (form.current.gotcha.value === "") {
      emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY).then(
        (result) => {
          console.log(result.text);
          setIsSending(false);
          setShowConfirmation(true);
        },
        (error) => {
          console.log(error.text);
          setIsSending(false);
          setShowError(true);
        }
      );
    }
  };


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
                <MagneticHover>
                  <div className="default-btn secondary-btn">
                    <Link to="/" className="btn-link" data-scroll-to>
                      <div className="btn-text" data-replace="Schedule a Call">
                        <span className="inner-btn-text">Schedule a Call</span>
                      </div>
                    </Link>
                  </div>
                </MagneticHover>
              </div>
            </div>
            <div className="col-8">
              <div className="form-wrapper">
                <div className="form-inner-wrapper">
                  {/* form */}
                  <div className="form-wrapper form-two-layout">
                    <form className="form-custom" ref={form} onSubmit={sendEmail}>
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
                          <input id="phoneNumber" name="phoneNumber" type="tel" placeholder="Ex: 012-456-7890" pattern="[0-9]*" inputMode="numeric" required />
                        </div>

                        <div className="form-col">
                          <label htmlFor="budget">Estimated Budget</label>
                          <select id="budget" name="budget" className="custom-select form-select" defaultValue="RM5,000">
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

                      {/* honeypot security */}
                      <div className="form-row">
                        <div className="form-col">
                          <input style={{ display: "none" }} type="text" id="gotcha" name="gotcha" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-col form-submit-btn">
                          <MagneticHover>
                            <div className="default-btn secondary-btn">
                              <div className="btn-link">
                                <button type="submit" className="btn-text" data-replace="Send" disabled={isSending}>
                                  {/* <span className="inner-btn-text">Send</span> */}
                                  <span className="inner-btn-text">{isSending ? 'Sending...' : 'Send'}</span>
                                </button>
                              </div>
                            </div>
                          </MagneticHover>
                        </div>
                      </div>

                      {/* popup modal */}
                      <div className={`modal-section ${showConfirmation || showError ? "show-modal" : ""}`} onClick={handleOverlayClick}>
                        <div className="modal-container">
                          <div className="modal-item">
                            <div className="close-button" onClick={closeModal}>
                              <img src={closeIcon} alt="Close" />
                            </div>
                            <div className="desc-wrap">
                              {showConfirmation && (
                                <div className="confirmation-popup">
                                  <h3>Cool!</h3>
                                  <p> Thank you for your application. We will keep in touch shortly. </p>
                                </div>
                              )}
                              {showError && (
                                <div className="confirmation-popup">
                                  <h3>Oops!</h3>
                                  <p> There was an error trying to send your message. Please try again later. </p>
                                </div>
                              )}
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
