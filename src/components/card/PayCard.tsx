import React from "react";
import styled from "styled-components";
import { itemCartType } from "../../types/type";

const PayCard = ({ item }: { item: itemCartType }) => {
  return (
    <Container>
      {item?.fileUrl && <img src={item?.fileUrl} alt="preview" />}
      <Info>
        <div>상품명: {item.itemName}</div>
        <div>가격: {item.price?.toLocaleString()}원</div>
        <div>수량: {item.itemCount}</div>
      </Info>
    </Container>
  );
};

export default PayCard;

const Container = styled.article`
  display: flex;
  justify-content: start;
  align-items: center;
  max-width: 600px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;  
  padding: 5px;
  padding-right: 10px;
  img {
    width: 100px;
    height: 100px;
    padding: 0px 10px;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 5px;
  font-size: var(--main-font-size);
`;
