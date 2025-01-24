import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { EnrollPayment, FindCartItems, GetUserInfo } from "../api/ItemApi";
import PayCard from "../components/PayCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentPage = () => {
  const [ordererInfo, setOrdererInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    gender: "",
  });

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [infoCheck, setInfoCheck] = useState(false);

  const [payItems, setPayItems] = useState([]);
  const [totalPayPrice, setTotalPayPrice] = useState(0);

  const [searchParams] = useSearchParams();
  const isFromCart = searchParams.get("isFromCart");
  const itemId = searchParams.get("itemId");
  const itemName = searchParams.get("itemName");
  const price = searchParams.get("price");
  const fileUrl = searchParams.get("fileUrl");
  const heartCount = searchParams.get("heartCount");
  const itemCount = searchParams.get("itemCount");
  const isCheckedItem = searchParams.get("isCheckedItem");

  useEffect(() => {
    GetUserInfo()
      .then((res) => {
        console.log(res);
        setOrdererInfo(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (isFromCart === "true") {
      FindCartItems()
        .then((res) => {
          console.log(res);
          setPayItems(
            res.data.cartAllSearchResponses.filter(
              (item) => item.checked === true
            )
          );
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            alert(err.response.data.detailMessage);
          }
        });
    } else {
      const detail = {
        itemId,
        count: itemCount,
        itemName,
        price,
        fileUrl,
        checked: isCheckedItem,
        heartCount,
      };
      setPayItems([]);
      setPayItems([...payItems, detail]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFromCart === "true") {
      let total = 0;
      payItems.map(
        (item) => item.checked && (total += item.price * item.count)
      );
      setTotalPayPrice(total);
    } else {
      let total = 0;
      total += price * itemCount;
      setTotalPayPrice(total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payItems.length]);

  const OnChangeItemInfo = (isChecked) => {
    setInfoCheck(isChecked);

    if (isChecked) {
      setName(ordererInfo.name);
      setEmail(ordererInfo.email);
      setPhoneNumber(ordererInfo.phoneNumber);
      setAddress(ordererInfo.address);
    } else {
      setName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
    }
  };

  const OnOrderClick = () => {
    const items = payItems.filter((item) => {
      return { itemId: item.id, count: item.count };
    });

    if(items.length<=0){
      alert("상품을 1개이상 선택해 주세요");
      return;
    }

    const payment = {
      productSum: totalPayPrice,
      email,
      deliveryName: name,
      deliveryAddress: address,
      deliveryPhone: phoneNumber,
      deliveryMessage,
      items,
    };

    EnrollPayment(payment)
      .then((res) => {
        console.log(res);
        navigate("/mypage?cate=ORDERS");
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(err.response.data.detailMessage);
        }
      });
  };

  return (
    <Layout>
      <Container>
        <ItemInfo>
          <span>주문 정보</span>
          <TextInput>
            <span>주문자: </span>
            <input type="text" value={ordererInfo.name} disabled />
          </TextInput>
          <TextInput>
            <span>이메일: </span>
            <input type="text" value={ordererInfo.email} disabled />
          </TextInput>
          <TextInput>
            <span>휴대전화: </span>
            <input type="text" value={ordererInfo.phoneNumber} disabled />
          </TextInput>
          <TextInput>
            <span>주소: </span>
            <input type="text" value={ordererInfo.address} disabled />
          </TextInput>
          <span>
            배송지
            <label htmlFor="check1">
              <input
                id="check1"
                type="checkbox"
                onChange={(e) => OnChangeItemInfo(e.target.checked)}
              />
              주문자 정보와 동일
            </label>
          </span>
          <TextInput>
            <span>주문자: </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={infoCheck}
            />
          </TextInput>
          <TextInput>
            <span>이메일: </span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={infoCheck}
            />
          </TextInput>
          <TextInput>
            <span>휴대전화: </span>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={infoCheck}
            />
          </TextInput>
          <TextInput>
            <span>주소: </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={infoCheck}
            />
          </TextInput>
          <TextInput>
            <span>메세지: </span>
            <input
              type="text"
              value={deliveryMessage}
              onChange={(e) => setDeliveryMessage(e.target.value)}
            />
          </TextInput>

          <span>주문 상품</span>
          {payItems?.length > 0 ? (
            payItems.map((item, index) => <PayCard key={index} item={item} />)
          ) : (
            <div>주문하실 상품이 없습니다.</div>
          )}
          <h3>최종 결제 금액: {totalPayPrice?.toLocaleString()}원</h3>
          <Order>
            <button onClick={OnOrderClick}>결제하기</button>
          </Order>
        </ItemInfo>
      </Container>
    </Layout>
  );
};

export default PaymentPage;

const Container = styled.div`
  margin-top: 100px;
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
  border: 1px solid lightgray;
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
    width: 100px;
  }
  input[type="text"] {
    width: 100%;
    box-sizing: border-box;
    padding: 3px;
  }
`;

const Order = styled.div`
  width: 100%;
  text-align: right;

  button {
    border: none;
    margin: 10px;
    padding: 5px 10px;
    font-size: 1.2em;
    color: #fff;
    background-color: gray;
  }
`;
