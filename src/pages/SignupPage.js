import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { UserSignup } from "../api/ItemApi";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [state, setState] = useState({
    email: "",
    name: "",
    nickname: "",
    phoneNumber: "",
    address: "",
    gender: "남성",
    birthDate: "",
    password: "",
    passwordConfirm: "",
  });

  const [errMessage, setErrMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const OnFieldChange = (e) => {
    setErrMessage("");
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const OnSignup = () => {
    const data = {
      email: state.email,
      name: state.name,
      password: state.password,
      passwordConfirm: state.passwordConfirm,
      nickname: state.nickname,
      phoneNumber: state.phoneNumber,
      address: state.address,
      gender: state.gender,
      birthDate: state.birthDate,
    };

    UserSignup(data)
      .then((res) => {
        // console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setErrMessage(err.response.data.detailMessage);
      });
  };

  return (
    <Layout>
      <Main>
        <Title>SIGNUP</Title>
        <Warning>연습사이트이니 중요정보(실제 정보) 넣지 마십시오</Warning>
        <Email>
          <div>이메일</div>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={OnFieldChange}
          />
        </Email>
        <Text>
          <div>이름</div>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={OnFieldChange}
          />
        </Text>
        <Text>
          <div>닉네임 (영문자로 시작하고 영문자 숫자 조합)</div>
          <input
            type="text"
            name="nickname"
            value={state.nickname}
            onChange={OnFieldChange}
          />
        </Text>
        <Text>
          <div>휴대폰 번호 (입력형식: 010XXXXXXXX)</div>
          <input
            type="text"
            name="phoneNumber"
            value={state.phoneNumber}
            onChange={OnFieldChange}
          />
        </Text>
        <Text>
          <div>주소</div>
          <input
            type="text"
            name="address"
            value={state.address}
            onChange={OnFieldChange}
          />
        </Text>
        <Radio>
          <div>성별</div>
          <label>
            남성
            <input
              type="radio"
              name="gender"
              defaultChecked
              value={"남성"}
              onChange={OnFieldChange}
            />
          </label>
          <label>
            여성
            <input
              type="radio"
              name="gender"
              value={"여성"}
              onChange={OnFieldChange}
            />
          </label>
        </Radio>
        <Text>
          <div>생년월일 (입력형식: yyyy-MM-dd, 예시: 2000-01-30)</div>
          <input
            type="text"
            name="birthDate"
            value={state.birthDate}
            onChange={OnFieldChange}
          />
        </Text>
        <Password>
          <div>패스워드 (입력형식: 간단히 영문 대소문자와 숫자 조합)</div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={state.password}
            onChange={OnFieldChange}
          />
        </Password>
        <Password>
          <div>패스워드 확인</div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="passwordConfirm"
            value={state.passwordConfirm}
            onChange={OnFieldChange}
          />
        </Password>
        <Check>
          <label>
            비밀번호 보이기
            <input
              type="checkbox"
              value={isPasswordVisible}
              onChange={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </label>
        </Check>
        {errMessage && <Error>{errMessage}</Error>}
        <SignUp onClick={OnSignup}>회원가입</SignUp>
      </Main>
    </Layout>
  );
};

export default SignupPage;

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
  padding-bottom: 10px;
  div {
    font-size: 14px;
  }
  input[type="email"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Text = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  div {
    font-size: 14px;
  }
  input[type="text"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Radio = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  div {
    font-size: 14px;
  }
  label {
    display: inline-block;
    width: 25%;
    padding: 0 20px;
  }
  input[type="radio"] {
    width: 50%;
    padding: 5px;
    outline: none;
  }
`;

const Password = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  div {
    font-size: 14px;
  }
  input[type="text"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
  input[type="password"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Check = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  text-align: right;
  label {
    display: inline-block;
    width: 40%;
    font-size: 14px;
  }
  input[type="checkbox"] {
    width: 10%;
    padding: 5px;
    outline: none;
  }
`;

const SignUp = styled.button`
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

const Warning = styled.span`
  width: 100%;
  color: white;
  background-color: red;
  margin: 15px 0;
  font-size: 0.9em;
  padding: 5px;
  box-sizing: border-box;
`;

const Error = styled.span`
  color: red;
  padding: 20px 0 0 0;
`;
