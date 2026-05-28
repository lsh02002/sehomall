import React, { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import PayCard from "../components/card/PayCard";

import { useNavigate, useSearchParams } from "react-router-dom";

import { itemCartType, orderResponseType } from "../types/type";

import { userInfoData } from "../components/data/userInfoData";

import { useItem } from "../api/itemContextApi";
import { useCart } from "../api/cartContextApi";

import { itemData } from "../components/data/itemData";

import { layout } from "../theme/theme";

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

  // 주문자 정보
  useEffect(() => {
    setOrdererInfo(userInfoData);
  }, []);

  // 결제 상품
  useEffect(() => {
    if (isFromCart === "true") {
      setPayItems(
        cartItems?.filter((item: itemCartType) => item.checked === true),
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
        setPayItems([detail]);
      }
    }
  }, [
    cartItems,
    heartCount,
    isCheckedItem,
    isFromCart,
    itemCount,
    itemId,
    itemName,
    fileUrl,
    price,
  ]);

  // 총 결제 금액
  useEffect(() => {
    if (isFromCart === "true") {
      let total = 0;

      payItems.forEach((item) => {
        if (item.checked) {
          total += item.price * item.itemCount;
        }
      });

      setTotalPayPrice(total);
    } else {
      const price2 =
        typeof price === "string" ? parseFloat(price) : Number(price ?? 0);

      const itemCount2 =
        typeof itemCount === "string"
          ? parseFloat(itemCount)
          : Number(itemCount ?? 0);

      setTotalPayPrice(price2 * itemCount2);
    }
  }, [payItems, isFromCart, price, itemCount]);

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
      <div
        className="
          w-100
          d-flex justify-content-center
          px-3
        "
      >
        <div
          className="w-100"
          style={{
            maxWidth: layout.maxWidth,
          }}
        >
          {/* TITLE */}
          <h1 className="fw-bold mb-4">주문</h1>

          <div
            className="w-100"
            style={{
              margin: "50px auto 120px auto",
            }}
          >
            <div
              className="
                bg-white
                shadow-lg
                rounded-5
                p-4
              "
            >
              {/* 주문 정보 */}
              <div
                className="
                  d-flex justify-content-between align-items-center
                  mb-4
                "
              >
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "24px",
                  }}
                >
                  주문 정보
                </span>
              </div>

              {/* 주문자 정보 */}
              <InputField label="주문자">
                <input
                  type="text"
                  value={ordererInfo.name}
                  disabled
                  className="form-control rounded-4"
                />
              </InputField>

              <InputField label="이메일">
                <input
                  type="text"
                  value={ordererInfo.email}
                  disabled
                  className="form-control rounded-4"
                />
              </InputField>

              <InputField label="휴대전화">
                <input
                  type="text"
                  value={ordererInfo.phoneNumber}
                  disabled
                  className="form-control rounded-4"
                />
              </InputField>

              <InputField label="주소">
                <input
                  type="text"
                  value={ordererInfo.address}
                  disabled
                  className="form-control rounded-4"
                />
              </InputField>

              {/* 배송지 */}
              <div
                className="
                  d-flex justify-content-between align-items-center
                  mt-5 mb-4
                "
              >
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "24px",
                  }}
                >
                  배송지
                </span>

                <label
                  className="
                    d-flex align-items-center gap-2
                    text-secondary fw-semibold
                  "
                  style={{
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={infoCheck}
                    onChange={(e) => OnChangeItemInfo(e.target.checked)}
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  주문자 정보와 동일
                </label>
              </div>

              {/* 배송지 입력 */}
              <InputField label="주문자">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={infoCheck}
                  className="form-control rounded-4"
                />
              </InputField>

              <InputField label="이메일">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={infoCheck}
                  className="form-control rounded-4"
                />
              </InputField>

              <InputField label="휴대전화">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={infoCheck}
                  className="form-control rounded-4"
                />
              </InputField>

              <InputField label="주소">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={infoCheck}
                  className="form-control rounded-4"
                />
              </InputField>

              <InputField label="메세지">
                <input
                  type="text"
                  value={deliveryMessage}
                  onChange={(e) => setDeliveryMessage(e.target.value)}
                  className="form-control rounded-4"
                />
              </InputField>

              {/* 주문 상품 */}
              <div
                className="
                  fw-bold mt-5 mb-4
                "
                style={{
                  fontSize: "24px",
                }}
              >
                주문 상품
              </div>

              {payItems?.length > 0 ? (
                payItems.map((item, index) => (
                  <PayCard key={index} item={item} />
                ))
              ) : (
                <div className="text-secondary">주문하실 상품이 없습니다.</div>
              )}

              {/* TOTAL */}
              <div
                className="
                  mt-5
                  p-4
                  rounded-5
                  d-flex justify-content-between align-items-center
                  bg-light
                "
              >
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "18px",
                  }}
                >
                  최종 결제 금액
                </span>

                <span
                  className="
                    text-danger fw-bold
                  "
                  style={{
                    fontSize: "24px",
                  }}
                >
                  {totalPayPrice?.toLocaleString()}원
                </span>
              </div>

              {/* BUTTON */}
              <button
                onClick={OnOrderClick}
                className="
                  btn btn-dark
                  w-100
                  rounded-5
                  fw-bold
                  mt-4 py-3
                  shadow-lg
                "
                style={{
                  height: "64px",
                  fontSize: "18px",
                }}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;

type InputFieldProps = {
  label: string;
  children: React.ReactNode;
};

const InputField = ({ label, children }: InputFieldProps) => {
  return (
    <div className="mb-3">
      <div
        className="
          fw-bold mb-2
        "
        style={{
          fontSize: "14px",
          color: "#444",
        }}
      >
        {label}
      </div>

      {children}
    </div>
  );
};
