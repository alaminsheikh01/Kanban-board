import React, { useState } from "react";
import moment from "moment";
import { FaLink } from "react-icons/fa6";
import { BiChat } from "react-icons/bi";
import { RiStackFill } from "react-icons/ri";
import { RiTodoLine } from "react-icons/ri";
import "./Card.css";
import axios from "axios";

// Modal Component
const Modal = ({ isOpen, closeModal, content, data, getFile, setData }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");

  if (!isOpen) return null; // Do not render if modal is not open

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadMessage("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.post("http://localhost:5001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getFile();
      setUploadMessage("Files uploaded successfully!");
    } catch (error) {
      setUploadMessage("An error occurred during upload.");
    }
  };

  const deleteFile = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5001/delete-file/${fileId}`);
      setData(data.filter((file) => file._id !== fileId)); // Update state to remove deleted file
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Attachment Modal</h2>
        <p>{content}</p>

        {/* File input */}
        <input type="file" multiple onChange={handleFileChange} />

        {/* Upload button */}
        <button onClick={handleUpload}>Upload Files</button>
        {uploadMessage && <p style={{ color: "red" }}>{uploadMessage}</p>}

        <div className="file-list">
          {data.map((file) => (
            <div
              key={file._id}
              onClick={() => deleteFile(file._id)} // Trigger delete on click
              style={{
                display: "inline-block",
                marginRight: "10px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <span>{file.originalName}</span>
            </div>
          ))}
        </div>

        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

const Card = ({ content, length }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const getFile = async () => {
    const result = await axios.get("http://localhost:5001/get-file");
    setData(result.data.data);
  };

  const handleModalOpen = () => {
    getFile();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    getFile();
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
          <FaLink /> {length}
        </span>
        <span>📅 {moment().format("YYYY-MM-DD")}</span>
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        content={content}
        data={data}
        getFile={getFile}
        setData={setData}
      />
    </div>
  );
};

export default Card;
