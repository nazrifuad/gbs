import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroVideo from "../../assets/img/hero-video-overlay.mp4";

import bluesharkLogo from "../../assets/img/BLUESHARK.png";
import fxcLogo from "../../assets/img/fXC.png";
import mesraLogo from "../../assets/img/MESRA.png";
import prudentialLogo from "../../assets/img/PRUDENTIAL.png";
import pulseLogo from "../../assets/img/PULSE.png";
import sgsupportLogo from "../../assets/img/SG SUPPORT.png";
import gradImg03 from "../../assets/img/gradient-element-03.png";

import gridBg from "../../assets/img/grid-bg.png";
import gradImg01 from "../../assets/img/gradient-element-01.png";
// import gradImg02 from "../../assets/img/gradient-element-02.png";

// components
import TeamSlider from "../../components/Swiper/TeamSlider";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import Contact from "../../components/Contact/Contact";
import CardStack from "../../components/Portfolio/cardStack";
import FaqSection from "../../components/Faq/faqSection";

import HeroBannerText from "../../components/Home/HeroBannerText.tsx";
import HeroVideoOverlay from "../../components/Home/HeroVideoOverlay.jsx";

const Homepage = () => {
    gsap.registerPlugin(ScrollTrigger);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                        self.direction === -1
                            ? document.querySelector(".marquee-wrapper").classList.remove("flipped")
                            : document.querySelector(".marquee-wrapper").classList.add("flipped");
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
                        }),
                    );
                positionClones();
                elements.forEach((el, i) =>
                    tl.to(
                        [el, clones[i]],
                        {
                            xPercent: reverse ? 100 : -100,
                            ...vars,
                        },
                        0,
                    ),
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

    // EXPERTISE SECTION
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

    // PARALLAX FOR GRADIENT IMAGES
    const rotateImgTriggerWhyRef = useRef(null);
    const rotateImgElementWhyRef = useRef(null);

    const rotateImgTriggerExpertiseRef = useRef(null);
    const rotateImgElementExpertiseRef = useRef(null);

    useEffect(() => {
        if (isMounted) {
            const initParallaxImage = () => {
                if (window.innerWidth > 1024) {
                    // Why
                    const rotateElementWhy = gsap.timeline({
                        scrollTrigger: {
                            scrub: 1.2,
                            trigger: rotateImgTriggerWhyRef.current,
                            start: "top bottom",
                            endTrigger: rotateImgTriggerWhyRef.current,
                            end: "bottom top",
                        },
                    });

                    rotateElementWhy.to(rotateImgElementWhyRef.current, {
                        rotateZ: 100,
                        yPercent: 100,
                    });

                    // Expertise
                    const rotateElementExpertise = gsap.timeline({
                        scrollTrigger: {
                            scrub: 1.2,
                            trigger: rotateImgTriggerExpertiseRef.current,
                            start: "top bottom",
                            endTrigger: rotateImgTriggerExpertiseRef.current,
                            end: "bottom top",
                        },
                    });

                    rotateElementExpertise.to(rotateImgElementExpertiseRef.current, {
                        rotateZ: 100,
                        yPercent: 100,
                    });
                }
            };

            // Call the function to initialize parallax images
            initParallaxImage();

            // Clean up when the component unmounts
            return () => {
                ScrollTrigger.getAll().forEach((st) => st.kill());
            };
        }
    }, [isMounted]); // runs once after the initial render

    return (
        <>
            <section id="hero" className="section hero-banner full-height" data-scroll-section>
                <div className="container">
                    <HeroVideoOverlay />
                    <HeroBannerText />

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

            <section id="about-us" className="section about-section" data-scroll-section>
                <div className="subsection trusted-section">
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
                </div>

                <div className="subsection why-choose-section pt-unset pt-unset-i">
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
                                <p className="big">
                                    We stay on the forefront of technological advancements, ensuring that our clients benefit from the latest innovations in the
                                    industry.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="subsection why-work-section pt-unset-i">
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
                                    <FeatureCard
                                        title="Results-Driven"
                                        description="Our solutions are designed to drive measurable improvements in your business performance."
                                    />
                                    <FeatureCard
                                        title="Dedicated Team"
                                        description="Our team is made up of experienced professionals who are passionate about technology and dedicated to your success."
                                    />
                                    <FeatureCard
                                        title="Cutting-Edge Solutions"
                                        description="We stay on the forefront of technological advancements, ensuring that our clients benefit from the latest innovations in the industry."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Team Section */}
                <TeamSlider />

                <div className="subsection expertise-section">
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
                                    {["Technology at the Heart", "Industry Knowledge", "Comprehensive Services"].map((text, index) => (
                                        <div className="change-text text-slide" key={index}>
                                            <h3 className="font-white main-font-gradient">{text}</h3>
                                        </div>
                                    ))}
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

                    <CardStack />
                </div>
            </section>

            {/* faq */}
            <FaqSection />

            {/* contact */}
            <Contact />
        </>
    );
};

export default Homepage;
