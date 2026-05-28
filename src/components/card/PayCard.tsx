import React from "react";
import { itemCartType } from "../../types/type";
import { layout } from "../../them/them";

const PayCard = ({ item }: { item: itemCartType }) => {
  return (
    <article
      className="
        d-flex align-items-center gap-4
        mt-4 mx-auto
        flex-column flex-sm-row
      "
      style={{
        maxWidth: layout.maxWidth,
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 14px 34px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex-shrink-0 w-100 w-sm-auto">
        {item?.fileUrl && (
          <img
            src={item.fileUrl}
            alt={item.itemName}
            className="rounded-4 d-block w-100"
            style={{
              maxWidth: "120px",
              height: "120px",
              objectFit: "cover",
              background: "#f4f4f4",
            }}
          />
        )}
      </div>

      <div className="flex-grow-1 w-100 min-w-0">
        <h3
          className="fw-bold text-truncate mb-3"
          style={{
            fontSize: "22px",
          }}
        >
          {item.itemName}
        </h3>

        <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
          <span className="text-secondary fw-semibold">가격</span>
          <strong>{item.price?.toLocaleString()}원</strong>
        </div>

        <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
          <span className="text-secondary fw-semibold">수량</span>
          <strong>{item.itemCount}개</strong>
        </div>

        <div
          className="
            d-flex justify-content-between align-items-center
            mt-4 px-3 py-3 rounded-4 bg-light
          "
        >
          <span className="text-secondary fw-bold">최종 결제 금액</span>

          <strong
            className="text-danger fw-bold"
            style={{
              fontSize: "22px",
            }}
          >
            {(item.price * item.itemCount).toLocaleString()}원
          </strong>
        </div>
      </div>
    </article>
  );
};

export default PayCard;
