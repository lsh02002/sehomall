import React, { useState } from "react";
import styled from "styled-components";
import SimpleItemCard from "./SimpleItemCard";
import { itemOrderType, orderResponseType } from "../../types/type";

type orderCardPropsType = {
  order: orderResponseType;
  isOrderStatusUpdated: boolean;
  setIsOrderStatusUpdated: (o: boolean) => void;
}

const OrderCard = ({
  order,
  isOrderStatusUpdated,
  setIsOrderStatusUpdated,
}: orderCardPropsType) => {
  const [isModal, setIsModal] = useState(false);

  const OnStatusUpdated = (status: string) => {
    // ChangePaymentStatus(order.id, status)
    //   .then((res) => {
    //     // console.log(res);
    //     if (res.headers?.accesstoken) {
    //       localStorage.setItem("accessToken", res.headers?.accesstoken);
    //     }
    //     setIsOrderStatusUpdated(!isOrderStatusUpdated);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  return (
    <>
      <Container>
        <OrderInfo>
          <div>주문 아이디: {order.id}</div>
          <div>
            주문 상품: {order.items[0]?.item.name} 외 {order.items.length} 개
          </div>
          <div>작성자: {order.deliveryName}</div>
          <div>전화번호: {order.deliveryPhone}</div>
          <div>배송주소: {order.deliveryAddress}</div>
          <CreatedDate>주문 날짜: {order.createAt}</CreatedDate>
          <button
            onMouseEnter={() => setIsModal(true)}
            onMouseLeave={() => setIsModal(false)}
          >
            상품정보 보기▽
          </button>
        </OrderInfo>
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
        <OrderStatusInfo>
          <div>결제상태: {"완료 (가상)"}</div>
          <div>
            총 가격: <span>{order.productSum.toLocaleString()}원</span>
          </div>
          <div>
            주문배송상태: <span>{order.orderStatus}</span>
          </div>
        </OrderStatusInfo>
        <CancelOrComplete>
          <button
            onClick={() => OnStatusUpdated("CANCELED")}
            disabled={
              order.orderStatus === "COMPLETED" ||
              order.orderStatus === "CANCELED"
            }
          >
            주문 취소
          </button>
          <button
            onClick={() => OnStatusUpdated("COMPLETED")}
            disabled={
              order.orderStatus === "COMPLETED" ||
              order.orderStatus === "CANCELED"
            }
          >
            구입 확정
          </button>
        </CancelOrComplete>
      </Container>
    </>
  );
};

export default OrderCard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 870px;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  border: 1px solid lightgray;    

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

const OrderInfo = styled.div`
  padding: 5px;
  width: 35%;
  position: relative;
  font-size: var(--main-font-size);

  button {
    border: none;
    background-color: #fff;
    font-size: var(--button-font-size);
  }
`;

const CreatedDate = styled.div`
  width: 290px;
`;

const OrderStatusInfo = styled.div`
  width: 35%;
  margin-left: 20px;
  font-size: var(--main-font-size);

  div {    
    padding-bottom: 5px;
  }

  span {
    color: red;
  }
`;

const CancelOrComplete = styled.div`
  width: 15%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  button {
    border: none;
    margin: 10px;
    padding: 5px;
    transition: 0.2s;
    cursor: pointer;
    width: 70%;
    font-size: var(--button-font-size);

    // &:nth-child(1) {
    //   color: white;
    //   background-color: red;
    // }

    // &:nth-child(2) {
    //   color: white;
    //   background-color: gray;
    // }

    // &:hover:nth-child(1) {
    //   background-color: salmon;
    // }

    // &:hover:nth-child(2) {
    //   background-color: lightgray;
    // }
  }
`;

const Modal = styled.div`
  display: flex;
  margin-top: 150px;
  background-color: #fff;
  position: absolute;
  width: 600px;
  height: 200px;
  left: 10px;
  bottom: -190px;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 5;
  border: 1px solid gray;
`;
