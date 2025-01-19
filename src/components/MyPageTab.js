import React from "react";
import styled from "styled-components";
import ReviewCard from "./ReviewCard";
import CardOne from "./CardOne";
import MyInfo from "./MyInfo";
import { useNavigate } from "react-router-dom";
import OrderCard from "./OrderCard";

const MyPageTab = ({ cate, myReviews, myHearts, myOrders }) => {
    const navigate = useNavigate();
  

  const OnTabClick = (cat) => {
    navigate(`/mypage?cate=${cat}`);
  };
  return (
    <TabInner>
      <ul className="mybtn">
        <li
          className={`${cate === "REVIEWS" ? "active" : ""}`}
          onClick={() => OnTabClick("REVIEWS")}
        >
          나의 리뷰 ({myReviews?.length})
        </li>
        <li
          className={`${cate === "HEARTS" ? "active" : ""}`}
          onClick={() => OnTabClick("HEARTS")}
        >
          내가 찜한 상품 ({myHearts?.length})
        </li>
        <li
          className={`${cate === "ORDERS" ? "active" : ""}`}
          onClick={() => OnTabClick("ORDERS")}
        >
          주문 내역 ({myOrders.length})
        </li>
        <li
          className={`${cate === "MYINFO" ? "active" : ""}`}
          onClick={() => OnTabClick("MYINFO")}
        >
          프로필
        </li>
      </ul>
      <div className="mytabs">
        {cate === "REVIEWS" && (
          <div id="mytab1">
            <Content>
              {myReviews?.length > 0 &&
                myReviews.map((review, index) => <ReviewCard key={index} review={review} />)}
            </Content>
          </div>
        )}
        {cate === "HEARTS" && (
          <div id="mytab2">
            <Content>
              {myHearts?.length > 0 &&
                myHearts.map((item, index) => <CardOne key={index} item={item} />)}
            </Content>
          </div>
        )}
        {cate === "ORDERS" && (
          <div id="mytab3">
            <Content>
            {myOrders?.length > 0 ?
                myOrders.map((order, index) => <OrderCard key={index} order={order} />) : <div>주문내역이 없습니다.</div>}
            </Content>
          </div>
        )}
        {cate === "MYINFO" && (
          <div id="mytab4">
            <Content>
                <MyInfo />
            </Content>
          </div>
        )}
      </div>
    </TabInner>
  );
};

export default MyPageTab;

const TabInner = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1400px;  

  .mybtn {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    margin-left: 10px;
  }

  .mybtn li {
    float: left;
    width: 150px;
    text-align: center;
    cursor: pointer;
    background-color: #eee;
    border-right: 1px solid #ddd;
    padding: 10px;
    border-top: 2px solid transparent;
  }

  .mybtn li:last-child {
    width: 190px;
    border-right: none;
  }

  .mybtn li:hover,
  .mybtn li.active {
    background-color: #fff;
    border-top: 2px solid crimson;
  }

  .mytabs > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div`
  padding-top: 30px;
  max-width: 870px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  em {
    display: inline-block;
    text-align: left;
    width: 100%;
    padding-left: 100px;
  }
`;
