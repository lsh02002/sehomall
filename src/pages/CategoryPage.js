import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { CategoryItems } from "../api/ItemApi";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const CategoryPage = () => {
  const [items, setItems] = useState([]);
  const { cat } = useParams();

  useEffect(() => {
    CategoryItems(cat)
      .then((res) => {
        console.log(res.data.content);
        setItems(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cat]);

  return (
    <Layout>
      <Main>
        <Title>
          <span>카테고리</span> : {cat}
        </Title>
        <Items>
          {items &&
            items.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                image={item.files[0].fileUrl}
                name={item.name}
                price={item.price}
                heartCount={item.heartCount}
              />
            ))}
        </Items>
      </Main>
    </Layout>
  );
};

export default CategoryPage;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 100%;
  margin: 10px;  
`;

const Title = styled.h1`
  margin: 10px 0 0 10px;
  span {
    font-size: 0.8em;
  }
`;

const Items = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;  
  flex-wrap: wrap;  
`;
