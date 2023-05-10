import React, { useMemo } from "react";
import { isEmpty, shuffle } from "lodash";
import { useSelector } from "react-redux";
import InspirationCard from "inspiration/InspirationCard";

const Starred = () => {
  const standardQuotes = useSelector(
    (state) => state.inspiration.standardQuotes
  );

  const starredQuotes = useSelector((state) => state.inspiration.starredQuotes);

  const quotes = useMemo(() => {
    if (!isEmpty(standardQuotes)) {
      return shuffle(
        Object.entries(standardQuotes)
          .filter(([quoteId], _) => !!starredQuotes[quoteId])
          .map(([_, quoteData]) => {
            return quoteData;
          })
      );
    }

    return [];
  }, [standardQuotes, starredQuotes]);

  return (
    <>
      {quotes.map((quote) => {
        return (
          <InspirationCard quote={quote} key={`starred-quote-${quote.id}`} />
        );
      })}
    </>
  );
};

export default Starred;
