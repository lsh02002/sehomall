import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LoginContext } from "../api/loginContextApi";
import { DeleteHeart, InsertHeart, IsHearted } from "../api/ItemApi";
import Like from "../assets/heart.svg";
import LikeSolid from "../assets/heart-solid.svg";

const HeartCount = ({ id, heartCount, isClicked }) => {
  const { isLogin } = useContext(LoginContext);
  const [isHearted, setIsHearted] = useState(false);
  const [countHeart, setCountHeart] = useState(0);

  useEffect(() => {
    if (isLogin) {
      IsHearted(id)
        .then((res) => {
          console.log("heart:" + heartCount);
          setIsHearted(res.data);
          setCountHeart(heartCount);
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
    if (!isLogin) {
      alert("좋아요 기능은 로그인을 하셔야 합니다.");
      return;
    }
    if (!isHearted) {
      InsertHeart(id)
        .then((res) => {
          console.log(res);
          setIsHearted(true);
          setCountHeart(countHeart + 1);
        })
        .catch((err) => {
          console.error(err);
          if(err.response){
            alert(err.response.data.detailMessage);
          }
        });
    } else {
      DeleteHeart(id)
        .then((res) => {
          console.log(res);
          setIsHearted(false);
          setCountHeart(countHeart - 1);
        })
        .catch((err) => {
          console.error(err);
          if(err.response){
            alert(err.response.data.detailMessage);
          }
        });
    }
  };

  return (
    <Container>
      <HeartImage>
        {!isHearted ? (
          <img src={Like} alt="" />
        ) : (
          <img src={LikeSolid} alt="" />
        )}
      </HeartImage>
      <span>{countHeart}</span>
      {isClicked && <button onClick={OnLikeClick}>찜 누르기</button>}
    </Container>
  );
};

export default HeartCount;

const Container = styled.div`
  width: 160px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;    
  span {
    color: red;
    padding-left: 15px;
    margin-right: 10px;
  }
  button {
    border: none;
    width: 130px;  
    background-color: red;
    color: white;
    cursor: pointer;
    padding: 2px 5px;
    &:hover {
      background-color: rgba(255, 0, 0, 0.8);
    }
`;

const HeartImage = styled.div`
  right: 10px;
  width: 24px;
  height: 24px;
  text-align: left;
  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
  }
`;
