import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { UserSignup } from "../api/ItemApi";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("남성");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const OnEmailChange = (e) => {
    setErrMessage("");
    setEmail(e.target.value);
  };

  const OnNameChange = (e) => {
    setErrMessage("");
    setName(e.target.value);
  };

  const OnNicknameChange = (e) => {
    setErrMessage("");
    setNickname(e.target.value);
  };

  const OnPhoneChange = (e) => {
    setErrMessage("");
    setPhoneNumber(e.target.value);
  };

  const OnAddressChange = (e) => {
    setErrMessage("");
    setAddress(e.target.value);
  };

  const OnGenderChange = (e) => {    
    setErrMessage("");
    setGender(e.target.value);
  };

  const OnBirthDateChange = (e) => {
    setErrMessage("");
    setBirthDate(e.target.value);
  };

  const OnPasswordChange = (e) => {
    setErrMessage("");
    setPassword(e.target.value);
  };

  const OnPasswordConfirmChange = (e) => {
    setErrMessage("");
    setPasswordConfirm(e.target.value);
  };

  const OnSignup = () => {
    const data = {
      email,
      name,
      password,
      passwordConfirm,
      nickname,
      phoneNumber,
      address,
      gender,
      birthDate,
    };

    UserSignup(data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrMessage(err.response.data.detailMessage);
      });
  };

  return (
    <Layout>
      <Main>
        <Title>SIGNUP</Title>
        <Email>
          <div>이메일</div>
          <input
            type="email"
            value={email}
            onChange={(e) => OnEmailChange(e)}
          />
        </Email>
        <Text>
          <div>이름</div>
          <input type="text" value={name} onChange={(e) => OnNameChange(e)} />
        </Text>
        <Text>
          <div>닉네임</div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => OnNicknameChange(e)}
          />
        </Text>
        <Text>
          <div>휴대폰 번호</div>
          <input type="text" value={phoneNumber} onChange={(e) => OnPhoneChange(e)} />
        </Text>
        <Text>
          <div>주소</div>
          <input
            type="text"
            value={address}
            onChange={(e) => OnAddressChange(e)}
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
              onChange={(e) => OnGenderChange(e)}
            />
          </label>
          <label htmlFor="gender">
            여성
            <input
              type="radio"
              name="gender"
              value={"여성"}
              onChange={(e) => OnGenderChange(e)}
            />
          </label>
        </Radio>
        <Text>
          <div>생년월일 (입력형식: yyyy-MM-dd, 예시: 2000-01-30 )</div>
          <input
            type="text"
            value={birthDate}
            onChange={(e) => OnBirthDateChange(e)}
          />
        </Text>
        <Password>
          <div>패스워드</div>
          <input
            type="password"
            value={password}
            onChange={(e) => OnPasswordChange(e)}
          />
        </Password>
        <Password>
          <div>패스워드 확인</div>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => OnPasswordConfirmChange(e)}
          />
        </Password>
        {errMessage && <Error>{errMessage}</Error>}
        <SignUp onClick={OnSignup}>회원가입</SignUp>
      </Main>
    </Layout>
  );
};

export default SignupPage;

const Main = styled.div`
  margin-top: 100px;
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
  input[type="password"] {
    width: 95%;
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

const Error = styled.span`
  color: red;
  padding: 20px 0 0 0;
`;
