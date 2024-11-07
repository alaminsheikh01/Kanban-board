import React, { useEffect, useState } from "react";
import "./App.css";
import Column from "./component/Column";
import {
  FaTasks,
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaExclamationCircle,
  FaCalendarTimes,
} from "react-icons/fa";
import axios from "axios";

const App = () => {
  const [length, setLength] = useState(0);
  const columns = [
    {
      title: "Incomplete",
      icon: <FaExclamationCircle />,
      cards: Array(12).fill("Card Content For Description..."),
    },
    {
      title: "To Do",
      icon: <FaClipboardList />,
      cards: Array(5).fill("Card Content For Description..."),
    },
    {
      title: "Doing",
      icon: <FaHourglassHalf />,
      cards: Array(11).fill("Card Content For Description..."),
    },
    {
      title: "Under Review",
      icon: <FaTasks />,
      cards: Array(15).fill("Card Content For Description..."),
    },
    {
      title: "Completed",
      icon: <FaCheckCircle />,
      cards: Array(10).fill("Card Content For Description..."),
    },
    {
      title: "Overdue",
      icon: <FaCalendarTimes />,
      cards: Array(10).fill("Card Content For Description..."),
    },
  ];

  const getFile = async () => {
    const result = await axios.get("http://localhost:5001/get-file");
    setLength(result?.data?.data?.length);

  };

  useEffect(() => {
    getFile();
  }, []);

  return (
    <div className="kanban-container">
      <div className="kanban-board">
        {columns.map((col, index) => (
          <Column
            key={index}
            title={col.title}
            cards={col.cards}
            icon={col.icon}
            length={length}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
