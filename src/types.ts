export type Faq = {
    attributes: {
        title: string;
        content: FaqContent[];
    };
};

export type FaqContent = {
    title: string;
    content: string;
};