import { useEffect } from 'react';
import { TweenMax, Power2, Elastic } from 'gsap';

function useMagneticHover({ offsetHoverMax = 0.8, offsetHoverMin = 0.3 }) {
  useEffect(() => {
    const magneticHover = document.querySelectorAll('.m-hover');
    

    const attachEventsListener = () => {
      window.addEventListener('mousemove', (e) => {
        magneticHover.forEach((el) => {
          const hoverArea = el.hover ? offsetHoverMax : offsetHoverMin;

          const cursor = { x: e.clientX, y: e.pageY };

          const width = el.offsetWidth;
          const height = el.offsetHeight;

          const offset = el.getBoundingClientRect();
          const elPos = { x: offset.left + width / 2, y: offset.top + height / 2 };

          const x = cursor.x - elPos.x;
          const y = cursor.y - elPos.y;

          const dist = Math.sqrt(x * x + y * y);

          let mutHover = false;

          if (dist < width * hoverArea) {
            mutHover = true;
            if (!el.hover) {
              el.hover = true;
            }
            onHover(el, x, y);
          }

          if (!mutHover && el.hover) {
            onLeave(el);
            el.hover = false;
          }
        });
      });
    };

    const onHover = (el, x, y) => {
      console.log('Hovering');
      TweenMax.to(el, 0.4, {
        x: x * 0.3,
        y: y * 0.3,
        rotation: x * 0.02,
        ease: Power2.easeOut,
      });
    };

    const onLeave = (el) => {
      console.log('Leaving');
      TweenMax.to(el, 0.7, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        ease: Elastic.easeOut.config(1.2, 0.4),
      });
    };

    attachEventsListener();

    return () => {
      window.removeEventListener('mousemove', attachEventsListener);
    };
  }, []);

  return null; // No need to render anything, as it's purely for side effects
}

export default useMagneticHover;
