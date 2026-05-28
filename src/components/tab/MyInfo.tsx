import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { userInfoData } from "../data/userInfoData";
import { layout } from "../../theme/theme";

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
      <div
        className="
          w-100
          d-flex justify-content-center align-items-center
        "
        style={{
          maxWidth: layout.maxWidth,
        }}
      >
        <div
          className="
            w-100
            d-flex flex-column align-items-start
            pb-4
          "
        >
          <InfoInput label="닉네임" value={myInfo.nickname} disabled />

          <InfoInput label="이름" value={myInfo.name} />

          <InfoInput label="이메일" value={myInfo.email} />

          <InfoInput label="휴대전화" value={myInfo.phoneNumber} />

          <InfoInput label="주소" value={myInfo.address} />

          <InfoInput label="성별" value={myInfo.gender} />

          <InfoInput label="생일" value={myInfo.birthDate} />

          <InfoInput label="계정 생성일" value={myInfo.createAt} disabled />

          {/* BUTTON */}
          <div
            className="
              w-100
              d-flex justify-content-end
              p-3
            "
          >
            <button
              className="
                btn btn-light
                border rounded-4 fw-bold shadow-sm
              "
              style={{
                minWidth: "110px",
                height: "46px",
              }}
            >
              정보 수정하기
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyInfo;

type InfoInputProps = {
  label: string;
  value: string;
  disabled?: boolean;
};

const InfoInput = ({ label, value, disabled = false }: InfoInputProps) => {
  return (
    <div
      className="
        w-100
        d-flex align-items-center
        gap-3
        px-3 py-2
        flex-column flex-md-row
      "
    >
      <span
        className="fw-bold text-secondary"
        style={{
          minWidth: "120px",
          fontSize: "14px",
        }}
      >
        {label}:
      </span>

      <input
        type="text"
        value={value}
        disabled={disabled}
        className="form-control rounded-4"
        style={{
          height: "48px",
          background: "#fafafa",
          fontSize: "15px",
        }}
      />
    </div>
  );
};
