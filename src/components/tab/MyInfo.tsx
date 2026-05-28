import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import styled from "styled-components";
import { userInfoData } from "../data/userInfoData";
import { layout } from "../../them/them";

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
  max-width: ${layout.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  
  button {
  min-width: 90px;
  height: 40px;

  padding: 0 16px;

  border: 1px solid #e5e5e5;
  border-radius: 12px;

  background: #fafafa;

  color: #333;

  font-size: var(--button-font-size);
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.04),
    0 1px 3px rgba(0, 0, 0, 0.03);

  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.25s,
    border-color 0.2s,
    color 0.2s;

  &:hover {
    background: white;

    border-color: #d0d0d0;

    transform: translateY(-1px);

    box-shadow:
      0 8px 18px rgba(0, 0, 0, 0.06),
      0 2px 6px rgba(0, 0, 0, 0.04);

    color: #111;
  }

  &:active {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
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
