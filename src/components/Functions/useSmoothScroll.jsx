import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoconativeScroll from "loconative-scroll";

const useSmoothScroll = () => {
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

  return locoScrollRef.current;
};

export default useSmoothScroll;
