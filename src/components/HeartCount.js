import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LoginContext } from "../api/loginContextApi";
import { DeleteHeart, InsertHeart, IsHearted } from "../api/ItemApi";
import Like from "../assets/heart.svg";
import LikeSolid from "../assets/heart-solid.svg";

const HeartCount = ({ id, heartCount }) => {
  const { isLogin, isHeartUpdated, setIsHeartUpdated } =
    useContext(LoginContext);
  const [isHearted, setIsHearted] = useState(false);
  const [countHeart, setCountHeart] = useState(0);

  useEffect(() => {
    if (isLogin) {
      IsHearted(id)
        .then((res) => {
          // console.log(res);
          setIsHearted(res.data);
          setCountHeart(heartCount);

          if (
            res.headers?.accesstoken && res.headers?.accesstoken !== localStorage.getItem("accessToken")
          ) {
            localStorage.setItem("accessToken", res.headers?.accesstoken);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setIsHearted(false);
      setCountHeart(heartCount);
    }
  }, [heartCount, id, isLogin]);

  const OnLikeClick = () => {
    if (!isHearted) {
      InsertHeart(id)
        .then((res) => {
          // console.log(res);
          setIsHearted(true);
          setCountHeart(countHeart + 1);
          setIsHeartUpdated(!isHeartUpdated);

          if (
            res.headers?.accesstoken && res.headers?.accesstoken !== localStorage.getItem("accessToken")
          ) {
            localStorage.setItem("accessToken", res.headers?.accesstoken);
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            alert(err.response.data.detailMessage);
          }
        });
    } else {
      DeleteHeart(id)
        .then((res) => {
          // console.log(res);
          setIsHearted(false);
          setCountHeart(countHeart - 1);
          setIsHeartUpdated(!isHeartUpdated);

          if (
            res.headers?.accesstoken && res.headers?.accesstoken !== localStorage.getItem("accessToken")
          ) {
            localStorage.setItem("accessToken", res.headers?.accesstoken);
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            alert(err.response.data.detailMessage);
          }
        });
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
  width: 170px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  span {
    color: red;
    padding-left: 5px;
    margin-right: 5px;
  }
`;

const HeartImage = styled.div`
  width: 24px;
  height: 24px;
  text-align: left;
  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
  }
`;
