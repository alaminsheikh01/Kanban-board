import React, { useState } from "react";
import moment from "moment";
import { FaLink } from "react-icons/fa6";
import { BiChat } from "react-icons/bi";
import { RiStackFill } from "react-icons/ri";
import { RiTodoLine } from "react-icons/ri";
import "./Card.css";

// Modal Component
const Modal = ({ isOpen, closeModal, content }) => {
  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Attachment Modal</h2>
        <p>{content}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

const Card = ({ content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="client-info">
          <img
            src="https://i.pravatar.cc/40?img=1" // Random placeholder image
            alt="Client"
            className="client-image"
          />
          <span className="card-client">Client Name</span>
        </div>
        <div className="assignee-info">
          <img
            src="https://i.pravatar.cc/40?img=2" // Random placeholder image
            alt="Assignee"
            className="assignee-image"
          />
          <span className="assignee-name">Sadik Istiak</span>
        </div>
      </div>
      <div className="desc">
        <p className="card-description">
          <RiStackFill /> {content}
        </p>
        <p>
          <RiTodoLine /> 1/2
        </p>
      </div>

      <div className="card-details">
        <img
          src="https://i.pravatar.cc/40?img=3"
          className="icon-image"
          alt="icon1"
        />
        <img
          src="https://i.pravatar.cc/40?img=4"
          className="icon-image"
          alt="icon2"
        />
        <span className="number">12+</span>
        <span>
          <BiChat />
          15
        </span>
        <span onClick={handleModalOpen} className="link">
          <FaLink /> 25
        </span>
        <span>📅 {moment().format("YYYY-MM-DD")}</span>
      </div>

      <Modal isOpen={isModalOpen} closeModal={handleModalClose} content={content} />
    </div>
  );
};

export default Card;
