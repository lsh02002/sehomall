import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryItems, NewItems } from "../api/ItemApi";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import CardOne from "../components/card/CardOne";

const CategoryPage = () => {
  const [items, setItems] = useState([]);
  const { cat } = useParams();

  useEffect(() => {
    if (cat === "new") {
      NewItems(cat)
        .then((res) => {
          console.log(res.data.content);
          setItems(res.data.content);
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            alert(err.response.data.detailMessage);
          }
        });
    } else {
      CategoryItems(cat)
        .then((res) => {
          console.log(res.data.content);
          setItems(res.data.content);
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            alert(err.response.data.detailMessage);
          }
        });
    }
  }, [cat]);

  return (
    <Layout>
      <Container>
        <ItemsInner>
          <Title>
            {cat && cat !== "new" && (
              <div>
                <span>카테고리</span> : {cat}
              </div>
            )}
          </Title>
          <Items>
            {items.length > 0 ? (
              items.map((item, index) => <CardOne key={index} item={item} />)
            ) : (
              <div>상품이 없습니다.</div>
            )}
          </Items>
        </ItemsInner>
      </Container>
    </Layout>
  );
};

export default CategoryPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 100%;
  margin: 10px;
  margin-top: 50px;
`;

const Title = styled.h1`
  margin: 10px 0 0 10px;
  span {
    font-size: 0.8em;
  }
`;

const ItemsInner = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Items = styled.div`
  max-width: 1280px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  & > div {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
`;
