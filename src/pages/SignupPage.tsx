import React, { useState } from "react";

import Layout from "../components/layout/Layout";

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

  const OnFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
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

    console.log(data);

    alert("회원가입 완료");

    navigate("/login");
  };

  return (
    <Layout>
      <div
        className="
          d-flex justify-content-center
          align-items-center
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
            justify-content-center
            align-items-center
            border rounded-5
            shadow-sm bg-white
            p-4
          "
          style={{
            width: "100%",
            maxWidth: "420px",
            boxSizing: "border-box",
            borderColor: "lightgray",
          }}
        >
          {/* TITLE */}
          <h1
            className="
              fw-normal mb-2
            "
            style={{
              fontSize: "var(--main-h1-size)",
            }}
          >
            SIGNUP
          </h1>

          {/* WARNING */}
          <div
            className="
              w-100
              bg-light
              rounded-4
              p-3 mb-4
              text-secondary
            "
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            https로 바꿔서 정보가 전부 암호화되기 때문에 다소 안전해졌습니다.
            <br />
            그래도 중요정보는 넣지 말아주세요.
          </div>

          {/* EMAIL */}
          <FormField label="이메일">
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={OnFieldChange}
              className="
                form-control
                rounded-4
              "
            />
          </FormField>

          {/* NAME */}
          <FormField label="이름">
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={OnFieldChange}
              className="
                form-control
                rounded-4
              "
            />
          </FormField>

          {/* NICKNAME */}
          <FormField label="닉네임 (영문자로 시작하고 영문자 숫자 조합)">
            <input
              type="text"
              name="nickname"
              value={state.nickname}
              onChange={OnFieldChange}
              className="
                form-control
                rounded-4
              "
            />
          </FormField>

          {/* PHONE */}
          <FormField label="휴대폰 번호 (010XXXXXXXX)">
            <input
              type="text"
              name="phoneNumber"
              value={state.phoneNumber}
              onChange={OnFieldChange}
              className="
                form-control
                rounded-4
              "
            />
          </FormField>

          {/* ADDRESS */}
          <FormField label="주소">
            <input
              type="text"
              name="address"
              value={state.address}
              onChange={OnFieldChange}
              className="
                form-control
                rounded-4
              "
            />
          </FormField>

          {/* GENDER */}
          <div className="w-100 mb-3">
            <div
              className="mb-2"
              style={{
                fontSize: "14px",
              }}
            >
              성별
            </div>

            <div className="d-flex gap-4">
              <label className="d-flex align-items-center gap-2">
                남성
                <input
                  type="radio"
                  name="gender"
                  defaultChecked
                  value="남성"
                  onChange={OnFieldChange}
                />
              </label>

              <label className="d-flex align-items-center gap-2">
                여성
                <input
                  type="radio"
                  name="gender"
                  value="여성"
                  onChange={OnFieldChange}
                />
              </label>
            </div>
          </div>

          {/* BIRTH */}
          <FormField label="생년월일 (yyyy-MM-dd)">
            <input
              type="text"
              name="birthDate"
              value={state.birthDate}
              onChange={OnFieldChange}
              className="
                form-control
                rounded-4
              "
            />
          </FormField>

          {/* PASSWORD */}
          <FormField label="패스워드">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={state.password}
              onChange={OnFieldChange}
              className="
                form-control
                rounded-4
              "
            />
          </FormField>

          {/* PASSWORD CONFIRM */}
          <FormField label="패스워드 확인">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="passwordConfirm"
              value={state.passwordConfirm}
              onChange={OnFieldChange}
              className="
                form-control
                rounded-4
              "
            />
          </FormField>

          {/* CHECKBOX */}
          <div
            className="
              w-100
              d-flex justify-content-end
              mb-3
            "
          >
            <label
              className="
                d-flex align-items-center gap-2
                text-secondary
              "
              style={{
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              비밀번호 보이기
              <input
                type="checkbox"
                checked={isPasswordVisible}
                onChange={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </label>
          </div>

          {/* ERROR */}
          {errMessage && (
            <div
              className="
                text-danger
                mb-3
              "
            >
              {errMessage}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={OnSignup}
            className="
              btn btn-secondary
              w-100
              rounded-4
              py-3 fw-semibold
            "
            style={{
              fontSize: "var(--button-font-size)",
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
};

const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div className="w-100 mb-3">
      <div
        className="mb-2"
        style={{
          fontSize: "14px",
        }}
      >
        {label}
      </div>

      {children}
    </div>
  );
};
