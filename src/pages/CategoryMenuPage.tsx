import styled from "styled-components";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const CategoryMenuPage = () => {
  return (
    <Layout>
      <Container>
        <ItemsInner>
          <Title>
            <div>
              <span>카테고리</span>
            </div>
          </Title>
          <Title>
            <Link to="/">
              SEHOMALL <span>(clone coding)</span>
            </Link>
          </Title>
          <CatLink to={"/cat/new"}>NEW ARRIVAL</CatLink>
          <CatLink to={"/cat/BAGS"}>BAGS</CatLink>
          <CatLink to={"/cat/WALLETS"}>WALLETS</CatLink>
          <CatLink to={"/cat/ACCESSORIES"}>ACCESSORIES</CatLink>
          <CatLink to={"/cat/SCARVES"}>SCARVES</CatLink>
          <CatLink to={"/about"}>ABOUT</CatLink>
          <CatLink to={"/notice?page=1&size=5"}>NOTICE</CatLink>
          <CatLink to={"/contact"}>CONTACT</CatLink>
          <CatLink to={"/instagram"}>INSTAGRAM</CatLink>          
        </ItemsInner>
      </Container>
    </Layout>
  );
};

export default CategoryMenuPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 96vw;
  padding: 40px;
  margin-top: 50px;  
  box-sizing: border-box;
`;

const Title = styled.h1`
width: 100%;
padding: 0 20px;
box-sizing: border-box;
font-size: var(--main-h1-size);
  span {    
    font-size: 1em;
  }
`;

const ItemsInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const CatLink = styled(Link)`
  width: 100%;
  padding: 0 0 0 30px;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(82, 72, 72, 0.1);
  }
`;
