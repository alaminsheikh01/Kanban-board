import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaLink } from "react-icons/fa6";
import { BiChat } from "react-icons/bi";
import { RiStackFill } from "react-icons/ri";
import { RiTodoLine } from "react-icons/ri";
import "./Card.css";
import axios from "axios";


// Modal Component
const Modal = ({ isOpen, closeModal, content, data }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");


  if (!isOpen) return null; // Do not render if modal is not open

 
  // Handle file selection
  const handleFileChange = (e) => {
    console.log(e.target.files);
    setSelectedFiles(e.target.files);
  };

  // Handle file upload
  const handleUpload = async () => {
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response);
      if (response.ok) {
        setUploadMessage("Files uploaded successfully!");
      } else {
        setUploadMessage("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadMessage("An error occurred during upload.");
    }
  };
console.log(data)
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Attachment Modal</h2>
        <p>{content}</p>

        {/* File input */}
        <input type="file" multiple onChange={handleFileChange} />

        {/* Upload button */}
        <button onClick={handleUpload}>Upload Files</button>

        {/* Display upload message */}
        {/* {uploadMessage && <p>{uploadMessage}</p>} */}
        {data.map((file) => (
          <div key={file._id}>
            <a download>
              {file.originalName}
            </a>
          </div>
        ))}

        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

const Card = ({ content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

    // get data
    const getFile = async () => {
      const result = await axios.get("http://localhost:5001/get-file");
      console.log(result.data.data);
      setData(result.data.data);
    };

  useEffect(() =>{
    getFile();
  },[])

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

      <Modal
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        content={content}
        data={data}
      />
    </div>
  );
};

export default Card;
