import React from "react";
import "./App.css";
import Column from "./component/Column";
import { FaTasks, FaClipboardList, FaHourglassHalf, FaCheckCircle, FaExclamationCircle, FaCalendarTimes } from "react-icons/fa";


const App = () => {
  const columns = [
    { title: "Incomplete", icon: <FaExclamationCircle />, cards: Array(10).fill("Card Content For Description...") },
    { title: "To Do", icon: <FaClipboardList />, cards: Array(10).fill("Card Content For Description...") },
    { title: "Doing", icon: <FaHourglassHalf />, cards: Array(10).fill("Card Content For Description...") },
    { title: "Under Review", icon: <FaTasks />, cards: Array(10).fill("Card Content For Description...") },
    { title: "Completed", icon: <FaCheckCircle />, cards: Array(10).fill("Card Content For Description...") },
    { title: "Overdue", icon: <FaCalendarTimes />, cards: Array(10).fill("Card Content For Description...") },
  ];

  return (
    <div className="kanban-container">
      <div className="kanban-board">
        {columns.map((col, index) => (
          <Column key={index} title={col.title} cards={col.cards} icon={col.icon} />
        ))}
      </div>
    </div>
  );
};

export default App;
