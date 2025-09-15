import React from "react";
import styled from "styled-components";
import MyInfo from "./MyInfo";
import { useNavigate } from "react-router-dom";
import MyReview from "./MyReview";
import MyHeart from "./MyHeart";
import MyOrder from "./MyOrder";
import { useMyPage } from "../../api/myPageTabContextApi";

const MyPageTab = ({ cate }: { cate: string | undefined }) => {
  const { reviewPage, heartPage, orderPage } = useMyPage();
  const navigate = useNavigate();

  const OnReviewTabClick = (cat: string, page: number) => {
    navigate(`/mypage/${cat}?page=${page}&size=4`);
  };

  const OnHeartTabClick = (cat: string, page: number) => {
    navigate(`/mypage/${cat}?page=${page}&size=6`);
  };

  const OnOrderTabClick = (cat: string, page: number) => {
    navigate(`/mypage/${cat}?page=${page}&size=3`);
  };

  const OnInfoTabClick = (cat: string) => {
    navigate(`/mypage/${cat}`);
  };

  return (
    <TabInner>
      <ul className="mybtn">
        <li
          className={`${cate === "REVIEWS" ? "active" : ""}`}
          onClick={() => OnReviewTabClick("REVIEWS", reviewPage)}
        >
          나의 리뷰
        </li>
        <li
          className={`${cate === "HEARTS" ? "active" : ""}`}
          onClick={() => OnHeartTabClick("HEARTS", heartPage)}
        >
          내가 찜한 상품
        </li>
        <li
          className={`${cate === "ORDERS" ? "active" : ""}`}
          onClick={() => OnOrderTabClick("ORDERS", orderPage)}
        >
          주문 내역
        </li>
        <li
          className={`${cate === "MYINFO" ? "active" : ""}`}
          onClick={() => OnInfoTabClick("MYINFO")}
        >
          프로필
        </li>
      </ul>
      <div className="mytabs">
        {cate === "REVIEWS" && (
          <div id="mytab1">
            <Content>
              <MyReview />
            </Content>
          </div>
        )}
        {cate === "HEARTS" && (
          <div id="mytab2">
            <Content>
              <MyHeart />
            </Content>
          </div>
        )}
        {cate === "ORDERS" && (
          <div id="mytab3">
            <Content>
              <MyOrder />
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
  width: 100vw;
  max-width: 870px;
  height: 900px;  

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
    font-size: var(--button-font-size);
  }

  .mybtn li:last-child {
    width: 190px;
    border-right: none;
  }

  .mybtn li:hover,
  .mybtn li.active {
    background-color: #fff;
    border-top: 2px solid red;
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
  font-size: var(--main-font-size);
  em {
    display: inline-block;
    text-align: left;
    width: 100%;
    padding-left: 100px;
  }
`;
