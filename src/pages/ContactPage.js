import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";

const ContactPage = () => {
  return (
    <Layout>
      <Container>연락처 페이지입니다.</Container>
    </Layout>
  );
};

export default ContactPage;

const Container = styled.div`
  margin-top: 50px;
`;
