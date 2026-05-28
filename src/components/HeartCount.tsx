import React, { useEffect, useState } from "react";
import { useLogin } from "../api/loginContextApi";
import Like from "../assets/heart.svg";
import LikeSolid from "../assets/heart-solid.svg";
import { useItem } from "../api/itemContextApi";

type HeartCountPropsType = {
  id: number;
  heartCount: number;
};

const HeartCount = ({ id, heartCount }: HeartCountPropsType) => {
  const { isLogin } = useLogin();

  const { myHearts, setMyHearts, items, setItems, setIsHeartUpdated } =
    useItem();

  const [isHearted, setIsHearted] = useState(false);
  const [countHeart, setCountHeart] = useState(heartCount);

  // 하트 여부 동기화
  useEffect(() => {
    setIsHearted(!!myHearts?.some((item) => item.id === id));
  }, [myHearts, id]);

  // 좋아요 수 동기화
  useEffect(() => {
    const found = items.find((item) => item.id === id);

    setCountHeart(found?.heartCount ?? heartCount);
  }, [items, id, heartCount]);

  // 로그아웃 시 초기화
  useEffect(() => {
    if (!isLogin) {
      setIsHearted(false);
      setCountHeart(heartCount);
    }
  }, [isLogin, heartCount]);

  const onLikeClick = () => {
    const exists = myHearts?.some((h) => h.id === id);

    // item 업데이트
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              heartCount: it.heartCount + (exists ? -1 : 1),
            }
          : it,
      ),
    );

    // myHearts 업데이트
    setMyHearts((prev) => {
      const already = prev.some((p) => String(p.id) === String(id));

      if (!already) {
        const toAdd = items.find((it) => it.id === id);

        return toAdd ? [...prev, toAdd] : prev;
      }

      return prev.filter((p) => String(p.id) !== String(id));
    });

    // 상태 업데이트
    setIsHeartUpdated((v) => !v);
  };

  return (
    <div
      onClick={onLikeClick}
      className="
        d-flex align-items-center
        cursor-pointer
      "
      style={{
        width: "36px",
        height: "100%",
        marginRight: "5px",
        gap: "2px",
        cursor: "pointer",
      }}
    >
      {/* ICON */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "22px",
          height: "18px",
        }}
      >
        <img
          src={!isHearted ? Like : LikeSolid}
          alt="heart"
          style={{
            width: "1rem",
            height: "1rem",
            objectFit: "cover",
          }}
        />
      </div>

      {/* COUNT */}
      <span
        className="fw-semibold"
        style={{
          fontSize: "0.9rem",
          color: "red",
          lineHeight: "0.9rem",
        }}
      >
        ({countHeart})
      </span>
    </div>
  );
};

export default HeartCount;
