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
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 1,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 1,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
          860: {
            slidesPerView: 5,
            spaceBetween: 1,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 1,
          },
          1200: {
            slidesPerView: 8,
            spaceBetween: 1,
          },
          1400: {
            slidesPerView: 9,
            spaceBetween: 1,
          }
        }}
        pagination={{
          clickable: true,
        }}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "1600px",
          justifyContent: "flex-start",
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
