import React from "react";
import Twitter from "../../assets/icons8-twitter-50.png";
import Facebook from "../../assets/icons8-facebook-50.png";
import Instagram from "../../assets/icons8-instagram-50.png";

const Footer = () => {
  return (
    <footer
      className="
        mt-5 w-100 bg-light
        d-flex flex-column flex-md-row
        justify-content-between
        px-4 px-md-5 py-5
      "
      style={{
        minHeight: "250px",
      }}
    >
      {/* LEFT */}
      <div
        className="
          d-flex flex-column
          mb-4 mb-md-0
        "
      >
        <h2
          className="fw-normal mb-3"
          style={{
            fontSize: "2rem",
          }}
        >
          SEHOMALL
        </h2>

        <small className="text-secondary mb-2">
          사업자등록번호: 000-0000-0000
        </small>

        <small className="text-secondary mb-2">주소: 서울특별시 구로구</small>

        <small className="text-secondary mt-3">
          &copy; All rights reserved by L.S.H.
        </small>
      </div>

      {/* RIGHT */}
      <div
        className="
          d-flex align-items-start justify-content-md-end
          gap-3
        "
      >
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <img
            src={Twitter}
            alt="twitter"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={Facebook}
            alt="facebook"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={Instagram}
            alt="instagram"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
