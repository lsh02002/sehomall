import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideMenu = () => {
  return (
    <Container>
      <Title>
        <Link to="/">
          SEHOMALL <span>(clone coding)</span>
        </Link>
      </Title>
      <CatLink to={"/cat/new"}>NEW ARRIVAL</CatLink>
      <CatLink to={"/cat/BAGS"}>BAGS</CatLink>
      <CatLink to={"/cat/WALLETS"}>WALLETS</CatLink>
      <CatLink to={"/cat/ACCESSORIES"}>ACCESSORIES</CatLink>
      <CatLink to={"/cat/SCARVES"}>SCARVES</CatLink>
      <CatLink to={"/about"}>ABOUT</CatLink>
      <CatLink to={"/notice?page=1&size=5"}>NOTICE</CatLink>
      <CatLink to={"/contact"}>CONTACT</CatLink>
      <CatLink to={"/instagram"}>INSTAGRAM</CatLink>
      <Message>
        백엔드 비용이 발생하여 프론트엔드에서 가짜(더미)데이터를 사용하기로
        했습니다. 작업을 놓고 있었는데 디자인도 업데이트 노력하겠습니다.
      </Message>
    </Container>
  );
};

export default SideMenu;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  margin-top: 10px;
  padding: 30px 0 30px 0;
  // border: 1px solid lightgray;
  left: 0;
  top: 0;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.65);
  a {
    text-decoration: none;
    color: black;
  }
`;

const Title = styled.div`
  width: 100%;
  font-size: 40px;
  color: red;
  span {
    font-size: 18px;
  }
`;

const Message = styled.div`
  font-size: 14px;
  width: 100%;
  margin-top: 20px;
  background-color: gray;
  color: white;
`;

const CatLink = styled(Link)`
  width: 100%;
  padding: 0 0 0 30px;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(82, 72, 72, 0.1);
  }
`;
