import React, { useState } from "react";
import "./Journal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { StarIcon, PencilIcon } from "@heroicons/react/24/outline";

const JournalView = () => {
  const [value, setValue] = useState("");

  return (
    <div className="journal-container">
      <div className="journal-entries-container">
        <h3>Journal Entries</h3>
        <ul className="journal-entries-list">
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="mt2">
              <span className="highlight">May 24, 2023</span>{" "}
              <StarIcon height={12} />
            </p>
          </li>
          <li className="journal-entry-item journal-entry-item-selected">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
          <li className="journal-entry-item">
            <p>Reflections on the Day</p>
            <p className="highlight mt2">May 23, 2023</p>
          </li>
        </ul>
      </div>
      <div className="journal-entry-container">
        <div className="journal-entry-new-btn">
          <PencilIcon height={32} />
        </div>
        <div className="journal-entry-editor">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
    </div>
  );
};

export default JournalView;
