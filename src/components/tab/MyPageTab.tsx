import React from "react";
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

  const tabs = [
    {
      key: "REVIEWS",
      label: "나의 리뷰",
      onClick: () => navigate(`/mypage/REVIEWS?page=${reviewPage}&size=4`),
      component: <MyReview />,
    },
    {
      key: "HEARTS",
      label: "내가 찜한 상품",
      onClick: () => navigate(`/mypage/HEARTS?page=${heartPage}&size=6`),
      component: <MyHeart />,
    },
    {
      key: "ORDERS",
      label: "주문 내역",
      onClick: () => navigate(`/mypage/ORDERS?page=${orderPage}&size=3`),
      component: <MyOrder />,
    },
    {
      key: "MYINFO",
      label: "프로필",
      onClick: () => navigate(`/mypage/MYINFO`),
      component: <MyInfo />,
    },
  ];

  const activeTab = tabs.find((tab) => tab.key === cate);

  return (
    <div
      className="w-100 h-100 mx-auto mt-4"
      style={{
        maxWidth: layout.maxWidth,
        minHeight: "600px",
        boxSizing: "border-box",
      }}
    >
      {/* TAB BUTTONS */}
      <ul
        className="
          list-unstyled
          d-inline-flex align-items-center gap-2
          p-2 mb-4
          rounded-pill bg-light
          overflow-auto
        "
        style={{
          boxShadow:
            "inset 0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)",
          scrollbarWidth: "none",
        }}
      >
        {tabs.map((tab) => {
          const isActive = cate === tab.key;

          return (
            <li
              key={tab.key}
              onClick={tab.onClick}
              className="d-flex justify-content-center align-items-center rounded-pill fw-semibold"
              style={{
                minWidth: tab.key === "MYINFO" ? "170px" : "140px",
                height: "48px",
                padding: "0 20px",
                cursor: "pointer",
                userSelect: "none",
                transition: "0.25s",
                flexShrink: 0,
                color: isActive ? "#e60023" : "#666",
                background: isActive ? "#fff" : "transparent",
                boxShadow: isActive
                  ? "0 6px 18px rgba(230,0,35,0.15), 0 2px 6px rgba(0,0,0,0.06)"
                  : "none",
                transform: isActive ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>

      {/* CONTENT */}
      <div
        className="
          bg-white
          w-100
          d-flex justify-content-center align-items-center
          flex-wrap
        "
        style={{
          maxWidth: layout.maxWidth,
          gap: "20px",
          fontSize: "var(--main-font-size)",
          boxSizing: "border-box",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        {activeTab?.component}
      </div>
    </div>
  );
};

export default MyPageTab;
