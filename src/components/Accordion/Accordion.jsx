import { useState } from "react";

const Accordion = ({ data, accordionId }) => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <>
      <div className="accordion-content" id={accordionId}>
        <div className="accordion-wrapper">
          {data.map((item, index) => (
            <div className={`accordion-item ${openAccordion === index ? "active" : ""}`} key={index}>
              <div className="input-wrap">
                <input type="checkbox" checked={openAccordion === index} onChange={() => handleAccordionClick(index)} />
                <label>Select</label>
              </div>
              <h5 className="accordion-top" onClick={() => handleAccordionClick(index)}>
                {item.question}
              </h5>
              <div className="accordion-bottom">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accordion;
