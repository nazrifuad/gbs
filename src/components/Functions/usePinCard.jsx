import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const usePinCard = () => {
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
};

export default usePinCard;
