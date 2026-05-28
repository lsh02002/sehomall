import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ totalStars }: { totalStars: number | null }) => {
  const createArray = (length: number) => [...Array(length)];

  const Star = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div
      className="text-start rounded"
      style={{
        width: "100px",
      }}
    >
      {totalStars &&
        createArray(totalStars).map((_, i) => (
          <Star key={`gold-${i}`} color="gold" />
        ))}

      {totalStars &&
        createArray(5 - totalStars).map((_, i) => (
          <Star key={`gray-${i}`} color="rgb(216,216,216)" />
        ))}
    </div>
  );
};

export default StarRating;
