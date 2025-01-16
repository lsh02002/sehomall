import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NoImage from "../assets/no-image.jpg";

const ReviewCard = ({ review }) => {
  return (
    <Container>
      <Link to={`/detail/${review.itemId}`}>
        <img src={review.files[0] ? review.files[0].fileUrl : NoImage} alt="" />
      </Link>
      <Info>
        <Link to={`/detail/${review.itemId}`}>
          <div>상품 아이디: {review.itemId}</div>
          <div>상품 명: {review.itemName}</div>
          <div>작성자: {review.nickname}</div>
        </Link>
      </Info>
      <Content>
        <div>내용: {review.content}</div>
      </Content>
      <RatingCount>{review.rating}</RatingCount>
      <CreatedDate>{review.createAt}</CreatedDate>
    </Container>
  );
};

export default ReviewCard;

const Container = styled.div`
display: flex;
  justify-content: start;
  align-items; center;
  max-width: 870px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 25px;
  // border: 1px solid lightgray;
  box-shadow: 2px 1px 3px rgba(0, 0, 0, 0.7);
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
