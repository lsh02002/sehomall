import React, { useState } from "react";
import SimpleItemCard from "./SimpleItemCard";
import { itemOrderType, orderResponseType } from "../../types/type";
import { layout } from "../../them/them";

type orderCardPropsType = {
  order: orderResponseType;
  isOrderStatusUpdated: boolean;
  setIsOrderStatusUpdated: (o: boolean) => void;
};

const OrderCard = ({
  order,
  isOrderStatusUpdated,
  setIsOrderStatusUpdated,
}: orderCardPropsType) => {
  const [isModal, setIsModal] = useState(false);

  const OnStatusUpdated = (status: string) => {
    console.log(status);
    setIsOrderStatusUpdated(!isOrderStatusUpdated);
  };

  const isDisabled =
    order.orderStatus === "COMPLETED" || order.orderStatus === "CANCELED";

  return (
    <div
      className="
        container-fluid
        border rounded-5 bg-white p-4 my-3
        shadow-sm
      "
      style={{
        maxWidth: layout.maxWidth,
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="row g-4 align-items-center">
        {/* LEFT */}
        <div className="col-lg-6 position-relative">
          <div
            className="
              d-inline-flex align-items-center
              px-3 mb-3 rounded-pill
              bg-light text-secondary fw-bold
            "
            style={{
              height: "28px",
              fontSize: "12px",
              letterSpacing: "0.5px",
            }}
          >
            ORDER #{order.id}
          </div>

          <div
            className="fw-bold text-truncate mb-4"
            style={{
              fontSize: "20px",
            }}
          >
            {order.items[0]?.item?.name} 외 {order.items?.length}개
          </div>

          <div className="mb-2 d-flex gap-3">
            <span
              className="text-secondary fw-semibold"
              style={{ width: "72px" }}
            >
              주문자
            </span>

            <span>{order.deliveryName}</span>
          </div>

          <div className="mb-2 d-flex gap-3">
            <span
              className="text-secondary fw-semibold"
              style={{ width: "72px" }}
            >
              전화번호
            </span>

            <span>{order.deliveryPhone}</span>
          </div>

          <div className="mb-2 d-flex gap-3">
            <span
              className="text-secondary fw-semibold"
              style={{ width: "72px" }}
            >
              배송주소
            </span>

            <span className="text-truncate">{order.deliveryAddress}</span>
          </div>

          <div
            className="text-secondary mt-3"
            style={{
              fontSize: "13px",
            }}
          >
            주문 날짜: {order.createAt}
          </div>

          {/* MODAL BUTTON */}
          <button
            className="btn btn-dark rounded-pill fw-bold mt-3"
            onMouseEnter={() => setIsModal(true)}
            onMouseLeave={() => setIsModal(false)}
          >
            상품정보 보기
          </button>

          {/* MODAL */}
          {isModal && (
            <div
              className="
                position-absolute
                bg-white border rounded-5 p-3
                d-flex gap-3 overflow-auto
                shadow-lg
              "
              style={{
                left: 0,
                top: "calc(100% + 12px)",
                width: "min(620px, 90vw)",
                maxHeight: "260px",
                zIndex: 20,
              }}
              onMouseEnter={() => setIsModal(true)}
              onMouseLeave={() => setIsModal(false)}
            >
              {order.items.map((item: itemOrderType, index: number) => (
                <SimpleItemCard key={index} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* CENTER */}
        <div className="col-lg-4">
          <div className="d-flex flex-column gap-3">
            <div
              className="
                d-flex justify-content-between align-items-center
                bg-light rounded-4 p-3
              "
            >
              <span className="text-secondary fw-semibold">결제상태</span>

              <strong>완료</strong>
            </div>

            <div
              className="
                d-flex justify-content-between align-items-center
                bg-light rounded-4 p-3
              "
            >
              <span className="text-secondary fw-semibold">총 가격</span>

              <strong className="text-danger">
                {order.productSum.toLocaleString()}원
              </strong>
            </div>

            <div
              className="
                d-flex justify-content-between align-items-center
                bg-light rounded-4 p-3
              "
            >
              <span className="text-secondary fw-semibold">주문배송상태</span>

              <strong
                className={
                  order.orderStatus === "COMPLETED"
                    ? "text-success"
                    : order.orderStatus === "CANCELED"
                      ? "text-danger"
                      : "text-dark"
                }
              >
                {order.orderStatus}
              </strong>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-2">
          <div className="d-flex flex-lg-column gap-3">
            <button
              className="btn fw-bold rounded-4 w-100"
              disabled={isDisabled}
              onClick={() => OnStatusUpdated("CANCELED")}
              style={{
                background: "#fff1f1",
                color: "#e60023",
                border: "none",
                height: "46px",
              }}
            >
              주문 취소
            </button>

            <button
              className="btn btn-dark fw-bold rounded-4 w-100"
              disabled={isDisabled}
              onClick={() => OnStatusUpdated("COMPLETED")}
              style={{
                height: "46px",
              }}
            >
              구입 확정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
