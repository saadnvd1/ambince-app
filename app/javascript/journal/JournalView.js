import React, { useEffect, useState } from "react";
import "./Journal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { StarIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Spin, Tooltip } from "antd";
import { createEntry, getEntries } from "journal/journalSlice";
import { useDispatch, useSelector } from "react-redux";
import EntriesList from "journal/EntriesList";
import Editor from "journal/Editor";
import Header from "journal/Header";

const JournalView = () => {
  const activeEntryId = useSelector((state) => state.journal.activeEntryId);
  const dispatch = useDispatch();
  const fetchingInitialData = useSelector(
    (state) => state.journal.fetchingInitialData
  );

  useEffect(() => {
    dispatch(getEntries());
  }, []);

  if (fetchingInitialData) {
    return <Spin />;
  }

  return (
    <div className="journal-container">
      <EntriesList />
      <div className="journal-entry-container">
        <Header key={`${activeEntryId}-header`} />
        <Editor key={`${activeEntryId}-editor`} />
      </div>
    </div>
  );
};

export default JournalView;
