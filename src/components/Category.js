import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Category = () => {  
    return (
        <Container>
        <CatLink to={"/"}>NEW ARRIVAL</CatLink>
        <CatLink to={"/cat/BAGS"}>BAGS</CatLink>
        <CatLink to={"/cat/WALLETS"}>WALLETS</CatLink>
        <CatLink to={"/cat/ACCESSORIES"}>ACCESSORIES</CatLink>
        <CatLink to={"/cat/SCARVES"}>SCARVES</CatLink>
        <CatLink to={"/about"}>ABOUT</CatLink>
        <CatLink to={"/notice"}>NOTICE</CatLink>
        <CatLink to={"/contact"}>CONTACT</CatLink>        
        <CatLink to={"/instagram"}>INSTAGRAM</CatLink>
      </Container>
    );
};

export default Category;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 170px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid lightgray;  
`;

const CatLink = styled(Link)`
  width: 150px;
  padding-bottom: 3px;  
`;