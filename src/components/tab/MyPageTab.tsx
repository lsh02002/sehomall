import React, { useRef } from "react";
import MyInfo from "./MyInfo";
import { useNavigate } from "react-router-dom";
import MyReview from "./MyReview";
import MyHeart from "./MyHeart";
import MyOrder from "./MyOrder";
import { useMyPage } from "../../api/myPageTabContextApi";
import { layout } from "../../theme/theme";

const MyPageTab = ({ cate }: { cate: string | undefined }) => {
  const { reviewPage, heartPage, orderPage } = useMyPage();
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLUListElement | null>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(false);

  const handleClick = (callback: () => void) => {
    if (moved.current) return;
    callback();
  };

  return (
    <div
      className="w-100 h-100 mx-auto mt-4"
      style={{
        maxWidth: layout.maxWidth,
        minHeight: "600px",
        boxSizing: "border-box",
        minWidth: 0,
      }}
    >
      <ul
        ref={scrollRef}
        className="
          list-unstyled
          d-flex align-items-center gap-2
          p-2 mb-4
          rounded-pill bg-light
          overflow-auto
          w-100
        "
        style={{
          overflowY: "hidden",
          whiteSpace: "nowrap",
          cursor: "grab",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          boxShadow:
            "inset 0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)",
        }}
        onMouseDown={(e) => {
          if (!scrollRef.current) return;

          moved.current = false;
          startX.current = e.pageX;
          scrollLeft.current = scrollRef.current.scrollLeft;

          const onMouseMove = (moveEvent: MouseEvent) => {
            if (!scrollRef.current) return;

            moveEvent.preventDefault();

            const walk = moveEvent.pageX - startX.current;

            if (Math.abs(walk) > 5) {
              moved.current = true;
            }

            scrollRef.current.scrollLeft = scrollLeft.current - walk;
          };

          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };

          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      >
        <li
          onClick={() =>
            handleClick(() =>
              navigate(`/mypage/REVIEWS?page=${reviewPage}&size=4`),
            )
          }
          className="d-flex justify-content-center align-items-center rounded-pill fw-semibold"
          style={tabStyle(cate === "REVIEWS")}
        >
          나의 리뷰
        </li>

        <li
          onClick={() =>
            handleClick(() =>
              navigate(`/mypage/HEARTS?page=${heartPage}&size=6`),
            )
          }
          className="d-flex justify-content-center align-items-center rounded-pill fw-semibold"
          style={tabStyle(cate === "HEARTS")}
        >
          내가 찜한 상품
        </li>

        <li
          onClick={() =>
            handleClick(() =>
              navigate(`/mypage/ORDERS?page=${orderPage}&size=3`),
            )
          }
          className="d-flex justify-content-center align-items-center rounded-pill fw-semibold"
          style={tabStyle(cate === "ORDERS")}
        >
          주문 내역
        </li>

        <li
          onClick={() => handleClick(() => navigate(`/mypage/MYINFO`))}
          className="d-flex justify-content-center align-items-center rounded-pill fw-semibold"
          style={{
            ...tabStyle(cate === "MYINFO"),
            minWidth: "170px",
          }}
        >
          프로필
        </li>
      </ul>

      <div
        className="bg-white w-100 d-flex justify-content-center align-items-center flex-wrap"
        style={{
          maxWidth: layout.maxWidth,
          gap: "20px",
          boxSizing: "border-box",
          fontSize: "var(--main-font-size)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        {cate === "REVIEWS" && <MyReview />}
        {cate === "HEARTS" && <MyHeart />}
        {cate === "ORDERS" && <MyOrder />}
        {cate === "MYINFO" && <MyInfo />}
      </div>
    </div>
  );
};

const tabStyle = (isActive: boolean): React.CSSProperties => ({
  minWidth: "140px",
  height: "48px",
  padding: "0 20px",
  cursor: "pointer",
  userSelect: "none",
  transition: "0.25s",
  flex: "0 0 auto",
  fontSize: "var(--button-font-size)",
  color: isActive ? "#e60023" : "#666",
  background: isActive ? "#fff" : "transparent",
  boxShadow: isActive
    ? "0 6px 18px rgba(230,0,35,0.15), 0 2px 6px rgba(0,0,0,0.06)"
    : "none",
  transform: isActive ? "translateY(-1px)" : "translateY(0)",
});

export default MyPageTab;
