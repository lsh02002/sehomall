import React from "react";
import Layout from "../components/layout/Layout";

const InstagramPage = () => {
  return (
    <Layout>
      <div
        className="
          container
          d-flex flex-column
          justify-content-center align-items-center
          text-center
          py-5
        "
        style={{
          marginTop: "50px",
          minHeight: "60vh",
        }}
      >
        <h1 className="fw-bold mb-4">INSTAGRAM</h1>

        <p
          className="text-secondary"
          style={{
            maxWidth: "600px",
            lineHeight: "1.8",
            fontSize: "16px",
          }}
        >
          세호쇼핑몰 및 개발자의 작업물을 인스타그램에서도 확인하실 수 있습니다.
        </p>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            btn btn-dark
            rounded-pill
            px-4 py-3
            mt-4 fw-semibold
          "
        >
          인스타그램 바로가기
        </a>

        <div
          className="
            mt-5 p-4
            bg-light rounded-5 shadow-sm
          "
          style={{
            maxWidth: "500px",
          }}
        >
          <h5 className="fw-bold mb-3">개발자 메모</h5>

          <p
            className="text-secondary mb-0"
            style={{
              lineHeight: "1.7",
            }}
          >
            현재 포트폴리오 및 클론코딩 중심으로 운영되고 있으며, 추후 쇼핑몰
            디자인 및 기능 업데이트와 함께 SNS 연동도 추가할 예정입니다.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default InstagramPage;
