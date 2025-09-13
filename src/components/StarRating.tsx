import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const StarRating = ({ totalStars }: { totalStars: number | null }) => {
  const createArray = (length: number) => [...Array(length)];
  const Star = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <Container>
      {totalStars && createArray(totalStars).map((star, i) => (
        <Star key={i} color="gold" />
      ))}
      {totalStars && createArray(5 - totalStars).map((star, i) => (
        <Star key={i} color="rgb(216, 216, 216)" />
      ))}
    </Container>
  );
};

export default StarRating;

const Container = styled.div`
  width: 100px;
  text-align: left;
  border-radius: 5px;
`;
