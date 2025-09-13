import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/loginContextApi";
import { useMyPage } from "../api/myPageTabContextApi";
import Layout from "../components/layout/Layout";
import { userInfoData } from "../components/data/userInfoData";

const LoginPage = () => {
  const { setIsLogin } = useLogin();
  const { setReviewPage, setHeartPage, setOrderPage } = useMyPage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const OnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");
    setEmail(e.target.value);
  };

  const OnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");
    setPassword(e.target.value);
  };

  const OnLogin = () => {
    console.log("login ", userInfoData);
    localStorage.setItem("nickname", userInfoData.nickname);

    setReviewPage(1);
    setHeartPage(1);
    setOrderPage(1);

    setIsLogin(true);
    navigate("/");
  };

  return (
    <Layout>
      <Main>
        <Title>LOGIN</Title>
        <Email>
          <div>이메일</div>
          <input
            type="email"
            value={email}
            onChange={(e) => OnEmailChange(e)}
          />
        </Email>
        <Password>
          <div>패스워드</div>
          <input
            type="password"
            value={password}
            onChange={(e) => OnPasswordChange(e)}
          />
        </Password>
        {errMessage && <Error>{errMessage}</Error>}
        <Login onClick={OnLogin}>로그인</Login>
      </Main>
    </Layout>
  );
};

export default LoginPage;

const Main = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 360px;
  border: 1px solid lightgray;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-weight: normal;
  margin: 5px;
`;

const Email = styled.div`
  width: 100%;
  overflow: hidden;
  div {
    font-size: 14px;
  }
  input[type="email"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Password = styled.div`
  padding-top: 20px;
  width: 100%;
  overflow: hidden;
  div {
    font-size: 14px;
  }
  input[type="password"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Login = styled.button`
  margin-top: 20px;
  width: 100%;
  border: none;
  padding: 10px;
  background-color: gray;
  cursor: pointer;
  color: white;
  transition: 0.2s;
  &:hover {
    background-color: lightgray;
  }
`;

const Error = styled.span`
  color: red;
  padding: 20px 0 0 0;
`;
