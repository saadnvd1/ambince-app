import React, { useEffect, useMemo, useState } from "react";
import "./Inspiration.css";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { getData } from "inspiration/inspirationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import Discover from "inspiration/Discover";
import Starred from "inspiration/Starred";

const PAGE_COMPONENT_MAP = {
  discover: Discover,
  starred: Starred,
};

const InspirationView = () => {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("discover");

  const fetchingInitialData = useSelector(
    (state) => state.inspiration.fetchingInitialData
  );

  useEffect(() => {
    dispatch(getData());
  }, []);

  if (fetchingInitialData) {
    return <Spin />;
  }

  const ActiveComponent = PAGE_COMPONENT_MAP[activeMenu];

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
        <ActiveComponent />
      </div>
    </div>
  );
};

export default InspirationView;
