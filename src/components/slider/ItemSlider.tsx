import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import required modules
import { Navigation } from "swiper/modules";
import CardOne from "../card/CardOne";
import { itemType } from "../../types/type";

function ItemSlider({ items }: { items: itemType[] }) {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={5}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        pagination={{
          clickable: true,
        }}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "1400px",
          padding: "10px",
        }}
      >
        {items.length > 0 &&
          items.map((item, index) => (
            <SwiperSlide key={index}>
              <CardOne item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default ItemSlider;
