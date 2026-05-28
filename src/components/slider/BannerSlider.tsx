// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

import bannerImages from "../../api/bannerImages";

function BannerSlider() {
  return (
    <Swiper
      navigation
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop
      speed={1000}
      pagination={{
        clickable: true,
      }}
      style={{
        width: "100%",
        height: "400px",
        padding: "0",
        boxSizing: "border-box",
      }}
      className="rounded-4 overflow-hidden"
    >
      {bannerImages.length > 0 &&
        bannerImages.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="
                h-100 d-flex
                justify-content-center
                align-items-center
                overflow-hidden
              "
              style={{
                backgroundColor: "rgba(0,0,0,0.05)",
              }}
            >
              <img
                src={item.image}
                alt=""
                className="h-100"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default BannerSlider;
