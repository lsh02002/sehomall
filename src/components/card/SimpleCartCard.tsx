import React from "react";
import styled from "styled-components";
import { itemCartType } from "../../types/type";

const SimpleCartCard = ({ item }: { item: itemCartType }) => {
  return (
    <Container>
      <Info>
        <ProductImage src={item?.fileUrl} alt={item?.itemName} />

        <TextInfo>
          <ProductName>{item?.itemName}</ProductName>

          <MetaRow>
            <span>가격</span>
            <em>{item?.price?.toLocaleString()}원</em>
          </MetaRow>

          <MetaRow>
            <span>수량</span>
            <em>{item?.itemCount}개</em>
          </MetaRow>
        </TextInfo>
      </Info>
    </Container>
  );
};

export default SimpleCartCard;

const Container = styled.div`
  width: 100%;

  padding: 12px;

  border: 1px solid #efefef;
  border-radius: 18px;

  background: #fff;

  box-sizing: border-box;

  transition:
    transform 0.2s,
    box-shadow 0.2s;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.03),
    0 2px 6px rgba(0, 0, 0, 0.02);

  &:hover {
    transform: translateY(-1px);

    box-shadow:
      0 10px 22px rgba(0, 0, 0, 0.06),
      0 4px 10px rgba(0, 0, 0, 0.03);
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  min-width: 0;
`;

const ProductImage = styled.img`
  width: 72px;
  height: 72px;

  object-fit: cover;

  border-radius: 16px;

  background: #f5f5f5;

  flex-shrink: 0;

  display: block;
`;

const TextInfo = styled.div`
  flex: 1;

  min-width: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductName = styled.div`
  margin-bottom: 10px;

  font-size: 15px;
  font-weight: 800;

  color: #111;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2px 0;

  span {
    color: #888;

    font-size: 12px;
    font-weight: 600;
  }

  em {
    font-style: normal;

    color: #111;

    font-size: 13px;
    font-weight: 700;
  }
`;
