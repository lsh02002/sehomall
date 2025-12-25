import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { itemOrderType } from "../../types/type";

const SimpleItemCard = ({ item }: { item: itemOrderType }) => {
  return (
    <Container>
      <Link to={`/detail/${item.item?.id}`}>
        <Info>
          <img src={item.item?.files[0].fileUrl} alt="" />
          <div>상품명: {item.item?.name}</div>
          <div>가격: {item.item?.price?.toLocaleString()}원</div>
          <div>수량: {item.count}</div>
        </Info>
      </Link>
    </Container>
  );
};

export default SimpleItemCard;

const Container = styled.article`
  display: flex;
  justify-content: start;
  align-items: center;
  max-width: 600px;
  width: 140px;
  overflow: hidden;
  box-sizing: border-box;  
  padding: 5px 0;
`;

const Info = styled.div`
  img {
    width: 60px;
    height: 60px;
    padding: 0px 10px;
    object-fit: cover;
  }
`;
