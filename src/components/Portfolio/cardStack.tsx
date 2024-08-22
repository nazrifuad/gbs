import React, { Fragment, useEffect, useState } from "react";
import PortfolioCard from "../PortfolioCard/PortfolioCard";
import { fetchAPI } from "../../utils/fetchData";
import { getStrapiMedia } from "../../utils/getStrapiMedia";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type Portfolio = {
    attributes: {
        title: string;
        slug: string;
        short_description: string;
        tag: Tag[];
        bannerImage: StrapiImage;
        linkTo: string;
        usability: string;
        user_retention: string;
    };
};

type Tag = {
    id: number;
    title: string;
};

type StrapiImage = {
    data: {
        attributes: {
            url: string;
        };
    };
};

export default function CardStack() {
    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetchAPI(`/portfolios`).then((data) => {
            setPortfolios(data.data);
        });
    }

    useEffect(() => {
        if (portfolios.length > 0) {
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
                            end:
                                index < cardsPinned.length - 1
                                    ? `bottom top+=${800 + cardsPinned.length * pinningSpacer}`
                                    : `bottom-=${index * pinningSpacer} top+=${800 + cardsPinned.length * pinningSpacer}`,
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
        }
    }, [portfolios]);

    return (
        <div className="cards-grid portfolio">
            {portfolios &&
                portfolios.map((portfolio: Portfolio, index: number) => (
                    <PortfolioCard
                        title={portfolio.attributes.title}
                        description={portfolio.attributes.short_description}
                        tags={portfolio.attributes.tag}
                        imageUrl={getStrapiMedia(portfolio.attributes.bannerImage.data.attributes.url)}
                        linkTo={`/portfolio/${portfolio.attributes.slug}`}
                        usability={portfolio.attributes.usability}
                        userRetention={portfolio.attributes.user_retention}
                        key={index}
                    />
                ))}
        </div>
    );
}
