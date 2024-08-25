import React, { useEffect, useRef, useState } from "react";
import { fetchAPI } from "../../utils/fetchData";
import Accordion from "../Accordion/Accordion";
import gradImg02 from "../../assets/img/gradient-element-02.png";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import { Faq } from "../../types";

export default function FaqSection() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        fetchData();
        console.log("hello");
    }, [isMounted]);

    function fetchData() {
        fetchAPI(`/faqs`).then((data) => {
            setFaqs(data.data);
        });
    }

    const rotateImgTriggerFaqsRef = useRef(null);
    const rotateImgElementFaqsRef = useRef(null);

    useEffect(() => {
        const initParallaxImage = () => {
            if (window.innerWidth > 1024) {
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

        initParallaxImage();

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <>
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

                    {/* Tab Links */}
                    {faqs.length > 0 && (
                        <div className="tabs-link-wrap">
                            <div className="desktop-tabs">
                                <div className="tabs-link">
                                    <div className="tabs-link">
                                        {faqs.map((faq: Faq, index: any) => (
                                            <div
                                                key={`tab-${index}`}
                                                className={`tabLinks ${currentTab === index ? "active" : ""}`}
                                                onClick={() => setCurrentTab(index)}
                                            >
                                                <div className="tabs-link-item">
                                                    <p>{faq.attributes.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab Content */}
                    <div className="tab-wrapper tabs-result-wrapper triggerElement">
                        {faqs.map((faq: Faq, index: any) => (
                            <React.Fragment key={`faq-content-${index}`}>
                                {currentTab === index && <Accordion data={faq.attributes.content} accordionId={`faqAccordion-${index}`} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
