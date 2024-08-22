import React from "react";

type content = {
    title: string;
    inner: string;
};

export default function PinnedSection({ contents }: { contents: content[] }) {
    return (
        <>
            {contents.length > 0 && (
                <section className="section portfolio-desc-section pt-unset dark-theme" data-scroll-section="">
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <div className="tabs-link-wrap">
                                    <div className="desktop-tab">
                                        <div className="tabs-link">
                                            {contents.map((content, index) => (
                                                <div key={`tab-links-${index}`} className={`tabLinks ${index === 0 ? "active" : ""}`}>
                                                    <div className="tabs-link-item">
                                                        <p>{content.title}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="tab-wrapper tabs-result-wrapper">
                                    {contents.map((content, index) => (
                                        <div className={`tabContent ${index === 0 ? "active" : ""}`} key={`pinned-item-${index}`}>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: content.inner,
                                                }}
                                                className="item"
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
