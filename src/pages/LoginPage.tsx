import React, { useState } from "react";
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
      <div
        className="
          d-flex justify-content-center align-items-center
          w-100
          px-3
        "
        style={{
          marginTop: "50px",
        }}
      >
        <div
          className="
            d-flex flex-column
            justify-content-center align-items-center
            border rounded-5
            shadow-sm bg-white
            p-4
          "
          style={{
            width: "100%",
            maxWidth: "360px",
            boxSizing: "border-box",
            borderColor: "lightgray",
          }}
        >
          {/* TITLE */}
          <h1
            className="fw-normal mb-4"
            style={{
              fontSize: "var(--main-h1-size)",
            }}
          >
            LOGIN
          </h1>

          {/* EMAIL */}
          <div className="w-100 mb-3">
            <div
              className="mb-2"
              style={{
                fontSize: "14px",
              }}
            >
              이메일
            </div>

            <input
              type="email"
              value={email}
              onChange={OnEmailChange}
              className="form-control rounded-4"
            />
          </div>

          {/* PASSWORD */}
          <div className="w-100 mb-3">
            <div
              className="mb-2"
              style={{
                fontSize: "14px",
              }}
            >
              패스워드
            </div>

            <input
              type="password"
              value={password}
              onChange={OnPasswordChange}
              className="form-control rounded-4"
            />
          </div>

          {/* ERROR */}
          {errMessage && <span className="text-danger mb-3">{errMessage}</span>}

          {/* BUTTON */}
          <button
            onClick={OnLogin}
            className="
              btn btn-secondary
              w-100
              rounded-4
              py-2 fw-semibold
            "
            style={{
              fontSize: "var(--button-font-size)",
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
