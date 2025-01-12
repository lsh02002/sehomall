import React, { useContext } from "react";
import styled from "styled-components";
import { DelCartItem, UpdateCartItem } from "../api/ItemApi";
import { CartContext } from "../api/cartContextApi";

const CartCard = ({ item }) => {  
  const { isDeleting, setIsDeleting, isEditing, setIsEditing } =
    useContext(CartContext);

  const onAdd = () => {
    item.count = item.count + 1;    

    UpdateCartItem(item.itemId, item.count, item.checked)
      .then((res) => {
        console.log(res);
        setIsEditing(!isEditing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSub = () => {
    item.count = item.count - 1;

    if (item.count <= 0) {
      item.count = 1;
      return;
    }
    
    UpdateCartItem(item.itemId, item.count, item.checked)
      .then((res) => {
        console.log(res);
        setIsEditing(!isEditing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDel = (id) => {
    DelCartItem(id)
      .then((res) => {
        console.log(res);
        setIsDeleting(!isDeleting);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChecked = ({ target }) => {

    UpdateCartItem(item.itemId, item.count, target.checked)
      .then((res) => {
        console.log(res);
        setIsEditing(!isEditing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={(e) => onChecked(e)}
      />
      <img src={item.fileUrl} alt="" />
      <Info>
        <div>상품 아이디: {item.itemId}</div>
        <div>상품명: {item.itemName}</div>
        <div>가격: {item.price.toLocaleString()}원</div>
      </Info>
      <Count>
        <button onClick={onAdd}>+</button>
        <div>{item.count}</div>
        <button onClick={onSub}>-</button>
      </Count>
      <DeleteItem>
        <button onClick={() => onDel(item.itemId)}>아이템 삭제</button>
      </DeleteItem>
    </Container>
  );
};

export default CartCard;

const Container = styled.article`
  display: flex;
  justify-content: start;
  align-items; center;
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 10px;
  border: 1px solid lightgray;
  padding: 5px;
  img {
    width: 100px;
    height: 100px;
    padding: 0px 10px;
    object-fit: cover;
  }  
`;

const Info = styled.div`
  padding: 5px;
`;

const Count = styled.div`
  padding-left: 25px;
  text-align: center;
`;

const DeleteItem = styled.div`
  padding-left: 25px;
  text-align: center;
`;
