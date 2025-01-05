import React, { useState } from "react";
import styled from "styled-components";
import { EnrollItem } from "../api/ItemApi";
import Layout from "../components/Layout";

const EnrollItemPage = () => {
  const [icat, setIcat] = useState("BAGS");
  const [iname, setIname] = useState("");
  const [iprice, setIprice] = useState(0);
  const [isize, setIsize] = useState("");
  const [imaterial, setImaterial] = useState("");
  const [careGuide, setCareGuide] = useState("");
  const [icount, setIcount] = useState(0);
  const [idesc, setIdesc] = useState("");
  const [ideliveryFee, setIdeliveryFee] = useState(0);
  const [images, setImages] = useState(null);

  const OnRegister = () => {
    const data = {
      count: icount,
      price: iprice,
      size: isize,
      careGuide: careGuide,
      name: iname,
      description: idesc,
      category: icat,
      deliveryFee: ideliveryFee,
    };
    const formDataToSend = new FormData();
    formDataToSend.append(
      "itemRequest",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    if (images) {
      formDataToSend.append("files", images);
    }

    console.log(data);

    EnrollItem(formDataToSend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <Main>
        <EnrollInner>
          <Title>상품 등록</Title>
          <CategorySelect>
            <div>카테고리</div>
            <select value={icat} onChange={(e) => setIcat(e.target.value)}>
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
              value={iname}
              onChange={(e) => setIname(e.target.value)}
            />
          </Text>
          <Text>
            <div>제품 사진</div>
            <input type="file" onChange={(e) => setImages(e.target.files[0])} />
          </Text>
          <Text>
            <div>제품 가격</div>
            <input
              type="number"
              value={iprice}
              onChange={(e) => setIprice(e.target.value)}
            />
          </Text>
          <Text>
            <div>제품 크기</div>
            <input
              type="text"
              value={isize}
              onChange={(e) => setIsize(e.target.value)}
            />
          </Text>
          <Text>
            <div>제품 재질</div>
            <input
              type="text"
              value={imaterial}
              onChange={(e) => setImaterial(e.target.value)}
            />
          </Text>
          <Text>
            <div>제품 재고량</div>
            <input
              type="number"
              value={icount}
              onChange={(e) => setIcount(e.target.value)}
            />
          </Text>
          <Text>
            <div>제품 설명</div>
            <input
              type="text"
              value={idesc}
              onChange={(e) => setIdesc(e.target.value)}
            />
          </Text>
          <Text>
            <div>배송비</div>
            <input
              type="number"
              value={ideliveryFee}
              onChange={(e) => setIdeliveryFee(e.target.value)}
            />
          </Text>
          <Text>
            <div>제품취급 주의사항</div>
            <textarea
              value={careGuide}
              onChange={(e) => setCareGuide(e.target.value)}
            />
          </Text>
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
  margin-top: 100px;
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
    padding-left: 10px;
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
    padding-left: 10px;
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

const Register = styled.button`
  margin: 0 auto;
  width: 300px;
  border: none;
  padding: 10px;
  background-color: pink;
  cursor: pointer;
  margin-bottom: 20px;
`;
