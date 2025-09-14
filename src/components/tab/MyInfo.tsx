import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import styled from "styled-components";
import { userInfoData } from "../data/userInfoData";

const MyInfo = () => {
  const [myInfo, setMyInfo] = useState({
    nickname: "",
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    gender: "",
    birthDate: "",
    createAt: "",
  });

  useEffect(() => {
    setMyInfo(userInfoData);
  }, []);

  return (
    <Layout>
      <Container>
        <ItemInfo>          
          <TextInput>
            <span>닉네임: </span>
            <input type="text" value={myInfo.nickname} disabled />
          </TextInput>
          <TextInput>
            <span>이름: </span>
            <input type="text" value={myInfo.name} />
          </TextInput>
          <TextInput>
            <span>이메일: </span>
            <input type="text" value={myInfo.email} />
          </TextInput>
          <TextInput>
            <span>휴대전화: </span>
            <input type="text" value={myInfo.phoneNumber} />
          </TextInput>
          <TextInput>
            <span>주소: </span>
            <input type="text" value={myInfo.address} />
          </TextInput>
          <TextInput>
            <span>성별: </span>
            <input type="text" value={myInfo.gender} />
          </TextInput>
          <TextInput>
            <span>생일: </span>
            <input type="text" value={myInfo.birthDate} />
          </TextInput>
          <TextInput>
            <span>계정 생성일: </span>
            <input type="text" value={myInfo.createAt} disabled />
          </TextInput>
          <ButtonInput>
            <button>정보 수정하기</button>
          </ButtonInput>
        </ItemInfo>
      </Container>
    </Layout>
  );
};

export default MyInfo;

const Container = styled.div`
  width: 100%;
  max-width: 870px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  button {
    text-align: right;
    border: none;
    padding: 5px 10px;
    color: white;
    background-color: gray;
    transition: 0.2s;
    cursor: pointer;
    font-size: var(--button-font-size);
    &:hover {
      background-color: lightgray;
    }
  }
`;

const ItemInfo = styled.div`
  width: 100%;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding-bottom: 20px;
  & > span {
    box-sizing: border-box;
    margin: 25px 0 0 0;
    width: 100%;
    text-align: left;
    padding-left: 20px;
    padding-bottom: 10px;
    label {
      display: inline-block;
      text-align: right;
      width: 100%;
      padding-right: 20px;
      box-sizing: border-box;
    }
  }
`;

const TextInput = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 5px 20px;
  display: flex;
  & > span {
    display: inline-block;
    width: 130px;
  }
  input[type="text"] {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
  }
`;

const ButtonInput = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 20px;
`;
