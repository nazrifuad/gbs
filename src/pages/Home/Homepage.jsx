import {useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";

import LoconativeScroll from "loconative-scroll";

import heroVideo from "../../assets/img/hero-video-overlay.mp4";

import bluesharkLogo from "../../assets/img/BLUESHARK.png";
import fxcLogo from "../../assets/img/fXC.png";
import mesraLogo from "../../assets/img/MESRA.png";
import prudentialLogo from "../../assets/img/PRUDENTIAL.png";
import pulseLogo from "../../assets/img/PULSE.png";
import sgsupportLogo from "../../assets/img/SG SUPPORT.png";
import gradImg03 from "../../assets/img/gradient-element-03.png";

import syafeeq from "../../assets/img/syafeeq.png";
import keyang from "../../assets/img/Ke Yang.png";
import fitri from "../../assets/img/Fitri.png";
import hanim from "../../assets/img/Hanim.png";
import yasmeen from "../../assets/img/Yasmeen.png";
import nazri from "../../assets/img/Nazri.png";
import james from "../../assets/img/James.png";
import amalia from "../../assets/img/Amalia.png";
import dayang from "../../assets/img/Dayang.png";

import gridBg from "../../assets/img/grid-bg.png";
import gradImg01 from "../../assets/img/gradient-element-01.png";
import gradImg02 from "../../assets/img/gradient-element-02.png";

import portfolioImg01 from "../../assets/img/portfolio-thumbnail.png";
import portfolioImg02 from "../../assets/img/portfolio-thumbnail-02.jpg";
import portfolioImg03 from "../../assets/img/portfolio-thumbnail-03.jpg";

// footer
import gbsHorizontalLogo from "../../assets/img/full-logo-horizontal.svg";



const Homepage = () => {
  gsap.registerPlugin(ScrollTrigger);

  // SMOOTH SCROLLING
  const locoScroll = new LoconativeScroll({
    el: document.querySelector("[data-scroll-container]"),
    scrollToEasing: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),
    smooth: true,
    duration: 0.95,
    });

    // Set up smooth scrolling
    locoScroll.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Each time the window updates, refresh ScrollTrigger and then update LocomotiveScroll
    window.addEventListener('resize', () => {
      locoScroll.update();
      ScrollTrigger.update();
    });

    // After everything is set up, refresh ScrollTrigger and update LocomotiveScroll
    ScrollTrigger.addEventListener('refresh', () => {
      locoScroll.update();
    });

    // Refresh ScrollTrigger and update LocomotiveScroll after setup
    ScrollTrigger.refresh();



  // HERO SECTION
    // change text
    const targetsRef = useRef([]);
    
    useEffect(() => {
        const initChangeTextHero = () => {
          const targets = targetsRef.current;
          gsap.set(targets, {
            autoAlpha: 0,
          });
    
          const animationConfig = {
            duration: 0.5,
            holdTime: 4,
          };
    
          targets.forEach((target, index) => {
            const timeline = gsap.timeline({
              delay: animationConfig.duration * index + animationConfig.holdTime * index,
              repeat: -1,
              repeatDelay: (targets.length - 1) * (animationConfig.duration + animationConfig.holdTime) -
                animationConfig.duration,
              defaults: {
                ease: "power4.inOut",
                duration: animationConfig.duration,
              },
            });
    
            timeline.fromTo(target,
              { autoAlpha: 0 }, // from
              { autoAlpha: 1, onStart: () => target.classList.add("active") } // to
            );
            timeline.to(target, {
              autoAlpha: 0,
              onComplete: () => target.classList.remove("active"),
            }, `+=${animationConfig.holdTime}`);
          });
        };
    
        // Call the function only on mobile devices
        // if (window.matchMedia('(max-width: 767px)').matches) {
        //   initChangeTextHero();
        // }
        // Call the function on all devices
        initChangeTextHero();
    }, []); // runs once after the initial render


  // CLIENT LOGO SECTION
    useEffect(() => {
      // Initialize marquee animation
      const initMarquee = () => {
        let direction = 1; // 1 = forward, -1 = backward scroll
  
        const roll1 = roll(".marquee-wrapper .marquee-inner-wrap", {
          duration: 30
        }),
          scroll = ScrollTrigger.create({
            trigger: document.querySelector('.marquee-wrapper .marquee-inner-wrapper'),
            onUpdate(self) {
              if (self.direction !== direction) {
                direction *= -1;
                gsap.to([roll1], {
                  timeScale: direction,
                  overwrite: true
                });
              }
              self.direction === -1 ? document.querySelector(".marquee-wrapper").classList.remove('flipped') : document.querySelector(".marquee-wrapper").classList.add('flipped');
            }
          });
  
        // Helper function that clones the targets, places them next to the original,
        // then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
        function roll(targets, vars, reverse) {
          vars = vars || {};
          vars.ease || (vars.ease = "none");
          const tl = gsap.timeline({
            repeat: -1,
            onReverseComplete() {
              this.totalTime(this.rawTime() + this.duration() * 10); // Otherwise, when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
            }
          });
          const elements = Array.from(document.querySelectorAll(targets));
          const clones = elements.map(el => {
            let clone = el.cloneNode(true);
            el.parentNode.appendChild(clone);
            return clone;
          });
          const positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], {
            position: "absolute",
            overwrite: false,
            top: el.offsetTop,
            left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)
          }));
          positionClones();
          elements.forEach((el, i) => tl.to([el, clones[i]], {
            xPercent: reverse ? 100 : -100,
            ...vars
          }, 0));
          window.addEventListener("resize", () => {
            let time = tl.totalTime(); // Record the current time
            tl.totalTime(0); // Rewind and clear out the timeline
            positionClones(); // Reposition
            tl.totalTime(time); // Jump back to the proper time
          });
          return tl;
        }
      };
  
      // Call the function to initialize the marquee animation
      initMarquee();
  
      // Clean up when the component unmounts
      return () => {
        // Ensure to cancel any animations and remove event listeners
        gsap.killTweensOf(".marquee-wrapper .marquee-inner-wrap");
        ScrollTrigger.getAll().forEach(st => st.kill());
        window.removeEventListener("resize", initMarquee);
      };
    }, []); // runs once after the initial render


  // TEAM SECTION
    // team slider
    useEffect(() => {
      const swiper = new Swiper(".swiper.team", {
        slidesPerView: 1,
        spaceBetween: 40,
        speed: 1000,
        modules: [Navigation],
        navigation: {
          nextEl: ".custom-nav-wrapper.team .custom-button-next",
          prevEl: ".custom-nav-wrapper.team .custom-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1300: {
            slidesPerView: 3,
          },
        },
      });
    }, []); // run this effect only once when the component mounts


  // EXPERTISE SECTION
    // change text animation
    const changeTextElementsRef = useRef([]);
    let currentIndex = 0;
    let intervalTime = 4000; 
    const minIntervalTime = 2000; 
  
    const changeText = () => {
      const changeTextElements = changeTextElementsRef.current;
  
      // remove the 'active' class from all elements
      if (changeTextElements) {
        changeTextElements.forEach((element) => {
          element.classList.remove("active");
        });
      }
  
      // add the 'active' class to the current element
      changeTextElements[currentIndex].classList.add("active");
  
      // increment the index or reset to 0 if it reaches the end
      currentIndex = (currentIndex + 1) % changeTextElements.length;
  
      // adjust the interval time when reaching the end
      if (currentIndex === 0) {
        intervalTime = Math.max(minIntervalTime, intervalTime - 100); // Decrease interval time (min 500 milliseconds)
      }
  
      // Call the function recursively with a delay
      setTimeout(changeText, intervalTime);
    };
  
    useEffect(() => {
      // Start the text change
      changeText();
  
      // Clear the interval when the component unmounts
      return () => {
        clearTimeout(changeText);
      };
    }, []); // runs once after the initial render


  // PORTFOLIO SECTION
    // pinning layered
    useEffect(() => {
      const initPinningPortfolio = () => {
        if (window.innerWidth > 1024) {
          const cardsPinned = gsap.utils.toArray(".portfolio .pinned");
          const pinningSpacer = 50;
          const minScalePinned = 0.9;
  
          const distributorPinned = gsap.utils.distribute({
            base: minScalePinned,
            amount: 0.05
          });
  
          cardsPinned.forEach((card, index) => {
            const scaleVal = distributorPinned(index, card, cardsPinned);
  
            gsap.to(card, {
              scrollTrigger: {
                trigger: card,
                start: "top 5%",
                scrub: true,
                invalidateOnRefresh: true,
              },
              ease: "none",
              scale: scaleVal,
            });
  
            const start = `top-=${index * pinningSpacer} 5%`;
            const endTrigger = ".cards-grid.portfolio";
  
            ScrollTrigger.create({
              trigger: card,
              start,
              endTrigger,
              end: (index < cardsPinned.length - 1) ? `bottom top+=${800 + (cardsPinned.length * pinningSpacer)}` : `bottom-=${index * pinningSpacer} top+=${800 + (cardsPinned.length * pinningSpacer)}`,
              pin: true,
              pinSpacing: false,
              id: `pin-${index}`, // unique ID for each ScrollTrigger
              invalidateOnRefresh: true,
            });
          });
        }
      };
  
      // Call the function to initialize pinning portfolio
      initPinningPortfolio();
  
      // Clean up when the component unmounts
      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, []); // runs once after the initial render

    
  // FAQS SECTION
    // ACCORDION 
      // input checked
      const [isChecked, setChecked] = useState(true);

      const handleCheckboxChange = () => {
        setChecked(!isChecked);
      };






    // PARALLAX FOR GRADIENT IMAGES
    const rotateImgTriggerWhyRef = useRef(null);
    const rotateImgElementWhyRef = useRef(null);
  
    const rotateImgTriggerExpertiseRef = useRef(null);
    const rotateImgElementExpertiseRef = useRef(null);
  
    const rotateImgTriggerFaqsRef = useRef(null);
    const rotateImgElementFaqsRef = useRef(null);
  
    useEffect(() => {
      const initParallaxImage = () => {
        if (window.innerWidth > 1024) {
          // Why
          const rotateElementWhy = gsap.timeline({
            scrollTrigger: {
              scrub: 1,
              pin: true,
              trigger: rotateImgTriggerWhyRef.current,
              start: "top 50%",
              endTrigger: rotateImgTriggerWhyRef.current,
              end: "bottom 50%",
            },
          });
      
          rotateElementWhy.to(rotateImgElementWhyRef.current, {
            rotateZ: 100,
          });
  
          // Expertise
          const rotateElementExpertise = gsap.timeline({
            scrollTrigger: {
              scrub: 1,
              pin: true,
              trigger: rotateImgTriggerExpertiseRef.current,
              start: "top 50%",
              endTrigger: rotateImgTriggerExpertiseRef.current,
              end: "bottom 50%",
            },
          });
  
          rotateElementExpertise.to(rotateImgElementExpertiseRef.current, {
            rotateZ: 100,
          });
  
          // FAQs
          const rotateElementFaqs = gsap.timeline({
            scrollTrigger: {
              scrub: 1,
              pin: true,
              trigger: rotateImgTriggerFaqsRef.current,
              start: "top 50%",
              endTrigger: rotateImgTriggerFaqsRef.current,
              end: "+=100",
            },
          });
  
          rotateElementFaqs.to(rotateImgElementFaqsRef.current, {
            rotateZ: 20,
          });
        }
      };
  
      // Call the function to initialize parallax images
      initParallaxImage();
  
      // Clean up when the component unmounts
      return () => {
        // Ensure to cancel any animations and remove event listeners
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, []); // runs once after the initial render




    
  return (
    <>
      <section id="hero" className="section hero-banner full-height" data-scroll-section>
        <div className="container">

          <div className="video-overlay">
            <video playsInline autoPlay loop muted>
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>

          <div className="hero-title-wrap hero-title-reveal mw-full-m mw-full-i text-center">
            <div className="hero-title change-text-wrapper-hero">
              <div className="change-text-wrapper-item">
                <div className="hero-change-block text-slide" ref={(el) => targetsRef.current.push(el)}>
                  <h1 className="font-white">
                    <span className="change-text-hero">Ideas</span>
                  </h1>
                </div>
                <div className="hero-change-block text-slide" ref={(el) => targetsRef.current.push(el)}>
                  <h1 className="font-white">
                    <span className="change-text-hero">Goals</span>
                  </h1>
                </div>
                <div className="hero-change-block text-slide" ref={(el) => targetsRef.current.push(el)}>
                  <h1 className="font-white">
                    <span className="change-text-hero">Purpose</span>
                  </h1>
                </div>
                <div className="hero-change-block text-slide" ref={(el) => targetsRef.current.push(el)}>
                  <h1 className="font-white">
                    <span className="change-text-hero">Vision</span>
                  </h1>
                </div>
                <div className="hero-change-block text-slide" ref={(el) => targetsRef.current.push(el)}>
                  <h1 className="font-white">
                    <span className="change-text-hero">Dreams</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="hero-title-below">
              <h1 className="font-white">
                {" "}
                Into <span className="main-font-gradient"> Realities</span>
              </h1>
            </div>
            <div className="hero-desc">
              <p className="big font-grey">Your Future, Powered by GBS Technology</p>
            </div>
          </div>

          <div className="scroll-down flex-center">
            <div className="default-btn main-btn">
              <a href="#about-us" className="btn-link" data-scroll-to>
                <div className="btn-text" data-replace="Scroll Down">
                  <span className="inner-btn-text">Scroll Down</span>
                </div>
                <div className="btn-icon">
                  <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="31" cy="31" r="30" stroke="#777777" />
                    <g clipPath="url(#clip0_6_64)">
                      <path
                        d="M22.25 36C23.1775 36 24.5625 36.9163 25.725 37.8438C27.225 39.0363 28.5338 40.4612 29.5325 42.095C30.2813 43.32 31 44.805 31 46M31 46C31 44.805 31.7187 43.3187 32.4675 42.095C33.4675 40.4612 34.7762 39.0363 36.2737 37.8438C37.4375 36.9163 38.825 36 39.75 36M31 46V16"
                        stroke="white"
                        strokeWidth="0.833333"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6_64">
                        <rect width="30" height="30" fill="white" transform="translate(16 16)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="section trusted-section" data-scroll-section>
        <div className="container full-width">
          <div className="general-heading-wrapper">
            <div className="general-big-desc text-center">
              <h5 className="main-font-gradient">Trusted by</h5>
            </div>
          </div>

          {/* clients */}
          <div className="marquee-box marquee-client">
            <div className="marquee-container" data-marquee-direction="left" data-marquee-status="normal" data-marquee-speed="30">
              <div className="marquee-wrapper">
                <div className="marquee-inner-wrapper" data-scroll data-scroll-direction="horizontal" data-scroll-speed="3">
                  <div className="marquee-inner-wrap">
                    <div className="marquee-item">
                      <img src={bluesharkLogo} alt="Blueshark" className="imgtoWhite" />
                    </div>
                    <div className="marquee-item">
                      <img src={fxcLogo} alt="FXC" className="imgtoWhite" />
                    </div>
                    <div className="marquee-item">
                      <img src={mesraLogo} alt="Mesra" className="imgtoWhite" />
                    </div>
                    <div className="marquee-item">
                      <img src={prudentialLogo} alt="PRUDENTIAL" className="imgtoWhite" />
                    </div>
                    <div className="marquee-item">
                      <img src={pulseLogo} alt="PULSE" className="imgtoWhite" />
                    </div>
                    <div className="marquee-item">
                      <img src={sgsupportLogo} alt="SG Support" className="imgtoWhite" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="section about-section pt-unset pt-unset-i" data-scroll-section>
        <div className="container small">
          {/* overlay gradient img */}
          <div className="overlay-img-parent why" ref={rotateImgTriggerWhyRef}>
            <div className="img-overlay-wrap" data-scroll="" data-scroll-speed="1.8" data-scroll-position="center">
              <img src={gradImg03} alt="Gravitas" ref={rotateImgElementWhyRef} />
            </div>
          </div>

          <div className="general-heading-wrapper general-border">
            <div className="subheader-wrapper text-center triggerElement">
              <h5 className="main-font-gradient">Why choose us</h5>
            </div>
            <div className="sub-description text-center triggerElement">
              <p className="big">We stay on the forefront of technological advancements, ensuring that our clients benefit from the latest innovations in the industry.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="section why-section pt-unset-i" data-scroll-section>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="general-heading-wrapper">
                <div className="sub-description mw-300 mw-full-m mw-full-i">
                  <h3 className="font-white">Why work with us</h3>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="cards-grid about triggerElement">
                <div className="cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <svg width="73" height="63" viewBox="0 0 73 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3.80909 24.493L27.0975 0.708374C29.1282 2.78585 30.2687 5.60137 30.2687 8.53684C30.2687 11.4723 29.1282 14.2878 27.0975 16.3653L11.0267 32.7785H33.591C36.4684 32.7785 39.228 33.9459 41.2627 36.0239C43.2974 38.102 44.4405 40.9204 44.4405 43.8591H11.4933C8.66452 43.8564 5.94867 42.7255 3.92453 40.7074C1.90039 38.6893 0.728031 35.9436 0.657314 33.0555C0.553628 31.4812 0.781267 29.9025 1.32492 28.4255C1.86857 26.9486 2.71562 25.6076 3.80909 24.493ZM72.34 29.9557C72.2693 27.0681 71.0973 24.3228 69.0737 22.3048C67.0502 20.2868 64.335 19.1555 61.5067 19.1521H28.5704C28.5704 22.0909 29.7134 24.9093 31.7481 26.9873C32.7556 28.0162 33.9516 28.8324 35.2679 29.3893C36.5843 29.9461 37.9951 30.2327 39.4199 30.2327H62.0709L45.9051 46.6459C43.8745 48.7234 42.734 51.5389 42.734 54.4744C42.734 57.4098 43.8745 60.2254 45.9051 62.3028L69.1963 38.5183C70.2888 37.4032 71.1346 36.062 71.6769 34.585C72.2191 33.108 72.4452 31.5295 72.34 29.9557Z"
                            stroke="#777777"
                            strokeWidth="0.8"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                      <div className="cards-title">
                        <h4>Results-Driven</h4>
                      </div>
                      <div className="cards-desc">
                        <p>Our solutions are designed to drive measurable improvements in your business performance.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <svg width="73" height="63" viewBox="0 0 73 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3.80909 24.493L27.0975 0.708374C29.1282 2.78585 30.2687 5.60137 30.2687 8.53684C30.2687 11.4723 29.1282 14.2878 27.0975 16.3653L11.0267 32.7785H33.591C36.4684 32.7785 39.228 33.9459 41.2627 36.0239C43.2974 38.102 44.4405 40.9204 44.4405 43.8591H11.4933C8.66452 43.8564 5.94867 42.7255 3.92453 40.7074C1.90039 38.6893 0.728031 35.9436 0.657314 33.0555C0.553628 31.4812 0.781267 29.9025 1.32492 28.4255C1.86857 26.9486 2.71562 25.6076 3.80909 24.493ZM72.34 29.9557C72.2693 27.0681 71.0973 24.3228 69.0737 22.3048C67.0502 20.2868 64.335 19.1555 61.5067 19.1521H28.5704C28.5704 22.0909 29.7134 24.9093 31.7481 26.9873C32.7556 28.0162 33.9516 28.8324 35.2679 29.3893C36.5843 29.9461 37.9951 30.2327 39.4199 30.2327H62.0709L45.9051 46.6459C43.8745 48.7234 42.734 51.5389 42.734 54.4744C42.734 57.4098 43.8745 60.2254 45.9051 62.3028L69.1963 38.5183C70.2888 37.4032 71.1346 36.062 71.6769 34.585C72.2191 33.108 72.4452 31.5295 72.34 29.9557Z"
                            stroke="#777777"
                            strokeWidth="0.8"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                      <div className="cards-title">
                        <h4>Dedicated Team</h4>
                      </div>
                      <div className="cards-desc">
                        <p>Our team is made up of experienced professionals who are passionate about technology and dedicated to your success.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <svg width="73" height="63" viewBox="0 0 73 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3.80909 24.493L27.0975 0.708374C29.1282 2.78585 30.2687 5.60137 30.2687 8.53684C30.2687 11.4723 29.1282 14.2878 27.0975 16.3653L11.0267 32.7785H33.591C36.4684 32.7785 39.228 33.9459 41.2627 36.0239C43.2974 38.102 44.4405 40.9204 44.4405 43.8591H11.4933C8.66452 43.8564 5.94867 42.7255 3.92453 40.7074C1.90039 38.6893 0.728031 35.9436 0.657314 33.0555C0.553628 31.4812 0.781267 29.9025 1.32492 28.4255C1.86857 26.9486 2.71562 25.6076 3.80909 24.493ZM72.34 29.9557C72.2693 27.0681 71.0973 24.3228 69.0737 22.3048C67.0502 20.2868 64.335 19.1555 61.5067 19.1521H28.5704C28.5704 22.0909 29.7134 24.9093 31.7481 26.9873C32.7556 28.0162 33.9516 28.8324 35.2679 29.3893C36.5843 29.9461 37.9951 30.2327 39.4199 30.2327H62.0709L45.9051 46.6459C43.8745 48.7234 42.734 51.5389 42.734 54.4744C42.734 57.4098 43.8745 60.2254 45.9051 62.3028L69.1963 38.5183C70.2888 37.4032 71.1346 36.062 71.6769 34.585C72.2191 33.108 72.4452 31.5295 72.34 29.9557Z"
                            stroke="#777777"
                            strokeWidth="0.8"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                      <div className="cards-title">
                        <h4>Cutting-Edge Solutions</h4>
                      </div>
                      <div className="cards-desc">
                        <p>We stay on the forefront of technological advancements, ensuring that our clients benefit from the latest innovations in the industry.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="section team-section pt-unset" data-scroll-section>
        <div className="container">
          <div className="general-heading-wrapper">
            <div className="subheader-wrapper text-center">
              <h5 className="main-font-gradient">Our team</h5>
            </div>
            <div className="sub-description mw-600 text-center mw-full-m mw-full-i">
              <h3 className="font-white">Meet the people that make it happen</h3>
            </div>
          </div>

          <div className="swiper-container team">
            <div className="swiper team" data-scroll="" data-scroll-direction="horizontal" data-scroll-speed="2" data-cursor-text="drag">
              <div className="swiper-wrapper">
                <div className="swiper-slide cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <img src={syafeeq} alt="Syafeeq Zaki" />
                      </div>
                      <div className="cards-title">
                        <h4>
                          <span className="big">Syafeeq</span> Zaki
                        </h4>
                      </div>
                      <div className="cards-desc">
                        <p>Chief Executive Officer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <img src={keyang} alt="Ke Yang" />
                      </div>
                      <div className="cards-title">
                        <h4>
                          <span className="big">Ke Yang</span> Yong
                        </h4>
                      </div>
                      <div className="cards-desc">
                        <p>Senior Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <img src={fitri} alt="Fitri Afiq" />
                      </div>
                      <div className="cards-title">
                        <h4>
                          <span className="big">Fitri</span> Afiq
                        </h4>
                      </div>
                      <div className="cards-desc">
                        <p>Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <img src={hanim} alt="Fatima Hanim" />
                      </div>
                      <div className="cards-title">
                        <h4>
                          <span className="big">Fatima</span> Hanim
                        </h4>
                      </div>
                      <div className="cards-desc">
                        <p>Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <img src={yasmeen} alt="Yasmeen" />
                      </div>
                      <div className="cards-title">
                        <h4>
                          <span className="big">Yasmeen</span> Zaipul
                        </h4>
                      </div>
                      <div className="cards-desc">
                        <p>Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <img src={nazri} alt="" />
                      </div>
                      <div className="cards-title">
                        <h4>
                          <span className="big">Nazri</span> Fuad
                        </h4>
                      </div>
                      <div className="cards-desc">
                        <p>Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <img src={james} alt="James" />
                      </div>
                      <div className="cards-title">
                        <h4>
                          <span className="big">James</span> Lee
                        </h4>
                      </div>
                      <div className="cards-desc">
                        <p>Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <img src={amalia} alt="Amalia" />
                      </div>
                      <div className="cards-title">
                        <h4>
                          <span className="big">Amalia</span> Natasha
                        </h4>
                      </div>
                      <div className="cards-desc">
                        <p>Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide cards-wrap">
                  <div className="card-link-wrapper">
                    <div className="cards-desc-wrap">
                      <div className="cards-image-wrap">
                        <img src={dayang} alt="Dayang" />
                      </div>
                      <div className="cards-title">
                        <h4>
                          <span className="big">Dayang</span> Zahira
                        </h4>
                      </div>
                      <div className="cards-desc">
                        <p>Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="section expertise-section" data-scroll-section>
        <div className="container">

          {/* gradient bg */}
          <div className="gradient-element-wrapper">
            <div className="gradient-element center-big"></div>
            <div className="grid-img">
              <img src={gridBg} alt="Gravitas Integrated" />
            </div>
          </div>

          {/* overlay gradient img */}
          <div className="overlay-img-parent expertise" ref={rotateImgTriggerExpertiseRef}>
            <div className="img-overlay-wrap" data-scroll="" data-scroll-speed="1.5" data-scroll-position="center">
              <img src={gradImg01} alt="Gravitas Integrated" ref={rotateImgElementExpertiseRef} />
            </div>
          </div>

          <div className="general-heading-wrapper">
            <div className="subheader-wrapper text-center">
              <h5 className="main-font-gradient">Expertise</h5>
            </div>
            <div className="sub-description text-center">
              <div className="top">
                <h3 className="font-white mb-unset">Our people are expert in</h3>
              </div>
              <div className="change-text-wrapper">
                <div className="change-text text-slide" ref={(el) => changeTextElementsRef.current.push(el)}>
                  <h3 className="font-white main-font-gradient"> Technology at the Heart </h3>
                </div>
                <div className="change-text text-slide" ref={(el) => changeTextElementsRef.current.push(el)}>
                  <h3 className="font-white main-font-gradient"> Industry Knowledge </h3>
                </div>
                <div className="change-text text-slide" ref={(el) => changeTextElementsRef.current.push(el)}>
                  <h3 className="font-white main-font-gradient"> Comprehensive Services </h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="portfolio" className="section portfolio-section" data-scroll-section>
        <div className="container">

          <div className="general-heading-wrapper">
            <div className="sub-description mw-600 text-center mw-full-m mw-full-i">
              <h3 className="font-white">Made by GBS</h3>
            </div>
          </div>

          <div className="cards-grid portfolio">

            <div className="cards-wrap pinned">
              <div className="card-link-wrapper">
                <div className="cards-desc-wrap">
                  <div className="row">
                    <div className="col-6">
                      <div className="cards-title">
                        <h4>Digital Product Design Solution</h4>
                      </div>
                      <div className="cards-desc">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                          the
                          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                          type
                          and
                          scrambled it to make a type specimen book.</p>
                      </div>
                      <div className="services-tag">
                        <div className="subheader-wrapper general-border third-border">
                          <h6>Product Design</h6>
                        </div>
                      </div>
                      <div className="flex-center flex-start btn">
                        <div className="default-btn secondary-btn m-hover">
                          <Link to="inner-portfolio.php" className="btn-link">
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
                          <img src={portfolioImg01} alt="Gravitas Integrated" />
                        </div>
                      </div>
                      <div className="cards-info-wrapper">
                        <div className="cards-info">
                          <h5>Usability</h5>
                          <p className="big">85%</p>
                        </div>
                        <div className="cards-info">
                          <h5>User Retention</h5>
                          <p className="big">70%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cards-wrap pinned">
              <div className="card-link-wrapper">
                <div className="cards-desc-wrap">
                  <div className="row">
                    <div className="col-6">
                      <div className="cards-title">
                        <h4>Félix Péault – Portfolio</h4>
                      </div>
                      <div className="cards-desc">
                        <p>Portfolio of Félix Péault, Freelance Senior Digital Designer and Art Director working worldwide
                          and pushing boundaries of conceptual and innovative digital design.</p>
                      </div>
                      <div className="services-tag">
                        <div className="subheader-wrapper general-border third-border">
                          <h6>Animation 3D</h6>
                        </div>
                        <div className="subheader-wrapper general-border third-border">
                          <h6>Web Design</h6>
                        </div>
                      </div>
                      <div className="flex-center flex-start btn">
                        <div className="default-btn secondary-btn m-hover">
                          <Link to="inner-portfolio.php" className="btn-link">
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
                          <img src={portfolioImg03} alt="Gravitas Integrated" />
                        </div>
                      </div>
                      <div className="cards-info-wrapper">
                        <div className="cards-info">
                          <h5>Usability</h5>
                          <p className="big">85%</p>
                        </div>
                        <div className="cards-info">
                          <h5>User Retention</h5>
                          <p className="big">70%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cards-wrap pinned">
              <div className="card-link-wrapper">
                <div className="cards-desc-wrap">
                  <div className="row">
                    <div className="col-6">
                      <div className="cards-title">
                        <h4>Bitbo - Bitcoin Stats & Data</h4>
                      </div>
                      <div className="cards-desc">
                        <p>Leading Bitcoin Data and Stats site. Live price action, monitor on-chain data, and track key
                          economic indicators.</p>
                      </div>
                      <div className="services-tag">
                        <div className="subheader-wrapper general-border third-border">
                          <h6>Branding</h6>
                        </div>
                        <div className="subheader-wrapper general-border third-border">
                          <h6>Web Design</h6>
                        </div>
                      </div>
                      <div className="flex-center flex-start btn">
                        <div className="default-btn secondary-btn m-hover">
                          <Link to="inner-portfolio.php" className="btn-link">
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
                          <img src={portfolioImg02} alt="Gravitas Integrated" />
                        </div>
                      </div>
                      <div className="cards-info-wrapper">
                        <div className="cards-info">
                          <h5>Usability</h5>
                          <p className="big">85%</p>
                        </div>
                        <div className="cards-info">
                          <h5>User Retention</h5>
                          <p className="big">70%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cards-wrap pinned">
              <div className="card-link-wrapper">
                <div className="cards-desc-wrap">
                  <div className="row">
                    <div className="col-6">
                      <div className="cards-title">
                        <h4>Félix Péault – Portfolio</h4>
                      </div>
                      <div className="cards-desc">
                        <p>Portfolio of Félix Péault, Freelance Senior Digital Designer and Art Director working worldwide
                          and pushing boundaries of conceptual and innovative digital design.</p>
                      </div>
                      <div className="services-tag">
                        <div className="subheader-wrapper general-border third-border">
                          <h6>Animation 3D</h6>
                        </div>
                        <div className="subheader-wrapper general-border third-border">
                          <h6>Web Design</h6>
                        </div>
                      </div>
                      <div className="flex-center flex-start btn">
                        <div className="default-btn secondary-btn m-hover">
                          <Link to="inner-portfolio.php" className="btn-link">
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
                          <img src={portfolioImg03} alt="Gravitas Integrated" />
                        </div>
                      </div>
                      <div className="cards-info-wrapper">
                        <div className="cards-info">
                          <h5>Usability</h5>
                          <p className="big">85%</p>
                        </div>
                        <div className="cards-info">
                          <h5>User Retention</h5>
                          <p className="big">70%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section id="faqs" className="section faqs-section" data-scroll-section>
        <div className="container">

          {/* overlay gradient img */}
          <div className="overlay-img-parent faqs" ref={rotateImgTriggerFaqsRef}>
            <div className="img-overlay-wrap" data-scroll="" data-scroll-speed="1.5" data-scroll-position="center">
              <img src={gradImg02} alt="Gravitas Integrated" ref={rotateImgElementFaqsRef} />
            </div>
          </div>

          <div className="general-heading-wrapper">
            <div className="sub-description mw-600 text-center mw-full-m mw-full-i">
              <h3 className="font-white">FAQs</h3>
            </div>
          </div>

          <div className="tabs-link-wrap">

            <div className="desktop-tabs">
              <div className="tabs-link">

                <div className="tabLinks active">
                  <div className="tabs-link-item">
                    <p>Pricing</p>
                  </div>
                </div>

                <div className="tabLinks">
                  <div className="tabs-link-item">
                    <p>Starting a project</p>
                  </div>
                </div>

                <div className="tabLinks">
                  <div className="tabs-link-item">
                    <p>Design</p>
                  </div>
                </div>

                <div className="tabLinks">
                  <div className="tabs-link-item">
                    <p>Development</p>
                  </div>
                </div>


              </div>
            </div>
          </div>


          {/* tab content */}
          <div className="tab-wrapper tabs-result-wrapper triggerElement">

            {/* pricing */}
            <div className="tabContent active" id="pricingTab">
              <div className="accordion-wrapper" id="pricingAccordion">

                <div className="accordion-item active">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">What size budgets do you typically work with?</h5>
                  <div className="accordion-bottom">
                    <p>We typically work with clients within the following project brackets: </p>
                    <ul className="custom-point grey">
                      <li>RM2-5k</li>
                      <li>RM5-10k</li>
                      <li>RM10-20k</li>
                      <li>RM25k+</li>
                    </ul>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">How do I figure out how much your services will cost?</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">What are the payment terms for a typical project?</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">How much does hosting cost?</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">Retainer pricing</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

              </div>
            </div>

            {/* starting a project */}
            <div className="tabContent" id="startProjectTab">
              <div className="accordion-wrapper" id="startingProjectAccordion">

                <div className="accordion-item active">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">What size budgets do you typically work with?</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">How do I figure out how much your services will cost?</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

              </div>
            </div>

            {/* design */}
            <div className="tabContent" id="designTab">
              <div className="accordion-wrapper" id="designAccordion">

                <div className="accordion-item active">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">What size budgets do you typically work with?</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">How do I figure out how much your services will cost?</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

              </div>
            </div>

            {/* development */}
            <div className="tabContent" id="developmentTab">
              <div className="accordion-wrapper" id="developmentAccordion">

                <div className="accordion-item active">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">What size budgets do you typically work with?</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="input-wrap">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label>Select</label>
                  </div>
                  <h5 className="accordion-top">How do I figure out how much your services will cost?</h5>
                  <div className="accordion-bottom">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatismolestias culpa in,
                      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                      consequuntur distinctio corporis earum similique!</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      <section id="contact" className="section contact-section dark-theme no-padding" data-scroll-section>
        <div className="container">

          <div className="general-heading-wrapper">
            <div className="sub-description mw-600 mw-full-m mw-full-i">
              <h3 className="font-white">Let’s talk about you</h3>
            </div>
          </div>

          <div className="row contact-row triggerElement">
            <div className="col-4">
              <h4><span className="main-font-gradient">Free</span> consultation</h4>
              <p className="font-grey">Have a new project in mind? Schedule a 30-minute discovery call or fill out the quick
                form, and together we'll explore the possibilities.</p>
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

      {/* footer */}
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
                      <p>D-01-01, Menara Mitraland No, 13A, <br /> 
                      Jalan PJU 5/1, Kota Damansara, <br />
                      47810 Petaling Jaya, Selangor</p>
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
                <p className="small">© <script>
                  document.write(new Date().getFullYear())
                  </script> Gravitas Integrated. All Rights Reserved.</p>
              </div>
              <div className="col-6 no-padding">
                <div className="footer-socials-wrapper">
                  <div className="footer-socials-img">
                    <Link to="/" className="m-hover">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.9999 18.6666C15.2376 18.6666 16.4246 18.1749 17.2998 17.2998C18.1749 16.4246 18.6666 15.2376 18.6666 13.9999C18.6666 12.7622 18.1749 11.5753 17.2998 10.7001C16.4246 9.82492 15.2376 9.33325 13.9999 9.33325C12.7622 9.33325 11.5753 9.82492 10.7001 10.7001C9.82492 11.5753 9.33325 12.7622 9.33325 13.9999C9.33325 15.2376 9.82492 16.4246 10.7001 17.2998C11.5753 18.1749 12.7622 18.6666 13.9999 18.6666Z"
                          stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                          d="M3.5 18.6667V9.33333C3.5 7.78624 4.11458 6.30251 5.20854 5.20854C6.30251 4.11458 7.78624 3.5 9.33333 3.5H18.6667C20.2138 3.5 21.6975 4.11458 22.7915 5.20854C23.8854 6.30251 24.5 7.78624 24.5 9.33333V18.6667C24.5 20.2138 23.8854 21.6975 22.7915 22.7915C21.6975 23.8854 20.2138 24.5 18.6667 24.5H9.33333C7.78624 24.5 6.30251 23.8854 5.20854 22.7915C4.11458 21.6975 3.5 20.2138 3.5 18.6667Z"
                          stroke="white" strokeWidth="1.25" />
                        <path d="M20.4167 7.59557L20.4288 7.58228" stroke="white" strokeWidth="1.25" strokeLinecap="round"
                          strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                  <div className="footer-socials-img">
                    <Link to="/" className="m-hover">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_42_1218)">
                          <path
                            d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166L20.447 20.452ZM5.337 7.433C5.06588 7.43313 4.79739 7.37979 4.54691 7.27604C4.29642 7.17229 4.06886 7.02015 3.87724 6.82835C3.68562 6.63654 3.5337 6.40883 3.43019 6.15825C3.32668 5.90766 3.27361 5.63912 3.274 5.368C3.2742 4.95978 3.39544 4.56078 3.6224 4.22147C3.84936 3.88216 4.17184 3.61777 4.54907 3.46173C4.92629 3.30569 5.34131 3.26502 5.74165 3.34485C6.14198 3.42469 6.50966 3.62144 6.79817 3.91024C7.08669 4.19903 7.28309 4.5669 7.36254 4.96731C7.44198 5.36773 7.40091 5.78271 7.2445 6.15978C7.0881 6.53685 6.8234 6.85908 6.48387 7.08571C6.14433 7.31234 5.74522 7.4332 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z"
                            fill="white" />
                        </g>
                        <defs>
                          <clipPath id="clip0_42_1218">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
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

export default Homepage;
