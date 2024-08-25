import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function HeroBannerText() {
    const targetsRef = useRef<any>([]);
    const [isMounted, setIsMounted] = useState(false);

    const words = ["Ideas", "Goals", "Purpose", "Vision", "Dreams"];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            initChangeTextHero();
        }
    }, [isMounted]);

    const initChangeTextHero = () => {
        const targets = targetsRef.current;
        gsap.set(targets, {
            autoAlpha: 0,
        });

        const animationConfig = {
            duration: 0.5,
            holdTime: 2.8,
        };

        targets.forEach((target: any, index: number) => {
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
                { autoAlpha: 1, onStart: () => target.classList.add("active") }, // to
            );
            timeline.to(
                target,
                {
                    autoAlpha: 0,
                    onComplete: () => target.classList.remove("active"),
                },
                `+=${animationConfig.holdTime}`,
            );
        });
    };

    return (
        <>
            {isMounted && (
                <div className="hero-title-wrap hero-title-reveal mw-full-m mw-full-i text-center">
                    <div className="hero-title change-text-wrapper-hero">
                        <div className="change-text-wrapper-item">
                            {words.map((word, index) => {
                                return (
                                    <div className="hero-change-block text-slide" ref={(el: any) => targetsRef.current.push(el)} key={index}>
                                        <h1 className="font-white">
                                            <span className="change-text-hero">{word}</span>
                                        </h1>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="hero-title-below">
                        <h1 className="font-white">
                            Into <span className="main-font-gradient"> Realities</span>
                        </h1>
                    </div>
                    <div className="hero-desc">
                        <p className="big font-grey">Your Future, Powered by GBS Technology</p>
                    </div>
                </div>
            )}
        </>
    );
}
