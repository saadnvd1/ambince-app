import React, { useEffect, useState } from "react";
import "./Journal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { StarIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "antd";
import { createEntry, getEntries } from "journal/journalSlice";
import { useDispatch } from "react-redux";
import EntriesList from "journal/EntriesList";
import Editor from "journal/Editor";

const JournalView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntries());
  }, []);

  return (
    <div className="journal-container">
      <EntriesList />
      <div className="journal-entry-container">
        <div className="journal-entry-new-btn-container">
          <div style={{ width: "100%" }}>
            <input
              value="Reflections on the Day"
              onChange={null}
              className="journal-entry-title-input"
            />
          </div>
          <div>
            <Tooltip title={"New Entry"}>
              <span onClick={() => dispatch(createEntry())}>
                <PlusCircleIcon height={32} className="journal-entry-new-btn" />
              </span>
            </Tooltip>
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default JournalView;
