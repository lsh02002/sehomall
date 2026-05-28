import styled from "styled-components";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { layout } from "../them/them";

const CategoryMenuPage = () => {
  return (
    <Layout>
      <Container>
        <Card>
          <TopText>SEHO SHOPPING</TopText>

          <MainTitle>
            카테고리
            <span>세호쇼핑몰 클론코딩</span>
          </MainTitle>

          <MenuGrid>
            <CatLink to={"/cat/new"}>
              <strong>NEW</strong>
              <span>새 상품</span>
            </CatLink>

            <CatLink to={"/cat/BAGS"}>
              <strong>BAGS</strong>
              <span>가방</span>
            </CatLink>

            <CatLink to={"/cat/WALLETS"}>
              <strong>WALLETS</strong>
              <span>지갑</span>
            </CatLink>

            <CatLink to={"/cat/ACCESSORIES"}>
              <strong>ACCESSORIES</strong>
              <span>악세서리</span>
            </CatLink>

            <CatLink to={"/cat/SCARVES"}>
              <strong>SCARVES</strong>
              <span>스카프</span>
            </CatLink>

            <CatLink to={"/about"}>
              <strong>ABOUT</strong>
              <span>쇼핑몰 소개</span>
            </CatLink>

            <CatLink to={"/notice?page=1&size=5"}>
              <strong>NOTICE</strong>
              <span>공지사항</span>
            </CatLink>

            <CatLink to={"/contact"}>
              <strong>CONTACT</strong>
              <span>연락처</span>
            </CatLink>

            <CatLink to={"/instagram"}>
              <strong>INSTAGRAM</strong>
              <span>인스타그램</span>
            </CatLink>
          </MenuGrid>

          <HomeLink to="/">세호쇼핑몰 메인으로 이동 →</HomeLink>
        </Card>
      </Container>
    </Layout>
  );
};

export default CategoryMenuPage;

const Container = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: transparent;
`;

const Card = styled.div`
  width: 100%; 

  background: transparent;

  margin: 20px;

  border-radius: 32px;

  box-sizing: border-box;
`;

const TopText = styled.div`
  font-size: 13px;
  letter-spacing: 4px;
  color: #999;
  margin-bottom: 18px;
`;

const MainTitle = styled.h1`
  margin: 0;

  font-size: clamp(36px, 6vw, 56px);
  font-weight: 800;

  color: #111;

  display: flex;
  flex-direction: column;

  span {
    margin-top: 12px;

    font-size: 16px;
    font-weight: 400;

    color: #777;
  }
`;

const MenuGrid = styled.div`
  margin-top: 50px;

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  gap: 20px;
`;

const CatLink = styled(Link)`
  height: 100px;

  padding: 20px;

  border-radius: 24px;

  background: #fafafa;

  border: 1px solid #f0f0f0;

  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition:
    transform 0.25s,
    box-shadow 0.25s,
    background 0.25s;

  box-sizing: border-box;

  strong {
    font-size: 20px;
    color: #111;
    letter-spacing: 1px;
  }

  span {
    font-size: 15px;
    color: #666;
  }

  &:hover {
    transform: translateY(-6px);

    background: white;

    box-shadow:
      0 16px 30px rgba(0, 0, 0, 0.08),
      0 4px 10px rgba(0, 0, 0, 0.04);
  }
`;

const HomeLink = styled(Link)`
  margin-top: 40px;

  display: inline-flex;
  align-items: center;

  text-decoration: none;

  color: #111;

  font-weight: 600;

  transition: 0.2s;

  &:hover {
    transform: translateX(4px);
  }
`;
