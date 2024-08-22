import React, { useEffect, useState } from "react";
import { fetchAPI } from "../../utils/fetchData";
import Accordion from "../Accordion/Accordion";

type Faq = {
    attributes: {
        title: string;
        content: FaqContent[];
    };
};

type FaqContent = {
    title: string;
    content: string;
};

export default function FaqSection() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetchAPI(`/faqs`).then((data) => {
            setFaqs(data.data);
        });
    }

    return (
        <>
            {faqs.length > 0 && (
                <div className="tabs-link-wrap">
                    <div className="desktop-tabs">
                        <div className="tabs-link">
                            <div className="tabs-link">
                                {faqs.map((faq: Faq, index: any) => (
                                    <div
                                        key={`tab-${index}`}
                                        className={`tabLinks ${currentTab === index ? "active" : ""}`}
                                        onClick={() => setCurrentTab(index)}
                                    >
                                        <div className="tabs-link-item">
                                            <p>{faq.attributes.title}</p>
                                        </div>
                                    </div>
                                ))}
                                {/* {[1, 2, 3, 4].map((tabNumber) => (
                                <div
                                    key={tabNumber}
                                    // className={`tabLinks ${activeTab === tabNumber ? "active" : ""}`}
                                    // onClick={(e) => handleTabClick(tabNumber, e)}
                                >
                                    <div className="tabs-link-item">
                                        <p>
                                            {tabNumber === 1 && "Pricing"}
                                            {tabNumber === 2 && "Starting a project"}
                                            {tabNumber === 3 && "Design"}
                                            {tabNumber === 4 && "Development"}
                                        </p>
                                    </div>
                                </div>
                            ))} */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* tab content */}
            <div className="tab-wrapper tabs-result-wrapper triggerElement">
                {faqs.map((faq: Faq, index: any) => (
                    <React.Fragment key={`faq-content-${index}`}>
                        {currentTab === index && <Accordion data={faq.attributes.content} accordionId={`faqAccordion-${index}`} />}
                    </React.Fragment>
                ))}
                {/* {currentTab === 1 && <Accordion data={pricingAccordionData} accordionId="pricingAccordion" />}
                {currentTab === 2 && <Accordion data={startProjectAccordionData} accordionId="startProjectAccordion" />}
                {currentTab === 3 && <Accordion data={developmentAccordionData} accordionId="developmentAccordion" />}
                {currentTab === 4 && <Accordion data={designAccordionData} accordionId="designAccordion" />} */}
            </div>
        </>
    );
}
