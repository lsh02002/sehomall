import styled from "styled-components";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const CategoryPage = () => {
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
          <Message>
            백엔드 비용이 발생하여 프론트엔드에서 가짜(더미)데이터를 사용하기로
            했습니다. 작업을 놓고 있었는데 디자인도 업데이트 노력하겠습니다.
          </Message>
        </ItemsInner>
      </Container>
    </Layout>
  );
};

export default CategoryPage;

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
text-align: left;
padding: 0 20px;
box-sizing: border-box;
  span {
    font-size: 0.8em;
  }
`;

const ItemsInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Message = styled.div`
  font-size: 14px;
  width: 200px;
  max-width: 40ch;
  padding: 0 0 0 20px;
  margin-top: 20px;
  background-color: gray;
  color: white;
  box-sizing: border-box;  
`;

const CatLink = styled(Link)`
  width: 100%;
  padding: 0 0 0 30px;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(82, 72, 72, 0.1);
  }
`;
