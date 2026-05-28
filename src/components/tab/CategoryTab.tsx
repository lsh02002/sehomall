import React, { Dispatch, SetStateAction, useRef } from "react";
import { itemType } from "../../types/type";
import CardTwo from "../card/CardTwo";
import { layout } from "../../theme/theme";

type CategoryTabPropsType = {
  cate: string;
  setCate: Dispatch<SetStateAction<string>>;
  cateItems: itemType[];
};

const categories = ["ALL", "BAGS", "WALLETS", "ACCESSORIES", "SCARVES"];

const CategoryTab = ({ cate, setCate, cateItems }: CategoryTabPropsType) => {
  const scrollRef = useRef<HTMLUListElement | null>(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const OnTabClick = (cat: string) => {
    setCate(cat);
  };

  return (
    <div
      className="w-100 h-100 mt-4"
      style={{
        maxWidth: layout.maxWidth,
        minWidth: 0,
      }}
    >
      {/* TAB BUTTONS */}
      <div
        className="w-100 mb-4"
        style={{
          overflow: "hidden",
        }}
      >
        <ul
          ref={scrollRef}
          className="
            list-unstyled
            d-flex align-items-center gap-2
            p-2 m-0
            rounded-pill
            bg-light
            w-100
          "
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            cursor: isDown.current ? "grabbing" : "grab",
            boxShadow:
              "inset 0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)",
          }}
          onMouseDown={(e) => {
            if (!scrollRef.current) return;

            isDown.current = true;

            startX.current = e.pageX;
            scrollLeft.current = scrollRef.current.scrollLeft;

            const onMouseMove = (moveEvent: MouseEvent) => {
              if (!scrollRef.current) return;

              moveEvent.preventDefault();

              const walk = moveEvent.pageX - startX.current;
              scrollRef.current.scrollLeft = scrollLeft.current - walk;
            };

            const onMouseUp = () => {
              isDown.current = false;

              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          }}
        >
          {categories.map((cat) => {
            const isActive = cate === cat;

            return (
              <li
                key={cat}
                onClick={() => OnTabClick(cat)}
                className="
                  d-flex
                  justify-content-center
                  align-items-center
                  rounded-pill
                  fw-semibold
                "
                style={{
                  minWidth: "140px",
                  height: "48px",
                  padding: "0 20px",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "0.25s",
                  flex: "0 0 auto",

                  color: isActive ? "#e60023" : "#666",

                  background: isActive ? "white" : "transparent",

                  boxShadow: isActive
                    ? "0 6px 18px rgba(230,0,35,0.15), 0 2px 6px rgba(0,0,0,0.06)"
                    : "none",

                  transform: isActive ? "translateY(-1px)" : "translateY(0)",
                }}
              >
                {cat === "ALL" ? "전체" : cat}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ITEMS */}
      <div
        className="
          border
          rounded-5
          bg-white
          d-flex
          justify-content-center
          align-items-center
          flex-wrap
          w-100
          p-3
        "
        style={{
          minHeight: "600px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        {cateItems.length > 0 ? (
          cateItems.map((item) => <CardTwo key={item.id} item={item} />)
        ) : (
          <em
            className="w-100 ps-3"
            style={{
              color: "#666",
              fontStyle: "normal",
            }}
          >
            상품이 없습니다.
          </em>
        )}
      </div>
    </div>
  );
};

export default CategoryTab;
