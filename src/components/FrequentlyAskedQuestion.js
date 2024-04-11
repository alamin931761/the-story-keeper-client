import React from "react";

const FrequentlyAskedQuestion = ({ collapseTitle, children }) => {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border border-[#000000] bg-[#DFF6FF] mb-1 rounded-box"
      data-aos="zoom-in-up"
      data-aos-duration="3000"
    >
      <div className="collapse-title text-xl font-medium second-font">
        {collapseTitle}
      </div>

      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default FrequentlyAskedQuestion;
