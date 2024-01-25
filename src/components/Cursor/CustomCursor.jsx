import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const [posXBtn, setPosXBtn] = useState(0);
  const [posYBtn, setPosYBtn] = useState(0);
  const [posXImage, setPosXImage] = useState(0);
  const [posYImage, setPosYImage] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMovement = (e) => {
      // console.log("Mouse moved:", e.clientX, e.clientY);
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMovement);

    return () => {
      window.removeEventListener("mousemove", handleMouseMovement);
    };
  }, []);

  useEffect(() => {
    if (document.querySelector(".custom-cursor")) {
      const animation = gsap.to({}, 0.0083333333, {
        repeat: -1,
        onRepeat: function () {
          // console.log("Animation frame");
          // console.log("Current positions:", posXBtn, posYBtn, posXImage, posYImage);
          if (document.querySelector(".custom-cursor")) {
            setPosXBtn((prevPosXBtn) => prevPosXBtn + (mouseX - prevPosXBtn) / 5);
            setPosYBtn((prevPosYBtn) => prevPosYBtn + (mouseY - prevPosYBtn) / 5);
            gsap.set(document.querySelector(".custom-cursor"), {
              css: {
                left: posXBtn,
                top: posYBtn,
              },
            });
          }
        },
      });

      return () => {
        animation.kill();
      };
    }
  }, [mouseX, mouseY, posXBtn, posYBtn, posXImage, posYImage]);

  // Mouse Init - Deploy the mouse position
  useEffect(() => {
    const handleMouseInit = () => {
      if (document.querySelector(".custom-cursor") && !document.querySelector(".custom-cursor").classList.contains("cursor-init")) {
        document.querySelector(".custom-cursor").classList.add("cursor-init");
      }
    };

    document.querySelector("main").addEventListener("mousemove", handleMouseInit);

    return () => {
      document.querySelector("main").removeEventListener("mousemove", handleMouseInit);
    };
  }, []);

  useEffect(() => {
    const handleMouseLeave = () => {
      const customCursor = document.querySelector(".custom-cursor");

      if (customCursor && customCursor.classList.contains("cursor-init")) {
        customCursor.classList.remove("cursor-init");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Normal hover
  useEffect(() => {
    const handleCursorHover = (e) => {
      const target = e.target;

      if (target && target.dataset.cursorText) {
        const dataText = target.dataset.cursorText;
        const dataBackgroundColor = target.dataset.backgroundColor;

        const customCursor = document.querySelector(".custom-cursor");

        if (customCursor) {
          customCursor.classList.add("cursor-hover");
          customCursor.querySelector(".cursor-text").textContent = dataText;
          customCursor.querySelector(".cursor-normal-before").style.backgroundColor = dataBackgroundColor;
          customCursor.querySelector(".cursor-text").style.setProperty("--cursor-speed", `${dataText.length}s`);
        }
      }
    };

    const handleCursorLeave = () => {
      const customCursor = document.querySelector(".custom-cursor");

      if (customCursor) {
        customCursor.classList.remove("cursor-hover");
      }
    };

    document.querySelectorAll("[data-cursor-text]").forEach((element) => {
      element.addEventListener("mouseenter", handleCursorHover);
      element.addEventListener("mouseleave", handleCursorLeave);
    });

    return () => {
      document.querySelectorAll("[data-cursor-text]").forEach((element) => {
        element.removeEventListener("mouseenter", handleCursorHover);
        element.removeEventListener("mouseleave", handleCursorLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor no-select">
        <div className="cursor-normal">
          <div className="cursor-normal-before"></div>
          <span className="cursor-text">View</span>
          <span className="cursor-text duplicate">View</span>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
