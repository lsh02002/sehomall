import React, { useEffect, useState } from "react";
import styled from "styled-components";
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

  // 1) 하트 여부는 myHearts에서 파생
  useEffect(() => {
    setIsHearted(!!myHearts?.some((item) => item.id === id));
  }, [myHearts, id]);

  // 2) 카운트는 items에서 파생 (직접 변이 금지, 여기서만 동기화)
  useEffect(() => {
    const found = items.find((item) => item.id === id);
    setCountHeart(found?.heartCount ?? heartCount);
  }, [items, id, heartCount]);

  // 로그인 변화에 따른 초기화(선택적)
  useEffect(() => {
    if (!isLogin) {
      setIsHearted(false);
      setCountHeart(heartCount);
    }
  }, [isLogin, heartCount]);

  const onLikeClick = () => {
    const exists = myHearts?.some((h) => h.id === id);

    // 3) items는 불변 업데이트로 +1/-1
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, heartCount: it.heartCount + (exists ? -1 : 1) }
          : it
      )
    );

    // 4) myHearts는 함수형 업데이트로 추가/삭제 (타입 정규화로 안전)
    setMyHearts((prev) => {
      const already = prev.some((p) => String(p.id) === String(id));
      if (!already) {
        // 추가
        const toAdd = items.find((it) => it.id === id);
        return toAdd ? [...prev, toAdd] : prev;
      }
      // 삭제
      return prev.filter((p) => String(p.id) !== String(id));
    });

    // 5) 토글/업데이트 플래그
    setIsHeartUpdated((v) => !v);
  };

  return (
    <Container onClick={onLikeClick}>
      <HeartImage>
        {!isHearted ? (
          <img src={Like} alt="" />
        ) : (
          <img src={LikeSolid} alt="" />
        )}
      </HeartImage>
      <span>{countHeart}</span>
    </Container>
  );
};

export default HeartCount;

const Container = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;

  span {
    font-size: 0.9rem;
    color: red;
    padding-left: 1px;
  }
`;

const HeartImage = styled.div`
  width: 18px;
  height: 18px;
  text-align: left;
  img {
    width: 18px;
    height: 18px;
    object-fit: cover;
  }
`;
