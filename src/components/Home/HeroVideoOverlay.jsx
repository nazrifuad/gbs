import { useEffect } from "react";
import HeroVideo from "../../assets/img/hero-video-overlay.mp4";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function HeroVideoOverlay() {
    useEffect(() => {
        // Register the ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        const heroAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-banner",
                start: "top top",
                end: "bottom center",
                scrub: 2,
                markers: false,
            },
        });

        heroAnimation.to(".video-overlay", { scale: 4, opacity: 0 });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <div className="video-overlay">
            <video playsInline autoPlay loop muted>
                <source src={HeroVideo} type="video/mp4" />
            </video>
        </div>
    );
}
