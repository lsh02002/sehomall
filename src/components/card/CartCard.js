import React, { useContext } from "react";
import styled from "styled-components";
import { DelCartItem, UpdateCartItem } from "../../api/sehomallApi";
import { CartContext } from "../../api/cartContextApi";
import HeartCount from "../HeartCount";
import { Link } from "react-router-dom";

const CartCard = ({ item }) => {
  const { isDeleting, setIsDeleting, isEditing, setIsEditing } =
    useContext(CartContext);

  const onAdd = () => {
    item.count = item.count + 1;

    UpdateCartItem(item.itemId, item.count, item.checked)
      .then((res) => {
        // console.log(res);
        setIsEditing(!isEditing);
        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(err.response.data.detailMessage);
        }
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
        // console.log(res);
        setIsEditing(!isEditing);
        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(err.response.data.detailMessage);
        }
      });
  };

  const onDel = (id) => {
    DelCartItem(id)
      .then((res) => {
        // console.log(res);
        setIsDeleting(!isDeleting);
        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(err.response.data.detailMessage);
        }
      });
  };

  const onChecked = ({ target }) => {
    UpdateCartItem(item.itemId, item.count, target.checked)
      .then((res) => {
        // console.log(res);
        setIsEditing(!isEditing);
        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(err.response.data.detailMessage);
        }
      });
  };

  return (
    <Container>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={(e) => onChecked(e)}
      />
      <Link to={`/detail/${item.itemId}`}>
        <img src={item.fileUrl} alt="" />
      </Link>
      <Info>
        <Link to={`/detail/${item.itemId}`}>
          <div>상품 아이디: {item.itemId}</div>
          <div>상품명: {item.itemName}</div>
          <div>가격: {item.price.toLocaleString()}원</div>
        </Link>
      </Info>
      <Count>
        <button onClick={onAdd}>+</button>
        <div>{item.count}</div>
        <button onClick={onSub}>-</button>
      </Count>
      <TwoButton>
        <DeleteItem>
          <button onClick={() => onDel(item.itemId)}>아이템 삭제</button>
        </DeleteItem>
        <HeartCount id={item.itemId} heartCount={item.heartCount} />
      </TwoButton>
    </Container>
  );
};

export default CartCard;

const Container = styled.article`
  display: flex;
  justify-content: start;
  align-items; center;
  max-width: 600px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 10px;
  border: 1px solid lightgray;
  padding: 5px;
  position: relative;
  img {
    width: 100px;
    height: 100px;
    padding: 0px 10px;
    object-fit: cover;
  }
    a{
    text-decoration: none;
    color: black;
    }
`;

const Info = styled.div`
  padding: 5px;
`;

const TwoButton = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 200px;
  img {
    width: 24px;
    height: 24px;
  }
  div:last-child {
    width: 50px;
  }
`;

const Count = styled.div`
  padding-left: 25px;
  text-align: center;
`;

const DeleteItem = styled.div`
  width: 100%;
  text-align: center;
`;
