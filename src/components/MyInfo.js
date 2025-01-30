import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { GetUserInfo } from "../api/ItemApi";

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
    GetUserInfo()
      .then((res) => {
        console.log(res);
        setMyInfo(res.data);

        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Layout>
      <Container>
        <ItemInfo>
          <span>프로필</span>
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
  box-sizing: border-box;
`;

const ItemInfo = styled.div`
  width: 50%;
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

  h3 {
    padding-left: 20px;
    color: red;
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
