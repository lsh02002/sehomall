import React from "react";
import styled from "styled-components";
import { itemCartType } from "../../types/type";
import { layout } from "../../them/them";

const PayCard = ({ item }: { item: itemCartType }) => {
  return (
    <Container>
      <ImageWrapper>
        {item?.fileUrl && (
          <ProductImage src={item.fileUrl} alt={item.itemName} />
        )}
      </ImageWrapper>

      <Info>
        <div>
          <ProductName>{item.itemName}</ProductName>

          <InfoRow>
            <span>가격</span>
            <em>{item.price?.toLocaleString()}원</em>
          </InfoRow>

          <InfoRow>
            <span>수량</span>
            <em>{item.itemCount}개</em>
          </InfoRow>
        </div>

        <TotalPrice>
          <span>최종 결제 금액</span>
          <strong>{(item.price * item.itemCount).toLocaleString()}원</strong>
        </TotalPrice>
      </Info>
    </Container>
  );
};

export default PayCard;

const Container = styled.article`
  width: 100%;
  max-width: ${layout.maxWidth};

  margin-top: 20px;

  display: flex;
  align-items: center;
  gap: 24px;

  background: transparent;

  box-sizing: border-box;

  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 14px 34px rgba(0, 0, 0, 0.07),
      0 4px 12px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    gap: 16px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;

  object-fit: cover;

  border-radius: 20px;

  background: #f4f4f4;

  display: block;

  @media (max-width: 768px) {
    width: 96px;
    height: 96px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 220px;
  }
`;

const Info = styled.div`
  flex: 1;

  min-width: 0;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  margin: 0 0 18px 0;

  font-size: 22px;
  font-weight: 800;

  color: #111;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;

  border-bottom: 1px solid #f1f1f1;

  span {
    color: #888;

    font-size: 14px;
    font-weight: 600;
  }

  em {
    font-style: normal;

    color: #111;

    font-size: 15px;
    font-weight: 700;
  }
`;

const TotalPrice = styled.div`
  margin-top: 24px;

  padding: 18px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 18px;

  background: linear-gradient(135deg, #fafafa, #f3f3f3);

  span {
    color: #666;

    font-size: 14px;
    font-weight: 700;
  }

  strong {
    color: #e60023;

    font-size: 22px;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    strong {
      font-size: 18px;
    }
  }
`;
