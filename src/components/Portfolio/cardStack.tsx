import React, { Fragment, useEffect, useState } from "react";
import PortfolioCard from "../PortfolioCard/PortfolioCard";
import { fetchAPI } from "../../utils/fetchData";
import { getStrapiMedia } from "../../utils/getStrapiMedia";

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
        async function fetchData() {
            try {
                const response = await fetchAPI(`/portfolios`);
                const data = await response;
                setPortfolios(data.data);
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }
        }
        fetchData();
    }, []);

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
