import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import CardOne from "../card/CardOne";
import { itemType } from "../../types/type";
import { layout } from "../../them/them";

import styled from "styled-components";

const CARD_WIDTH = 140;

function ItemSlider({ items }: { items: itemType[] }) {
  return (
    <Wrapper>
      <CustomPrevButton className="custom-prev">
        <FaChevronLeft />
      </CustomPrevButton>

      <CustomNextButton className="custom-next">
        <FaChevronRight />
      </CustomNextButton>

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
    </Wrapper>
  );
}

export default ItemSlider;

const Wrapper = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  position: relative;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  z-index: 100;

  width: 42px;
  height: 42px;

  border: none;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.95);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.08);

  transition: 0.2s;

  svg {
    font-size: 14px;
    color: #222;
  }

  &:hover {
    transform: translateY(-50%) scale(1.08);
    background: white;
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }
`;

const CustomPrevButton = styled(ArrowButton)`
  left: -10px;
`;

const CustomNextButton = styled(ArrowButton)`
  right: -10px;
`;