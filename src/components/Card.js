import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = ({ id, image, name, price }) => {
  return (
    <Link to={`/detail/${id}`}>
      <Container>
        <img src={image} alt="" />
        <Title>{name}</Title>
        <Price>{price.toLocaleString()}원</Price>
      </Container>
    </Link>
  );
};

export default Card;

const Container = styled.article`
  width: 250px;
  height: 330px;  
  overflow: hidden;
  img {
    width: 230px;
    height: 230px;
    padding: 0px 10px;
    object-fit: cover;
    transition: 0.3s;
    &:hover {
      transform: scale(1.09);
    }
  }
  box-sizing: border-box;
  margin: 10px;
  border: 1px solid lightgray;
`;

const Title = styled.span`
  font-size: 16px;
  display: block;
  padding: 5px 5px;
  background-color: #fff;
`;

const Price = styled.span`
  color: crimson;
  display: block;
  background-color: #fff;
  padding: 0px 5px 40px 5px;
`;
