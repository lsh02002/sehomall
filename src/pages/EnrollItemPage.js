import React, { useState } from "react";
import styled from "styled-components";
import { EnrollItem } from "../api/sehomallApi";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const EnrollItemPage = () => {
  const [state, setState] = useState({
    icat: "BAGS",
    iname: "",
    iprice: 0,
    isize: "",
    imaterial: "",
    careGuide: "",
    icount: 0,
    idesc: "",
    ideliveryFee: 0,
    images: null,
  });
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const OnFieldChange = (e) => {
    setErrMessage("");
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const OnFieldImagesChange = (e) => {
    setErrMessage("");
    setState({ ...state, [e.target.name]: e.target.files[0] });
  };

  const OnRegister = () => {
    const data = {
      count: state.icount,
      price: state.iprice,
      size: state.isize,
      careGuide: state.careGuide,
      name: state.iname,
      description: state.idesc,
      category: state.icat,
      deliveryFee: state.ideliveryFee,
    };

    const formDataToSend = new FormData();
    formDataToSend.append(
      "itemRequest",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    if (state.images) {
      formDataToSend.append("files", state.images);
    }

    EnrollItem(formDataToSend)
      .then((res) => {
        // console.log(res);
        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          setErrMessage(err.response.data.detailMessage);
        }
      });
  };

  return (
    <Layout>
      <Main>
        <EnrollInner>
          <Title>상품 등록</Title>
          <span>(포트폴리오 참고용으로 노출함, 관리자 등급만 등록 가능)</span>
          <CategorySelect>
            <div>카테고리</div>
            <select value={state.icat} name="icat" onChange={OnFieldChange}>
              <option>BAGS</option>
              <option>WALLETS</option>
              <option>ACCESSORIES</option>
              <option>SCARVES</option>
            </select>
          </CategorySelect>
          <Text>
            <div>제품 이름</div>
            <input
              type="text"
              value={state.iname}
              name="iname"
              onChange={OnFieldChange}
            />
          </Text>
          <Text>
            <div>제품 사진</div>
            <input name="images" type="file" onChange={OnFieldImagesChange} />
          </Text>
          <Text>
            <div>제품 가격</div>
            <input
              type="number"
              value={state.iprice}
              name="iprice"
              onChange={OnFieldChange}
            />
          </Text>
          <Text>
            <div>제품 크기</div>
            <input
              type="text"
              value={state.isize}
              name="isize"
              onChange={OnFieldChange}
            />
          </Text>
          <Text>
            <div>제품 재질</div>
            <input
              type="text"
              value={state.imaterial}
              name="imaterial"
              onChange={OnFieldChange}
            />
          </Text>
          <Text>
            <div>제품 재고량</div>
            <input
              type="number"
              value={state.icount}
              name="icount"
              onChange={OnFieldChange}
            />
          </Text>
          <Text>
            <div>제품 설명</div>
            <input
              type="text"
              value={state.idesc}
              name="idesc"
              onChange={OnFieldChange}
            />
          </Text>
          <Text>
            <div>배송비</div>
            <input
              type="number"
              value={state.ideliveryFee}
              name="ideliveryFee"
              onChange={OnFieldChange}
            />
          </Text>
          <Text>
            <div>제품취급 주의사항</div>
            <textarea
              value={state.careGuide}
              name="careGuide"
              onChange={OnFieldChange}
            />
          </Text>
          <TextMessage>{errMessage}</TextMessage>
          <Register onClick={OnRegister}>상품 등록</Register>
        </EnrollInner>
      </Main>
    </Layout>
  );
};

export default EnrollItemPage;

const Main = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: calc(100% - 190px);
  margin: 10px 0 0 10px;
  flex-wrap: wrap;
`;

const EnrollInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  margin: 0 150px;
  border: 1px solid lightgray;
  margin-top: 50px;
  span {
    font-size: 16px;
    display: inline-block;
    width: 100%;
    margin: 20px;
    margin-left: 70px;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  margin: 5px;
`;

const CategorySelect = styled.div`
  width: 90%;
  overflow: hidden;
  div {
    font-size: 14px;
  }
  select {
    width: 100%;
    font-size: 14px;
    padding: 5px;
    box-sizing: border-box;
  }
  margin-bottom: 15px;
`;

const Text = styled.div`
  width: 90%;
  overflow: hidden;
  div {
    font-size: 14px;
  }
  input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 5px;
    outline: none;
    box-sizing: border-box;
    margin-bottom: 15px;
  }
`;

const TextMessage = styled.div`
  color: red;
`;

const Register = styled.button`
  border: none;
  margin: 10px;
  background-color: gray;
  transition: 0.3s;
  cursor: pointer;
  width: 90%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 1.2em;
  margin-bottom: 30px;
  color: white;
  transition: 0.2s;
  &:hover {
    background-color: lightgray;
  }
`;
