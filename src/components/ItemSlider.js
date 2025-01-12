import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import required modules
import { Navigation } from "swiper/modules";
import Card from "./Card";

function ItemSlider({ items }) {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={5}
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
          items.map((item) => (
            <SwiperSlide>
              <Card key={item.id} item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default ItemSlider;
