import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { itemOrderType } from "../../types/type";

const SimpleItemCard = ({ item }: { item: itemOrderType }) => {
  return (
    <Container>
      <StyledLink to={`/detail/${item.item?.id}`}>
        <ProductImage
          src={item.item?.files?.[0]?.fileUrl}
          alt={item.item?.name}
        />

        <Info>
          <ProductName>{item.item?.name}</ProductName>

          <MetaRow>
            <span>가격</span>
            <em>{item.item?.price?.toLocaleString()}원</em>
          </MetaRow>

          <MetaRow>
            <span>수량</span>
            <em>{item.count}개</em>
          </MetaRow>
        </Info>
      </StyledLink>
    </Container>
  );
};

export default SimpleItemCard;

const Container = styled.article`
  width: 180px;

  padding: 12px;

  border: 1px solid #efefef;
  border-radius: 20px;

  background: #fff;

  box-sizing: border-box;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.03),
    0 2px 6px rgba(0, 0, 0, 0.02);

  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 12px 26px rgba(0, 0, 0, 0.06),
      0 4px 10px rgba(0, 0, 0, 0.03);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  display: flex;
  flex-direction: column;

  gap: 14px;
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;

  object-fit: cover;

  border-radius: 16px;

  background: #f5f5f5;

  display: block;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  min-width: 0;
`;

const ProductName = styled.div`
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
