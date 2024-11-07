import React from "react";
import Card from "./Card";
import "./Column.css";

const Column = ({ title, cards, icon }) => {
  return (
    <div className="column">
      <div className="column-header">
        <span className="column-title">
          {icon} {/* Display the icon passed as a prop */}
          {title}
        </span>
        <span className="column-count">{cards.length}</span>
      </div>
      <div className="column-cards">
        {cards.map((content, index) => (
          <Card key={index} content={content} />
        ))}
      </div>
    </div>
  );
};

export default Column;
