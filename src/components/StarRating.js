import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const createArray = (length) => [...Array(length)];

const StarRating = ({ totalStars }) => {
  return (
    <Container>
      {createArray(totalStars).map((i) => (
        <FaStar key={i} color="gold" />
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
