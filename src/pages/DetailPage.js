import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { DetailItem, OnAddToCart } from "../api/ItemApi";
import Layout from "../components/Layout";
import { CartContext } from "../api/cartContextApi";

const DetailPage = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const { setCartCount } = useContext(CartContext);

  useEffect(() => {
    DetailItem(id)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Layout>
      <Main>
        <Image>{item && <img src={item.files[0].fileUrl} alt="" />}</Image>
        <Info>
          {item && (
            <>
              <h3>{item.name}</h3>
              <span>Price {item.price.toLocaleString()} 원</span>
              <span>적립금 {0} 원 </span>
              <span>{item.description}</span>
              <span>Size {item.size}</span>
              <span>Care Guide {item.careGuide}</span>
            </>
          )}
          <BuyNow>Buy Now</BuyNow>
          <AddToCart onClick={()=>OnAddToCart(id, setCartCount)}>Add To Cart</AddToCart>
        </Info>
      </Main>
    </Layout>
  );
};

export default DetailPage;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 190px);
  margin: 40px 0 0 10px;
`;

const Image = styled.div`
  width: 400px;
  height: 400px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  min-width: 400px;
  margin-left: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
  h3 {
    width: 100%;
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
  }
  span {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 20px;
  }
`;

const BuyNow = styled.button`
  margin-top: 30px;
  width: 100%;
  border: none;
  padding: 10px;
  background-color: pink;
  cursor: pointer;
`;

const AddToCart = styled.button`
  margin-top: 10px;
  width: 100%;
  border: none;
  padding: 10px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid black;
`;
