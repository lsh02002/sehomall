import React from "react";
import SideMenu from "./SideMenu";
import styled from "styled-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Main>
        <SideMenu />
        {children}
      </Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100vw;
  box-sizing: border-box;
`;

const Main = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;
