import React, { useState } from "react";
import styled from "styled-components";
import SimpleItemCard from "./SimpleItemCard";
import { itemOrderType, orderResponseType } from "../../types/type";
import { layout } from "../../them/them";

type orderCardPropsType = {
  order: orderResponseType;
  isOrderStatusUpdated: boolean;
  setIsOrderStatusUpdated: (o: boolean) => void;
};

const OrderCard = ({
  order,
  isOrderStatusUpdated,
  setIsOrderStatusUpdated,
}: orderCardPropsType) => {
  const [isModal, setIsModal] = useState(false);

  const OnStatusUpdated = (status: string) => {
    console.log(status);
    setIsOrderStatusUpdated(!isOrderStatusUpdated);
  };

  const isDisabled =
    order.orderStatus === "COMPLETED" || order.orderStatus === "CANCELED";

  return (
    <Container>
      <OrderInfo>
        <OrderBadge>ORDER #{order.id}</OrderBadge>

        <ProductTitle>
          {order.items[0]?.item?.name} 외 {order.items?.length}개
        </ProductTitle>

        <InfoRow>
          <span>주문자</span>
          <em>{order.deliveryName}</em>
        </InfoRow>

        <InfoRow>
          <span>전화번호</span>
          <em>{order.deliveryPhone}</em>
        </InfoRow>

        <InfoRow>
          <span>배송주소</span>
          <em>{order.deliveryAddress}</em>
        </InfoRow>

        <CreatedDate>주문 날짜: {order.createAt}</CreatedDate>

        <ViewButton
          onMouseEnter={() => setIsModal(true)}
          onMouseLeave={() => setIsModal(false)}
        >
          상품정보 보기
        </ViewButton>

        {isModal && (
          <Modal
            onMouseEnter={() => setIsModal(true)}
            onMouseLeave={() => setIsModal(false)}
          >
            {order.items.map((item: itemOrderType, index: number) => (
              <SimpleItemCard key={index} item={item} />
            ))}
          </Modal>
        )}
      </OrderInfo>

      <OrderStatusInfo>
        <StatusBox>
          <span>결제상태</span>
          <strong>완료</strong>
        </StatusBox>

        <StatusBox>
          <span>총 가격</span>
          <strong className="price">
            {order.productSum.toLocaleString()}원
          </strong>
        </StatusBox>

        <StatusBox>
          <span>주문배송상태</span>
          <StatusText status={order.orderStatus}>
            {order.orderStatus}
          </StatusText>
        </StatusBox>
      </OrderStatusInfo>

      <CancelOrComplete>
        <CancelButton
          onClick={() => OnStatusUpdated("CANCELED")}
          disabled={isDisabled}
        >
          주문 취소
        </CancelButton>

        <CompleteButton
          onClick={() => OnStatusUpdated("COMPLETED")}
          disabled={isDisabled}
        >
          구입 확정
        </CompleteButton>
      </CancelOrComplete>
    </Container>
  );
};

export default OrderCard;

const Container = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};

  margin: 16px auto;
  padding: 24px;

  display: grid;
  grid-template-columns: 1.4fr 1fr 160px;
  gap: 28px;
  align-items: center;

  position: relative;

  border: 1px solid #eee;
  border-radius: 24px;

  background: #fff;

  box-sizing: border-box;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.03);

  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 16px 36px rgba(0, 0, 0, 0.07),
      0 4px 12px rgba(0, 0, 0, 0.04);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;

const OrderInfo = styled.div`
  position: relative;

  min-width: 0;

  font-size: var(--main-font-size);
`;

const OrderBadge = styled.div`
  display: inline-flex;
  align-items: center;

  height: 28px;

  padding: 0 12px;

  margin-bottom: 12px;

  border-radius: 999px;

  background: #f5f5f5;

  color: #777;

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const ProductTitle = styled.div`
  margin-bottom: 18px;

  font-size: 20px;
  font-weight: 800;

  color: #111;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 14px;

  margin-bottom: 8px;

  span {
    width: 72px;
    flex-shrink: 0;

    color: #888;

    font-size: 14px;
    font-weight: 600;
  }

  em {
    min-width: 0;

    color: #333;

    font-style: normal;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const CreatedDate = styled.div`
  margin-top: 10px;

  color: #999;

  font-size: 13px;
`;

const ViewButton = styled.button`
  margin-top: 16px;

  height: 38px;

  padding: 0 16px;

  border: none;
  border-radius: 999px;

  background: #111;

  color: #fff;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    transform: translateY(-1px);
    background: #333;
  }
`;

const OrderStatusInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatusBox = styled.div`
  padding: 16px 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 18px;

  background: #fafafa;

  span {
    color: #777;

    font-size: 14px;
    font-weight: 600;
  }

  strong {
    color: #111;

    font-size: 15px;
  }

  .price {
    color: #e60023;
  }
`;

const StatusText = styled.strong<{ status: string }>`
  color: ${({ status }) =>
    status === "COMPLETED"
      ? "#16a34a"
      : status === "CANCELED"
        ? "#e60023"
        : "#111"} !important;
`;

const CancelOrComplete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 900px) {
    flex-direction: row;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  height: 46px;

  border: none;
  border-radius: 14px;

  font-size: var(--button-font-size);
  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.2s,
    opacity 0.2s,
    background 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(ActionButton)`
  background: #fff1f1;
  color: #e60023;

  &:hover:not(:disabled) {
    background: #e60023;
    color: #fff;
  }
`;

const CompleteButton = styled(ActionButton)`
  background: #111;
  color: #fff;

  &:hover:not(:disabled) {
    background: #333;
  }
`;

const Modal = styled.div`
  position: absolute;

  left: 0;
  top: calc(100% + 12px);

  width: min(620px, 90vw);
  max-height: 260px;

  padding: 18px;

  display: flex;
  gap: 14px;

  overflow-x: auto;
  overflow-y: hidden;

  background: #fff;

  border: 1px solid #eee;
  border-radius: 20px;

  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.06);

  box-sizing: border-box;

  z-index: 20;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 999px;
  }
`;
