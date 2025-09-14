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
  const { isHeartUpdated, setIsHeartUpdated } = useItem();
  const [isHearted, setIsHearted] = useState(false);
  const [countHeart, setCountHeart] = useState(0);

  useEffect(() => {
    if (isLogin) {
      setIsHearted(false);
      setCountHeart(heartCount);
    } else {
      setIsHearted(false);
      setCountHeart(heartCount);
    }
  }, [heartCount, id, isLogin]);

  const OnLikeClick = () => {
    if (!isHearted) {
      setIsHearted(true);
      setCountHeart(countHeart + 1);
      setIsHeartUpdated(!isHeartUpdated);
    } else {
      setIsHearted(false);
      setCountHeart(countHeart - 1);
      setIsHeartUpdated(!isHeartUpdated);
    }
  };

  return (
    <Container onClick={OnLikeClick}>
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
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-align: left;

  span {    
    font-size: 0.9rem;
    color: red;
    padding-left: 1px;
    margin-right: 5px;
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
