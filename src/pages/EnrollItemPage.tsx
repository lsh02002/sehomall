import React, { useState } from "react";
import Layout from "../components/layout/Layout";

const EnrollItemPage = () => {
  const [state, setState] = useState({
    id: 0,
    icat: "BAGS",
    iname: "",
    iprice: 0,
    isize: "",
    imaterial: "",
    careGuide: "",
    icount: 0,
    idesc: "",
    ideliveryFee: 0,
    userNickname: "lsh02002",
    images: null as File | null,
  });

  const [errMessage, setErrMessage] = useState("");

  const OnSelectFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrMessage("");

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const OnInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");

    setState({
      ...state,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const OnTextAreaFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrMessage("");

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const OnFieldImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");

    const file = e.target.files?.[0];

    if (!file) return;

    setState({
      ...state,
      [e.target.name]: file,
    });
  };

  const OnRegister = () => {
    console.log(state);

    alert("상품 등록 완료");
  };

  return (
    <Layout>
      <div
        className="
          d-flex justify-content-center align-items-center
          flex-wrap
          w-100
          px-3
        "
        style={{
          marginTop: "20px",
        }}
      >
        <div
          className="
            d-flex flex-column
            justify-content-center align-items-center
            bg-white
            border rounded-5
            shadow-sm
            p-4
          "
          style={{
            width: "100%",
            maxWidth: "520px",
            borderColor: "#e9e9e9",
          }}
        >
          {/* TITLE */}
          <h1
            className="fw-normal mb-2"
            style={{
              fontSize: "var(--main-h1-size)",
            }}
          >
            상품 등록
          </h1>

          <span
            className="
              w-100 text-secondary
              mb-4
            "
            style={{
              fontSize: "14px",
            }}
          >
            (포트폴리오 참고용으로 노출함, 관리자 등급만 등록 가능)
          </span>

          {/* CATEGORY */}
          <FormField label="카테고리">
            <select
              value={state.icat}
              name="icat"
              onChange={OnSelectFieldChange}
              className="form-select rounded-4"
            >
              <option>BAGS</option>
              <option>WALLETS</option>
              <option>ACCESSORIES</option>
              <option>SCARVES</option>
            </select>
          </FormField>

          {/* NAME */}
          <FormField label="제품 이름">
            <input
              type="text"
              value={state.iname}
              name="iname"
              onChange={OnInputFieldChange}
              className="form-control rounded-4"
            />
          </FormField>

          {/* IMAGE */}
          <FormField label="제품 사진">
            <input
              name="images"
              type="file"
              onChange={OnFieldImagesChange}
              className="form-control rounded-4"
            />
          </FormField>

          {/* PRICE */}
          <FormField label="제품 가격">
            <input
              type="number"
              value={state.iprice}
              name="iprice"
              onChange={OnInputFieldChange}
              className="form-control rounded-4"
            />
          </FormField>

          {/* SIZE */}
          <FormField label="제품 크기">
            <input
              type="text"
              value={state.isize}
              name="isize"
              onChange={OnInputFieldChange}
              className="form-control rounded-4"
            />
          </FormField>

          {/* MATERIAL */}
          <FormField label="제품 재질">
            <input
              type="text"
              value={state.imaterial}
              name="imaterial"
              onChange={OnInputFieldChange}
              className="form-control rounded-4"
            />
          </FormField>

          {/* COUNT */}
          <FormField label="제품 재고량">
            <input
              type="number"
              value={state.icount}
              name="icount"
              onChange={OnInputFieldChange}
              className="form-control rounded-4"
            />
          </FormField>

          {/* DESC */}
          <FormField label="제품 설명">
            <input
              type="text"
              value={state.idesc}
              name="idesc"
              onChange={OnInputFieldChange}
              className="form-control rounded-4"
            />
          </FormField>

          {/* DELIVERY */}
          <FormField label="배송비">
            <input
              type="number"
              value={state.ideliveryFee}
              name="ideliveryFee"
              onChange={OnInputFieldChange}
              className="form-control rounded-4"
            />
          </FormField>

          {/* CARE GUIDE */}
          <FormField label="제품취급 주의사항">
            <textarea
              value={state.careGuide}
              name="careGuide"
              onChange={OnTextAreaFieldChange}
              className="form-control rounded-4"
              rows={5}
            />
          </FormField>

          {/* ERROR */}
          <div
            className="
              text-danger
              w-100 mb-3
            "
          >
            {errMessage}
          </div>

          {/* BUTTON */}
          <button
            onClick={OnRegister}
            className="
              btn btn-secondary
              w-100 rounded-4
              py-3 fw-semibold
            "
          >
            상품 등록
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EnrollItemPage;

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
