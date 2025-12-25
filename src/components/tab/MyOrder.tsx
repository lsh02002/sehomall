import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderCard from "../card/OrderCard";
import Paging from "../pagination/Paging";
import { useMyPage } from "../../api/myPageTabContextApi";
import { useItem } from "../../api/itemContextApi";
import { styled } from "styled-components";

const MyOrder = () => {
  const { myOrders } = useItem();
  const { setOrderPage } = useMyPage(); 
  const [orderTotal] = useState(0);
  const [isOrderStatusUpdated, setIsOrderStatusUpdated] = useState(false);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "3");

  useEffect(() => {
    setOrderPage(page);
  }, [page, setOrderPage]);

  return (
    <Container>
      {myOrders?.length > 0 ? (
        myOrders.map((order, index) => (
          <OrderCard
            key={index}
            order={order}
            isOrderStatusUpdated={isOrderStatusUpdated}
            setIsOrderStatusUpdated={setIsOrderStatusUpdated}
          />
        ))
      ) : (
        <div>주문내역이 없습니다.</div>
      )}
      <Paging
        to={`/mypage/ORDERS`}
        total={orderTotal}
        size={size}
        page={page}
      />
    </Container>
  );
};

export default MyOrder;

const Container = styled.div`
  width: 100%;
  max-width: 870px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
