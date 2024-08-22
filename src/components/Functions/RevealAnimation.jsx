import { useState, useEffect } from "react";

export default function RevealAnimation() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const elements = document.querySelectorAll(".triggerElement");
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.3,
            };

            // eslint-disable-next-line no-unused-vars
            const observerCallback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, options);

            // Observe each element
            if (elements) {
                elements.forEach((element) => observer.observe(element));
            }
        }
    }, [isMounted]);
    return <></>;
}
