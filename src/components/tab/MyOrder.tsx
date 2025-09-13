import React, { useEffect, useState } from "react";
import { GetMyPayments } from "../../api/sehomallApi";
import { useSearchParams } from "react-router-dom";
import OrderCard from "../card/OrderCard";
import Paging from "../pagination/Paging";
import { useMyPage } from "../../api/myPageTabContextApi";

const MyOrder = () => {
  const { setOrderPage } = useMyPage();
  const [myOrders, setMyOrders] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [isOrderStatusUpdated, setIsOrderStatusUpdated] = useState(false);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "3");

  useEffect(() => {
    setOrderPage(page);
  }, [page, setOrderPage]);

  useEffect(() => {
    GetMyPayments(page, size)
      .then((res) => {
        console.log(res);
        setMyOrders(res.data.content);
        setOrderTotal(res.data.totalElements);

        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isOrderStatusUpdated, setIsOrderStatusUpdated, size, page]);

  return (
    <>
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
    </>
  );
};

export default MyOrder;
