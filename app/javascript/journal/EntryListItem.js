import EntryDropdownMenu from "journal/EntryDropdownMenu";
import React, { useState } from "react";

const EntryListItem = ({ activeEntryId, entry, handleEntryClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className={`journal-entry-item ${
        activeEntryId === entry.id ? "journal-entry-item-selected" : ""
      }`}
      onClick={() => handleEntryClick(entry.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <p>{entry.title}</p>
        <p className="highlight mt2">{entry.created_at}</p>
      </div>
      {hovered && <EntryDropdownMenu entry={entry} />}
    </li>
  );
};

export default EntryListItem;
