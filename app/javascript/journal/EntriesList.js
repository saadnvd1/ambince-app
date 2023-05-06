import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveEntryId } from "journal/journalSlice";

const EntriesList = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.journal.entries);
  const activeEntryId = useSelector((state) => state.journal.activeEntryId);

  const entriesSorted = Object.entries(entries)
    .map(([entryId, entryData]) => {
      return { ...entryData };
    })
    .sort((a, b) => b.id - a.id);

  const handleEntryClick = (entryId) => {
    dispatch(updateActiveEntryId(entryId));
  };

  return (
    <div className="journal-entries-container">
      <h3>Journal Entries</h3>
      <ul className="journal-entries-list">
        {/*<li className="journal-entry-item">*/}
        {/*  <p>Reflections on the Day</p>*/}
        {/*  <p className="mt2">*/}
        {/*    <span className="highlight">May 24, 2023</span>{" "}*/}
        {/*    <StarIcon height={12} />*/}
        {/*  </p>*/}
        {/*</li>*/}
        {entriesSorted.map((entry) => {
          return (
            <li
              className={`journal-entry-item ${
                activeEntryId === entry.id ? "journal-entry-item-selected" : ""
              }`}
              onClick={() => handleEntryClick(entry.id)}
            >
              <p>{entry.title}</p>
              <p className="highlight mt2">{entry.created_at}</p>
            </li>
          );
        })}
        {/*<li className="journal-entry-item journal-entry-item-selected">*/}
        {/*  <p>Reflections on the Day</p>*/}
        {/*  <p className="highlight mt2">May 23, 2023</p>*/}
        {/*</li>*/}
      </ul>
    </div>
  );
};

export default EntriesList;
