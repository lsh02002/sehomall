import React from "react";
import styled from "styled-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Main>        
        {children}
      </Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 150px;
`;

const Main = styled.div`  
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 70px;
`;
