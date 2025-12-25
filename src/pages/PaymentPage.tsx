import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import PayCard from "../components/card/PayCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { itemCartType, orderResponseType } from "../types/type";
import { userInfoData } from "../components/data/userInfoData";
import { useItem } from "../api/itemContextApi";
import { useCart } from "../api/cartContextApi";
import { itemData } from "../components/data/itemData";

const PaymentPage = () => {
  const { cartItems } = useCart();
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

  const [payItems, setPayItems] = useState<itemCartType[]>([]);
  const { myOrders, setMyOrders } = useItem();
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
    setOrdererInfo(userInfoData);
  }, []);

  useEffect(() => {
    if (isFromCart === "true") {
      setPayItems(
        cartItems?.filter((item: itemCartType) => item.checked === true)
      );
    } else {
      const detail: itemCartType = {
        itemId: parseInt(itemId ?? "0"),
        itemCount: parseInt(itemCount ?? "0"),
        itemName: itemName ?? "",
        price: parseInt(price ?? "0"),
        fileUrl: fileUrl ?? "",
        checked: Boolean(isCheckedItem),
        heartCount: parseInt(heartCount ?? "0"),
      };

      if (
        itemId !== null &&
        itemCount !== null &&
        price !== null &&
        itemName !== null
      ) {
        setPayItems([]);
        setPayItems([...payItems, detail]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFromCart === "true") {
      let total = 0;
      payItems.map(
        (item) => item.checked && (total += item.price * item.itemCount)
      );

      setTotalPayPrice(total);
    } else {
      let total = 0;
      const price2 = typeof price === "string" ? parseFloat(price) : price ?? 0;
      const itemCount2 =
        typeof itemCount === "string" ? parseFloat(itemCount) : itemCount ?? 0;
      total += price2 * itemCount2;
      setTotalPayPrice(total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payItems.length]);

  const OnChangeItemInfo = (isChecked: boolean) => {
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
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phoneNumber.trim() === "" ||
      address.trim() === ""
    ) {
      alert("주문자란에 입력되지 않은 란이 있습니다");
      return;
    }

    const items = payItems.map((pitem) => {
      return {
        id: Number(pitem?.itemId),
        item: itemData?.content.find((it) => it.id === Number(pitem.itemId)),
        count: pitem.itemCount,
      };
    });

    if (items.length <= 0) {
      alert("상품을 1개이상 선택해 주세요");
      return;
    }

    const paymentResponse: orderResponseType = {
      id: myOrders[myOrders.length - 1].id + 1,
      productSum: totalPayPrice,
      email,
      deliveryName: name,
      deliveryAddress: address,
      deliveryPhone: phoneNumber,
      deliveryMessage,
      orderStatus: "ORDERED",
      createAt: new Date().toString(),
      items,
    };

    setMyOrders([...myOrders, paymentResponse]);

    navigate("/mypage/ORDERS?page=1&size=3");
  };

  return (
    <Layout>
      <h1>주문</h1>
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
  width: 100%;
  max-width: 870px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const ItemInfo = styled.div`
  width: 100%;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
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
    font-size: var(--button-font-size);
    color: #fff;
    background-color: gray;
  }
`;
