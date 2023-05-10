import React, { useState } from "react";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import { toggleQuoteStar } from "inspiration/inspirationSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectQuoteIsStarred } from "inspiration/selectors";

const InspirationCard = ({ quote }) => {
  const [hovered, setHovered] = useState(false);
  const quoteIsStarred = useSelector((state) =>
    selectQuoteIsStarred(state, { quoteId: quote.id })
  );
  const dispatch = useDispatch();

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("images/standard_quotes", false, /\.(png|jpe?g|svg)$/)
  );

  console.log("images", images);

  const getContainerClassName = () => {
    if (!quote.image_name) {
      return "inspiration-card-only-text-black";
    } else {
      return "inspiration-card";
    }
  };

  const getContainerStyle = () => {
    if (quote.image_name) {
      const imageUrl = images[quote.image_name];
      console.log("imageUrl", imageUrl);
      return {
        backgroundImage: "url(" + imageUrl + ")",
      };
    } else {
      return null;
    }
  };

  const handleToggleStar = () => {
    dispatch(toggleQuoteStar(quote.id));
  };

  const StarComponent = quoteIsStarred ? StarIconSolid : StarIcon;

  return (
    <div
      className={getContainerClassName()}
      style={getContainerStyle()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div
          className="inspiration-card-hover-container"
          onClick={handleToggleStar}
        >
          <StarComponent />
        </div>
      )}
      {quote.content && (
        <div className="quote-content-container">
          <p>{quote.content}</p>
          {quote.author && (
            <p className="quote-author">
              <i>{quote.author}</i>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InspirationCard;
