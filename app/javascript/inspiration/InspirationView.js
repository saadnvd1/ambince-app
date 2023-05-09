import React, { useState } from "react";
import "./Inspiration.css";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";

const InspirationView = () => {
  const [activeMenu, setActiveMenu] = useState("discover");

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
        <div className="inspiration-card"></div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card"></div>
      </div>
    </div>
  );
};

export default InspirationView;
