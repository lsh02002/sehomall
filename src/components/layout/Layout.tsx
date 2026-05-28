import React from "react";
import styled from "styled-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  position: relative;
  box-sizing: border-box;

  overflow-x: hidden;

  padding-bottom: 110px;
`;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  box-sizing: border-box;

  padding-bottom: 110px;
`;
