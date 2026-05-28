import React from "react";
import styled from "styled-components";
import MyInfo from "./MyInfo";
import { useNavigate } from "react-router-dom";
import MyReview from "./MyReview";
import MyHeart from "./MyHeart";
import MyOrder from "./MyOrder";
import { useMyPage } from "../../api/myPageTabContextApi";
import { layout } from "../../them/them";

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
  width: 100%;
  height: 100%;
  max-width: ${layout.maxWidth};
  min-height: 600px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;

  .mybtn {
    list-style: none;
    padding: 6px;
    margin: 0 0 24px 0;

    display: inline-flex;
    align-items: center;
    gap: 8px;

    background: #f5f5f5;
    border-radius: 999px;

    box-shadow:
      inset 0 1px 2px rgba(0, 0, 0, 0.05),
      0 4px 12px rgba(0, 0, 0, 0.04);
  }

  .mybtn li {
    min-width: 140px;
    height: 48px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 20px;
    border-radius: 999px;

    cursor: pointer;

    font-size: var(--button-font-size);
    font-weight: 600;

    color: #666;
    background: transparent;

    transition:
      background 0.25s,
      color 0.25s,
      transform 0.2s,
      box-shadow 0.25s;

    user-select: none;
  }

  .mybtn li:last-child {
    min-width: 170px;
  }

  .mybtn li:hover {
    background: rgba(255, 255, 255, 0.8);
    color: #111;
    transform: translateY(-1px);
  }

  .mybtn li.active {
    background: #fff;
    color: #e60023;

    box-shadow:
      0 6px 18px rgba(230, 0, 35, 0.15),
      0 2px 6px rgba(0, 0, 0, 0.06);

    transform: translateY(-1px);
  }

  .mytabs > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    .mybtn {
      width: 100%;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .mybtn::-webkit-scrollbar {
      display: none;
    }

    .mybtn li {
      min-width: 120px;
      flex-shrink: 0;
      font-size: 14px;
    }
  }
`;

const Content = styled.div`
  background: #fff;

  gap: 20px;
  
  box-sizing: border-box;

  width: 100%;
  max-width: ${layout.maxWidth};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  font-size: var(--main-font-size);

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.03);

  em {
    display: inline-block;
    text-align: left;
    width: 100%;
    padding-left: 20px;
    color: #666;
    font-style: normal;
  }
`;
