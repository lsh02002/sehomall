import React, { useState } from "react";
import styled from "styled-components";
import SimpleItemCard from "./SimpleItemCard";

const OrderCard = ({ order }) => {
  const [isModal, setIsModal] = useState(false);
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
            {order.items.map((item, index) => (
              <SimpleItemCard key={index} item={item} />
            ))}
          </Modal>
        )}
        <OrderStatusInfo>
          <div>결제상태: {"완료 (가상)"}</div>
          <div>
            주문배송상태: <span>{order.orderStatus}</span>
          </div>
        </OrderStatusInfo>
      </Container>
    </>
  );
};

export default OrderCard;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items; center;
  max-width: 870px;
  width: 100%;  
  box-sizing: border-box;
  margin: 25px;  
  padding: 5px;
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
  width: 40%;  
  position: relative;

  button {
    border: none;
    background-color: #fff;
  }
`;

const CreatedDate = styled.div`
  width: 290px;
`;

const OrderStatusInfo = styled.div`
  width: 60%;
  margin-left: 20px 0 0 20px;

  span {
    color: red;
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
