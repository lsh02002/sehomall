import React from "react";
import Category from "./Category";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Container>
      <Category />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
  box-sizing: border-box;  
`;

const Main = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 190px);
`;
