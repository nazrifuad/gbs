import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoconativeScroll from "loconative-scroll";


const useSmoothScroll = () => {
  gsap.registerPlugin(ScrollTrigger);

  const locoScrollRef = useRef(null);

  useEffect(() => {
    locoScrollRef.current = new LoconativeScroll({
      el: document.querySelector("[data-scroll-container]"),
      scrollToEasing: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),
      smooth: true,
      duration: 0.65,
    });

    locoScrollRef.current.on("scroll", () => {
      ScrollTrigger.update();
    });

    const handleResize = () => {
      locoScrollRef.current.update();
      ScrollTrigger.update();
    };

    window.addEventListener("resize", handleResize);

    ScrollTrigger.addEventListener("refresh", () => {
      locoScrollRef.current.update();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      locoScrollRef.current.destroy();
    };
  }, []);

  const disableSmoothScroll = () => {
    locoScrollRef.current.stop();
  };

  const enableSmoothScroll = () => {
    locoScrollRef.current.start();
  };

  const stopSmoothScroll = () => {
    locoScrollRef.current.destroy();
  };

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return { locoScroll: locoScrollRef.current, disableSmoothScroll, enableSmoothScroll, stopSmoothScroll };
};

export default useSmoothScroll;

