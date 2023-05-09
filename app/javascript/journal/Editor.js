import ReactQuill from "react-quill";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveEntry } from "journal/journalSelectors";
import { debounce } from "lodash";
import { updateEntry } from "journal/journalSlice";

const Editor = () => {
  const dispatch = useDispatch();
  const entry = useSelector(selectActiveEntry);
  const [value, setValue] = useState(entry.content || "");

  const changeHandler = (newContent) => {
    dispatch(updateEntry({ id: entry.id, content: newContent }));
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    []
  );

  const handleContentChange = (newContent) => {
    // const objDiv = document.getElementById("editor-container");
    // objDiv.scrollTop = objDiv.scrollHeight;
    setValue(newContent);
    debouncedChangeHandler(newContent);
  };

  return (
    <div className="journal-entry-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleContentChange}
        scrollingContainer="html"
      />
    </div>
  );
};

export default Editor;
