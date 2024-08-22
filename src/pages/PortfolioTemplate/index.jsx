import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from '../../utils/fetchData';
import PortfolioBanner from '../../components/Portfolio/portfolioBanner';
import PinnedSection from '../../components/Portfolio/pinnedSection';
import Contact from '../../components/Contact/Contact';

export default function Index() {
    const { slug } = useParams();
    const [portfolio, setPortfolio] = useState();

    // Fetch the Strapi endpoint from environment variables

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchAPI(`/portfolios/${slug}`);
                const data = await response;
                setPortfolio(data.data.attributes);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        }
        fetchData();
    }, [slug]);

    return (
        <>
        {portfolio && (
            <>
                <PortfolioBanner title={portfolio.title} tags={portfolio.tag} bannerImage={portfolio.bannerImage.data.attributes.url} />
                <PinnedSection contents={portfolio.pinned_tabs} />
            </>
        )}
        <Contact />
        </>
    );
}
