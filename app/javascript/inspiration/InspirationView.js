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
        <div className="inspiration-card-only-text-black">
          <div className="quote-content-container">
            <p>
              If they can get you asking the wrong questions, they don't have to
              worry about answers.
            </p>
            <p className="quote-author">
              <i>Albert Einstein</i>
            </p>
          </div>
        </div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card-only-text-black">
          <div className="quote-content-container">
            <p>
              It is the mark of an educated mind, to entertain a thought without
              accepting it
            </p>
            <p className="quote-author">
              <i>Aristotle</i>
            </p>
          </div>
        </div>
        <div className="inspiration-card"></div>
        <div className="inspiration-card-only-text-black">
          You will face many defeats in your life, but never let yourself be
          defeated. Face your fear with faith and your fear will become a
          fortitude of fiery courage and a future full of promise.
        </div>
      </div>
    </div>
  );
};

export default InspirationView;
