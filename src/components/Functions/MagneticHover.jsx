import { useState, useRef } from "react";
import { TweenMax, Power2, Elastic } from "gsap";

const MagneticHover = ({ children }) => {
  const magneticHoverRef = useRef(null);
  const [hover, setHover] = useState(false);

  const onHover = (x, y) => {
    TweenMax.to(magneticHoverRef.current, 0.4, {
      x: x * 0.3,
      y: y * 0.6,
      rotation: x * 0.02,
      ease: Power2.easeOut,
    });
  };

  const onLeave = () => {
    TweenMax.to(magneticHoverRef.current, 0.7, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      ease: Elastic.easeOut.config(1.2, 0.4),
    });
  };

  const handleHover = (e) => {
    const $self = magneticHoverRef.current;
    const offsetHoverMax = parseFloat($self.getAttribute("offset-hover-max")) || 0.8;
    const offsetHoverMin = parseFloat($self.getAttribute("offset-hover-min")) || 0.3;

    const hoverArea = hover ? offsetHoverMax : offsetHoverMin;
    const cursor = { x: e.clientX, y: e.clientY };
    const width = $self.offsetWidth;
    const height = $self.offsetHeight;
    const offset = $self.getBoundingClientRect();
    const elPos = { x: offset.left + width / 2, y: offset.top + height / 2 };
    const x = cursor.x - elPos.x;
    const y = cursor.y - elPos.y;
    const dist = Math.sqrt(x * x + y * y);

    // indicate whether the mouse is currently within the specified hover area -- only active when hovering
    if (dist < width * hoverArea) {
      setHover(true);
      onHover(x, y);
    } else if (hover) {
      setHover(false);
      onLeave();
    }
  };

  return (
    <>
      <div
        className="m-hover"
        ref={magneticHoverRef}
        onMouseMove={handleHover}
        onMouseLeave={() => {
          setHover(false);
          onLeave();
        }}
      >
        {children}
      </div>
    </>
  );
};

export default MagneticHover;
