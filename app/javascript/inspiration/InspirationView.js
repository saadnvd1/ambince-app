import React, { useEffect, useMemo, useState } from "react";
import "./Inspiration.css";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { getData } from "inspiration/inspirationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { isEmpty, shuffle } from "lodash";
import InspirationCard from "inspiration/InspirationCard";

const InspirationView = () => {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("discover");

  const fetchingInitialData = useSelector(
    (state) => state.inspiration.fetchingInitialData
  );

  const standardQuotes = useSelector(
    (state) => state.inspiration.standardQuotes
  );

  useEffect(() => {
    dispatch(getData());
  }, []);

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

  if (fetchingInitialData) {
    return <Spin />;
  }

  return (
    <div>
      <div className="inspiration-submenu">
        <p
          className={`menu-button ${
            activeMenu === "discover" ? "menu-button-selected" : ""
          }`}
          onClick={() => setActiveMenu("discover")}
        >
          <MagnifyingGlassIcon height={24} /> Discover
        </p>
        <p
          className={`menu-button ${
            activeMenu === "starred" ? "menu-button-selected" : ""
          }`}
          onClick={() => setActiveMenu("starred")}
        >
          <StarIcon height={24} /> Starred
        </p>
      </div>
      <div className="inspiration-container">
        {quotes.map((quote) => {
          return (
            <InspirationCard quote={quote} key={`discover-quote-${quote.id}`} />
          );
        })}
      </div>
    </div>
  );
};

export default InspirationView;
