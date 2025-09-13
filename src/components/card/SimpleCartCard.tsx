import React from "react";
import styled from "styled-components";
import { itemCartType } from "../../types/type";

const SimpleCartCard = ({ item }: { item: itemCartType }) => {
  return (
    <Container>
      <Info>
        <img src={item?.fileUrl} alt="" />
        <TextInfo>
          <div>상품명: {item?.itemName}</div>
          <div>가격: {item?.price?.toLocaleString()}원</div>
          <div>수량: {item?.count}</div>
        </TextInfo>
      </Info>
    </Container>
  );
};

export default SimpleCartCard;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items; center;  
  box-sizing: border-box;  
  padding: 5px 0;
  width: 100%;
  z-index: 10;
`;

const Info = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
    padding: 0px 10px;
    object-fit: cover;
  }
`;

const TextInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
`;
