import React from "react";
import { itemCartType } from "../../types/type";

const SimpleCartCard = ({ item }: { item: itemCartType }) => {
  return (
    <div
      className="border rounded-4 bg-white p-3 shadow-sm"
      style={{
        width: "100%",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="d-flex align-items-center gap-3 min-w-0">
        <img
          src={item?.fileUrl}
          alt={item?.itemName}
          className="rounded-4 flex-shrink-0"
          style={{
            width: "72px",
            height: "72px",
            objectFit: "cover",
            background: "#f5f5f5",
          }}
        />

        <div className="flex-grow-1 min-w-0 d-flex flex-column justify-content-center">
          <div
            className="fw-bold text-truncate mb-2"
            style={{
              fontSize: "15px",
            }}
          >
            {item?.itemName}
          </div>

          <div className="d-flex justify-content-between align-items-center py-1">
            <span
              className="text-secondary fw-semibold"
              style={{
                fontSize: "12px",
              }}
            >
              가격
            </span>

            <strong
              style={{
                fontSize: "13px",
              }}
            >
              {item?.price?.toLocaleString()}원
            </strong>
          </div>

          <div className="d-flex justify-content-between align-items-center py-1">
            <span
              className="text-secondary fw-semibold"
              style={{
                fontSize: "12px",
              }}
            >
              수량
            </span>

            <strong
              style={{
                fontSize: "13px",
              }}
            >
              {item?.itemCount}개
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCartCard;
