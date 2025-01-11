import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { getItems } from "../api/ItemApi";
import Layout from "../components/Layout";

const MainPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems()
      .then((res) => {
        setItems(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Main>
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
      </Main>
    </Layout>
  );
};

export default MainPage;

const Main = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: calc(100% - 190px);
  margin: 10px 0 0 10px;
  flex-wrap: wrap;
  box-sizing: border-box;
`;
