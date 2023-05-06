import { Tooltip } from "antd";
import { createEntry, updateEntry } from "journal/journalSlice";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveEntry } from "journal/journalSelectors";

const Header = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const entry = useSelector(selectActiveEntry);
  const [value, setValue] = useState(entry.title || "");

  const saveTitle = () =>
    dispatch(
      updateEntry({
        id: entry.id,
        title: value,
      })
    );

  const handleBlur = () => {
    if (value !== entry.title) {
      saveTitle()
        .unwrap()
        .then(() => setIsEditing(false));
    } else {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="journal-entry-new-btn-container" key={entry?.id}>
      <div style={{ width: "100%" }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="journal-entry-title-input"
          onClick={() => setIsEditing(true)}
          readOnly={!isEditing}
          onKeyDown={handleKeyDown}
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
  );
};

export default Header;
