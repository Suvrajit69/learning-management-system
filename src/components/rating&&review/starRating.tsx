"use client";

import { FaStar } from "react-icons/fa";
import { useState } from "react";

interface StarRatingProps {
  setRating: (value: number) => void;
  initialRating: number;
}

const StarRating = ({ setRating, initialRating }: StarRatingProps) => {
  const [currentValue, setCurrentValue] = useState(initialRating);
  const stars = Array(5).fill(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClickEvent = (value: number) => {
    setCurrentValue(value);
    setRating(value);
  };
  const handleHoverEvent = (value: any) => {
    setHoverValue(value);
  };
  const handleMouseLeave = (): void => {
    setHoverValue(undefined);
  };

  return (
    <div className="flex justify-center">
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size="3rem"
            color={
              (hoverValue || currentValue) > index
                ? "rgb(250 204 21)"
                : "rgb(226 232 240)"
            }
            onClick={() => handleClickEvent(index + 1)}
            onMouseOver={
              currentValue != 0 ? () => {} : () => handleHoverEvent(index + 1)
            }
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
