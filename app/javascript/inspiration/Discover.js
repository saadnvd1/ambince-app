import React, { useMemo } from "react";
import { isEmpty, shuffle } from "lodash";
import { useSelector } from "react-redux";
import InspirationCard from "inspiration/InspirationCard";

const Discover = () => {
  const standardQuotes = useSelector(
    (state) => state.inspiration.standardQuotes
  );

  const quotes = useMemo(() => {
    if (!isEmpty(standardQuotes)) {
      return shuffle(
        Object.entries(standardQuotes).map(([quoteId, quoteData]) => {
          return quoteData;
        })
      );
    }

    return [];
  }, [standardQuotes]);

  return (
    <>
      {quotes.map((quote) => {
        return (
          <InspirationCard quote={quote} key={`discover-quote-${quote.id}`} />
        );
      })}
    </>
  );
};

export default Discover;
