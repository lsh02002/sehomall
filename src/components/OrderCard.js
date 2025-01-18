import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NoImage from "../assets/no-image.jpg";

const OrderCard = ({ order }) => {
  return (
    <Container>
      <Link to={`/detail/${order.itemId}`}>
        <img src={order.files[0] ? order.files[0].fileUrl : NoImage} alt="" />
      </Link>
      <Info>
        <Link to={`/detail/${order.itemId}`}>
          <div>상품 아이디: {order.itemId}</div>
          <div>상품 명: {order.itemName}</div>
          <div>작성자: {order.nickname}</div>
        </Link>
      </Info>
      <Content>
        <div>내용: {order.content}</div>
      </Content>
      <RatingCount>{order.rating}</RatingCount>
      <CreatedDate>{order.createAt}</CreatedDate>
    </Container>
  );
};

export default OrderCard;

const Container = styled.div`
display: flex;
  justify-content: start;
  align-items; center;
  max-width: 870px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 25px;  
  padding: 5px;
  position: relative;
  
  img {
    width: 100px;
    height: 100px;
    padding: 0px 10px;
    object-fit: cover;
  }
    a{
    text-decoration: none;
    color: black;
    }
`;

const Info = styled.div`
  padding: 5px;
  width: 300px;
`;

const Content = styled.div`
  padding-left: 25px;
  text-align: center;
  width: 100%;
`;

const RatingCount = styled.div`
  width: 200px;
  text-align: center;
`;

const CreatedDate = styled.div`
  width: 290px;
`;
