import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const StarRating = ({ totalStars }) => {
  const createArray = (length) => [...Array(length)];

  return (
    <Container>
      {createArray(totalStars).map((i) => (
        <FaStar key={i} color="gold" />
      ))}
      {createArray(5 - totalStars).map((i) => (
        <FaStar key={i} color="rgb(216, 216, 216)" />
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
