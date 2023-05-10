import { createSelector } from "reselect";

export const selectAllStarredQuotes = (state) =>
  state.inspiration.starredQuotes;

export const selectQuoteIsStarred = createSelector(
  selectAllStarredQuotes,
  (state, props) => props.quoteId,
  (starredQuotes, quoteId) => {
    return !!starredQuotes[quoteId];
  }
);
