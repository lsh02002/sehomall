import React from "react";
import Layout from "../components/layout/Layout";

const ContactPage = () => {
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
        <h1 className="fw-bold mb-4">CONTACT</h1>

        <p
          className="text-secondary"
          style={{
            maxWidth: "600px",
            lineHeight: "1.8",
            fontSize: "16px",
          }}
        >
          문의사항이나 피드백이 있으시면 아래 이메일로 연락 부탁드립니다.
        </p>

        <div
          className="
            mt-4 p-4
            bg-light rounded-5 shadow-sm
          "
          style={{
            minWidth: "320px",
          }}
        >
          <div className="mb-3">
            <strong>Email</strong>
            <br />
            lsh02002@hanmail.net
          </div>

          <div className="mb-3">
            <strong>GitHub</strong>
            <br />
            github.com/lsh02002
          </div>

          <div>
            <strong>Blog</strong>
            <br />
            blog.naver.com/lsh02002
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
