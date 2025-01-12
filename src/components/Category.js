import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Category = () => {
  return (
    <Container>
      <Title>
        <Link to="/">
          MADGOAT <span>(clone coding)</span>
        </Link>
      </Title>
      <CatLink to={"/cat/new"}>NEW ARRIVAL</CatLink>
      <CatLink to={"/cat/BAGS"}>BAGS</CatLink>
      <CatLink to={"/cat/WALLETS"}>WALLETS</CatLink>
      <CatLink to={"/cat/ACCESSORIES"}>ACCESSORIES</CatLink>
      <CatLink to={"/cat/SCARVES"}>SCARVES</CatLink>
      <CatLink to={"/about"}>ABOUT</CatLink>
      <CatLink to={"/notice"}>NOTICE</CatLink>
      <CatLink to={"/contact"}>CONTACT</CatLink>
      <CatLink to={"/instagram"}>INSTAGRAM</CatLink>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  margin-top: 10px;
  padding: 30px 30px 0 0;
  // border: 1px solid lightgray;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.65);
  a {
    text-decoration: none;
    color: black;
  }
`;

const Title = styled.div`
  width: 150px;
  font-size: 40px;
  color: crimson;
  span {
    font-size: 18px;
  }
`;

const CatLink = styled(Link)`
  width: 150px;
  padding-bottom: 3px;
`;
