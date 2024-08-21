import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Index() {
    const { slug } = useParams();
    const [portfolio, setPortfolio] = useState();

    console.log(slug)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:1337/api/portfolios/${slug}`);
            const data = await response.json();
            setPortfolio(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log(portfolio);
    }, [portfolio]);

    return (
        <>
        {portfolio && (
            <>
                <h1>{portfolio.title}</h1>
                <p className=''>This is the page slug : {portfolio.title}</p>
            </>
        )}
        </>
    );
}