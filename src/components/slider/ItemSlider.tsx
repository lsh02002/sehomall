import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import CardOne from "../card/CardOne";
import { itemType } from "../../types/type";
import { layout } from "../../theme/theme";

const CARD_WIDTH = 140;

function ItemSlider({ items }: { items: itemType[] }) {
  return (
    <div
      className="position-relative mx-auto w-100"
      style={{
        maxWidth: layout.maxWidth,
      }}
    >
      {/* PREV */}
      <button
        className="
          custom-prev
          position-absolute
          top-50 start-0
          translate-middle-y
          rounded-circle border-0
          d-flex justify-content-center align-items-center
          bg-white shadow
        "
        style={{
          width: "42px",
          height: "42px",
          zIndex: 100,
          left: "-10px",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        <FaChevronLeft
          style={{
            fontSize: "14px",
            color: "#222",
          }}
        />
      </button>

      {/* NEXT */}
      <button
        className="
          custom-next
          position-absolute
          top-50 end-0
          translate-middle-y
          rounded-circle border-0
          d-flex justify-content-center align-items-center
          bg-white shadow
        "
        style={{
          width: "42px",
          height: "42px",
          zIndex: 100,
          right: "-10px",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        <FaChevronRight
          style={{
            fontSize: "14px",
            color: "#222",
          }}
        />
      </button>

      {/* SWIPER */}
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Navigation]}
        style={{
          width: "100%",
        }}
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{
              width: `${CARD_WIDTH}px`,
              flexShrink: 0,
            }}
          >
            <CardOne item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ItemSlider;
