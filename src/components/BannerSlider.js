// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import styled from "styled-components";
import bannerImages from "../api/bannerImages";

function BannerSlider() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        pagination={{
          clickable: true,
        }}
        style={{
          width: "calc(100% - 190px)",
          height: "500px",
          padding: "20px",
        }}
      >
        {bannerImages.length > 0 &&
          bannerImages.map((item) => (
            <SwiperSlide key={item.id}>
              <Slide>
                <img src={item.image} alt="" />
                <div>
                  <h3>{item.content}</h3>
                </div>
              </Slide>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default BannerSlider;

const Slide = styled.div`
  // border: 1px solid lightgray;
  height: 100%;
  line-height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.05);
  img {
    object-fit: cover;
  }
  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;    
    box-sizing: border-box;
    h3 {
      font-size: 1.1em;
      font-weight: normal;
    }
  }
`;
