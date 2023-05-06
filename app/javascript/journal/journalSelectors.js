import { createSelector } from "reselect";

export const selectAllEntries = (state) => state.journal.entries;
const selectActiveEntryId = (state) => state.journal.activeEntryId;

export const selectActiveEntry = createSelector(
  selectAllEntries,
  selectActiveEntryId,
  (entries, activeNoteId) => {
    if (!activeNoteId) return;
    return entries[activeNoteId];
  }
);
