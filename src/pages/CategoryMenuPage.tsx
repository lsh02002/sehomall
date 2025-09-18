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
              세호쇼핑몰 <span>(클론코딩)</span>
            </Link>
          </Title>
          <CatLink to={"/cat/new"}>새 상품</CatLink>
          <CatLink to={"/cat/BAGS"}>가방</CatLink>
          <CatLink to={"/cat/WALLETS"}>지갑</CatLink>
          <CatLink to={"/cat/ACCESSORIES"}>악세서리</CatLink>
          <CatLink to={"/cat/SCARVES"}>스카프</CatLink>
          <CatLink to={"/about"}>쇼핑몰 소개</CatLink>
          <CatLink to={"/notice?page=1&size=5"}>공지사항</CatLink>
          <CatLink to={"/contact"}>연락처</CatLink>
          <CatLink to={"/instagram"}>인스타그램</CatLink>          
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
