import React from "react";
import { Link } from "react-router-dom";
import { itemOrderType } from "../../types/type";

const SimpleItemCard = ({ item }: { item: itemOrderType }) => {
  return (
    <article
      className="border rounded-4 bg-white p-3 shadow-sm"
      style={{
        width: "180px",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <Link
        to={`/detail/${item.item?.id}`}
        className="
          text-decoration-none text-dark
          d-flex flex-column gap-3
        "
      >
        <img
          src={item.item?.files?.[0]?.fileUrl}
          alt={item.item?.name}
          className="rounded-4 d-block w-100"
          style={{
            aspectRatio: "1 / 1",
            objectFit: "cover",
            background: "#f5f5f5",
          }}
        />

        <div className="d-flex flex-column gap-2 min-w-0">
          <div
            className="fw-bold text-truncate"
            style={{
              fontSize: "15px",
            }}
          >
            {item.item?.name}
          </div>

          <div className="d-flex justify-content-between align-items-center">
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
              {item.item?.price?.toLocaleString()}원
            </strong>
          </div>

          <div className="d-flex justify-content-between align-items-center">
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
              {item.count}개
            </strong>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default SimpleItemCard;
