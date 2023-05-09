import React, { useEffect, useMemo, useState } from "react";
import "./Inspiration.css";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { getData } from "inspiration/inspirationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { isEmpty } from "lodash";
import InspirationCard from "inspiration/InspirationCard";

const InspirationView = () => {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("discover");
  const [hovered, setHovered] = useState(false);

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
      return Object.entries(standardQuotes).map(([quoteId, quoteData]) => {
        return quoteData;
      });
    }

    return [];
  }, [standardQuotes]);

  if (fetchingInitialData) {
    return <Spin />;
  }

  console.log("quotes", quotes);

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
        {/*<div className="inspiration-card"></div>*/}
        {/*<div className="inspiration-card-only-text-black">*/}
        {/*  <div className="quote-content-container">*/}
        {/*    <p>*/}
        {/*      If they can get you asking the wrong questions, they don't have to*/}
        {/*      worry about answers.*/}
        {/*    </p>*/}
        {/*    <p className="quote-author">*/}
        {/*      <i>Albert Einstein</i>*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="inspiration-card">*/}
        {/*  <div className="inspiration-card-hover-container">*/}
        {/*    <StarIconSolid />*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  className="inspiration-card-only-text-black"*/}
        {/*  onMouseEnter={() => setHovered(true)}*/}
        {/*  onMouseLeave={() => setHovered(false)}*/}
        {/*>*/}
        {/*  {hovered && (*/}
        {/*    <div className="inspiration-card-hover-container">*/}
        {/*      <StarIconSolid />*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*  You will face many defeats in your life, but never let yourself be*/}
        {/*  defeated. Face your fear with faith and your fear will become a*/}
        {/*  fortitude of fiery courage and a future full of promise.*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default InspirationView;
