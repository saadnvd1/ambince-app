import ReactQuill from "react-quill";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectActiveEntry } from "journal/journalSelectors";

const Editor = () => {
  const [value, setValue] = useState("");
  const entry = useSelector(selectActiveEntry);

  useEffect(() => {
    if (entry) {
      setValue(entry.content);
    }
  }, [entry]);

  return (
    <div className="journal-entry-editor" key={entry?.id}>
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
