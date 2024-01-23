import { useEffect, useState, useRef } from "react";
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

// components
import Accordion from "../../components/Accordion/Accordion";
import Footer from "../../components/Footer/Footer";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import SwiperTeam from "../../components/Swiper/SwiperTeam";
import FeatureCard from "../../components/FeatureCard/FeatureCard";

const Homepage = () => {
  gsap.registerPlugin(ScrollTrigger);

  // SMOOTH SCROLLING
  const locoScrollRef = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    locoScrollRef.current = new LoconativeScroll({
      el: document.querySelector("[data-scroll-container]"),
      scrollToEasing: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),
      smooth: true,
      duration: 0.95,
    });

    // Set up smooth scrolling
    locoScrollRef.current.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Handle window resize
    const handleResize = () => {
      locoScrollRef.current.update();
      ScrollTrigger.update();
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Refresh ScrollTrigger and update LoconativeScroll after setup
    ScrollTrigger.addEventListener("refresh", () => {
      locoScrollRef.current.update();
    });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      locoScrollRef.current.destroy();
    };
  }, []);

  // Initial ScrollTrigger refresh
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

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
          repeatDelay: (targets.length - 1) * (animationConfig.duration + animationConfig.holdTime) - animationConfig.duration,
          defaults: {
            ease: "power4.inOut",
            duration: animationConfig.duration,
          },
        });

        timeline.fromTo(
          target,
          { autoAlpha: 0 }, // from
          { autoAlpha: 1, onStart: () => target.classList.add("active") } // to
        );
        timeline.to(
          target,
          {
            autoAlpha: 0,
            onComplete: () => target.classList.remove("active"),
          },
          `+=${animationConfig.holdTime}`
        );
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
          duration: 30,
        }),
        scroll = ScrollTrigger.create({
          trigger: document.querySelector(".marquee-wrapper .marquee-inner-wrapper"),
          onUpdate(self) {
            if (self.direction !== direction) {
              direction *= -1;
              gsap.to([roll1], {
                timeScale: direction,
                overwrite: true,
              });
            }
            self.direction === -1 ? document.querySelector(".marquee-wrapper").classList.remove("flipped") : document.querySelector(".marquee-wrapper").classList.add("flipped");
          },
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
          },
        });
        const elements = Array.from(document.querySelectorAll(targets));
        const clones = elements.map((el) => {
          let clone = el.cloneNode(true);
          el.parentNode.appendChild(clone);
          return clone;
        });
        const positionClones = () =>
          elements.forEach((el, i) =>
            gsap.set(clones[i], {
              position: "absolute",
              overwrite: false,
              top: el.offsetTop,
              left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth),
            })
          );
        positionClones();
        elements.forEach((el, i) =>
          tl.to(
            [el, clones[i]],
            {
              xPercent: reverse ? 100 : -100,
              ...vars,
            },
            0
          )
        );
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
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", initMarquee);
    };
  }, []); // runs once after the initial render

  // TEAM SECTION
  // team data info
  const teamMembers = [
    { firstName: 'Syafeeq', secName: 'Zaki', position: 'Chief Executive Officer', image: syafeeq },
    { firstName: 'Ke Yang', secName: 'Yong', position: 'Senior Developer', image: keyang },
    { firstName: 'Fitri', secName: 'Afiq', position: 'Web Developer', image: fitri },
    { firstName: 'Fatima', secName: 'Hanim', position: 'Web Developer', image: hanim },
    { firstName: 'Yasmeen', secName: 'Zaipul', position: 'Web Developer', image: yasmeen },
    { firstName: 'Nazri', secName: 'Fuad', position: 'Web Developer', image: nazri },
    { firstName: 'James', secName: 'Lee', position: 'Web Developer', image: james },
    { firstName: 'Amalia', secName: 'Natasha', position: 'Web Developer', image: amalia },
    { firstName: 'Dayang', secName: 'Zahira', position: 'Web Developer', image: dayang },
    
  ];
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
  // { TO REVISE LATER }
  const changeTextElementsRef = useRef([]);
  let currentIndex = 0;
  let intervalTime = 4000; // Initial interval time in milliseconds
  const minIntervalTime = 2000; // Minimum interval time in milliseconds

  useEffect(() => {
    const changeTextElements = document.querySelectorAll(".expertise-section .text-slide");
    changeTextElementsRef.current = Array.from(changeTextElements);

    function changeText() {
      // Remove the 'active' class from all elements
      changeTextElementsRef.current.forEach((element) => {
        element.classList.remove("active");
      });

      // Add the 'active' class to the current element
      changeTextElementsRef.current[currentIndex].classList.add("active");

      // Increment the index or reset to 0 if it reaches the end
      currentIndex = (currentIndex + 1) % changeTextElementsRef.current.length;

      // Adjust the interval time when reaching the end
      if (currentIndex === 0) {
        intervalTime = Math.max(minIntervalTime, intervalTime - 100); // Decrease interval time (min 500 milliseconds)
      }

      // Call the function recursively with a delay
      setTimeout(changeText, intervalTime);
    }

    // Start the text change
    changeText();

    // Clear the interval when the component unmounts
    return () => {
      clearTimeout(changeText);
    };
  }, []);

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
          amount: 0.05,
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
            end: index < cardsPinned.length - 1 ? `bottom top+=${800 + cardsPinned.length * pinningSpacer}` : `bottom-=${index * pinningSpacer} top+=${800 + cardsPinned.length * pinningSpacer}`,
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
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []); // runs once after the initial render

  // FAQS SECTION
  // ACCORDION
  // tabs
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(1);

  // Handle tab click
  const handleTabClick = (tabNumber, e) => {
    e.preventDefault();
    setActiveTab(tabNumber);
  };

  // Content for each tab
  const pricingAccordionData = [
    {
      question: "What size budgets do you typically work with?",
      answer: (
        <div>
          <p>We typically work with clients within the following project brackets: </p>
          <ul className="custom-point grey">
            <li>RM2-5k</li>
            <li>RM5-10k</li>
            <li>RM10-20k</li>
            <li>RM25k+</li>
          </ul>
        </div>
      ),
    },
    {
      question: "How do I figure out how much your services will cost?",
      answer: (
        <div>
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit... </p>
        </div>
      ),
    },
    {
      question: "What are the payment terms for a typical project?",
      answer: (
        <div>
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit... </p>
        </div>
      ),
    },
    {
      question: "How much does hosting cost?",
      answer: (
        <div>
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit... </p>
        </div>
      ),
    },
    {
      question: "Retainer pricing",
      answer: (
        <div>
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit... </p>
        </div>
      ),
    },
  ];

  const startProjectAccordionData = [
    {
      question: "What size budgets do you typically work with?",
      answer: (
        <div>
          <p>We typically work with clients within the following project brackets: </p>
          <ul className="custom-point grey">
            <li>RM2-5k</li>
            <li>RM5-10k</li>
            <li>RM10-20k</li>
            <li>RM25k+</li>
          </ul>
        </div>
      ),
    },
    {
      question: "How do I figure out how much your services will cost?",
      answer: (
        <div>
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit... </p>
        </div>
      ),
    },
  ];

  const developmentAccordionData = [
    {
      question: "What size budgets do you typically work with?",
      answer: (
        <div>
          <p>We typically work with clients within the following project brackets: </p>
          <ul className="custom-point grey">
            <li>RM2-5k</li>
            <li>RM5-10k</li>
            <li>RM10-20k</li>
            <li>RM25k+</li>
          </ul>
        </div>
      ),
    },
    {
      question: "How do I figure out how much your services will cost?",
      answer: (
        <div>
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit... </p>
        </div>
      ),
    },
  ];

  const designAccordionData = [
    {
      question: "What size budgets do you typically work with?",
      answer: (
        <div>
          <p>We typically work with clients within the following project brackets: </p>
          <ul className="custom-point grey">
            <li>RM2-5k</li>
            <li>RM5-10k</li>
            <li>RM10-20k</li>
            <li>RM25k+</li>
          </ul>
        </div>
      ),
    },
    {
      question: "How do I figure out how much your services will cost?",
      answer: (
        <div>
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit... </p>
        </div>
      ),
    },
  ];

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
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []); // runs once after the initial render

  return (
    <>
      <section id="hero" className="section hero-banner full-height" data-scroll-section>
        <div className="container">
          {/* <div className="video-overlay">
            <video playsInline autoPlay loop muted>
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div> */}

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
                
                <FeatureCard title="Results-Driven" description="Our solutions are designed to drive measurable improvements in your business performance." />
                <FeatureCard title="Dedicated Team" description="Our team is made up of experienced professionals who are passionate about technology and dedicated to your success." />
                <FeatureCard title="Cutting-Edge Solutions" description="We stay on the forefront of technological advancements, ensuring that our clients benefit from the latest innovations in the industry." />
                
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
                {teamMembers.map((member, index) => (
                  <SwiperTeam key={index} {...member} />
                ))}
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
                <div className="change-text text-slide">
                  <h3 className="font-white main-font-gradient"> Technology at the Heart </h3>
                </div>
                <div className="change-text text-slide">
                  <h3 className="font-white main-font-gradient"> Industry Knowledge </h3>
                </div>
                <div className="change-text text-slide">
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

            <PortfolioCard
              title="Digital Product Design Solution"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book."
              tags={["Product Design"]}
              imageUrl={portfolioImg01}
              linkTo="/inner-portfolio"
              usability={85}
              userRetention={70}
            />

            <PortfolioCard
              title="Félix Péault – Portfolio"
              description="Portfolio of Félix Péault, Freelance Senior Digital Designer and Art Director working worldwide
              and pushing boundaries of conceptual and innovative digital design."
              tags={["Animation 3D", "Web Design"]}
              imageUrl={portfolioImg03}
              linkTo="/inner-portfolio"
              usability={90}
              userRetention={80}
            />

            <PortfolioCard
              title="Félix Péault – Portfolio"
              description="Leading Bitcoin Data and Stats site. Live price action, monitor on-chain data, and track key economic indicators."
              tags={['Branding', 'Web Design']}
              imageUrl={portfolioImg02}
              linkTo="/inner-portfolio"
              usability={75}
              userRetention={60}
            />

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
                <div className="tabs-link">
                  {[1, 2, 3, 4].map((tabNumber) => (
                    <div key={tabNumber} className={`tabLinks ${activeTab === tabNumber ? "active" : ""}`} onClick={(e) => handleTabClick(tabNumber, e)}>
                      <div className="tabs-link-item">
                        <p>
                          {tabNumber === 1 && "Pricing"}
                          {tabNumber === 2 && "Starting a project"}
                          {tabNumber === 3 && "Design"}
                          {tabNumber === 4 && "Development"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* tab content */}
          <div className="tab-wrapper tabs-result-wrapper triggerElement active">
            {activeTab === 1 && <Accordion data={pricingAccordionData} accordionId="pricingAccordion" />}
            {activeTab === 2 && <Accordion data={startProjectAccordionData} accordionId="startProjectAccordion" />}
            {activeTab === 3 && <Accordion data={developmentAccordionData} accordionId="developmentAccordion" />}
            {activeTab === 4 && <Accordion data={designAccordionData} accordionId="designAccordion" />}
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

      {/* footer */}
      <Footer />
    </>
  );
};

export default Homepage;
