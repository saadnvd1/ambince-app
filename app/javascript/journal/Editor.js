import ReactQuill from "react-quill";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectActiveEntry } from "journal/journalSelectors";

const Editor = () => {
  const entry = useSelector(selectActiveEntry);
  const [value, setValue] = useState(entry.content || "");

  return (
    <div className="journal-entry-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        scrollingContainer="html"
      />
    </div>
  );
};

export default Editor;
