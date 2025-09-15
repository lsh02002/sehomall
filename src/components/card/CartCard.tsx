import styled from "styled-components";
import { useCart } from "../../api/cartContextApi";
import HeartCount from "../HeartCount";
import { Link } from "react-router-dom";
import { itemCartType } from "../../types/type";

const CartCard = ({ item }: { item: itemCartType }) => {
  const {
    setCartCount,
    cartItems,
    setCartItems,    
  } = useCart();

  const onAdd = () => {
    item.itemCount = item.itemCount + 1;
    setCartItems(
      cartItems.map((it) =>
        it.itemId === item.itemId ? { ...it, itemCount: item?.itemCount } : it
      )
    );    
  };

  const onSub = () => {
    item.itemCount = item.itemCount - 1;

    if (item.itemCount <= 0) {
      item.itemCount = 1;
      return;
    }

    setCartItems(
      cartItems.map((it) =>
        it.itemId === item.itemId ? { ...it, count: item?.itemCount } : it
      )
    );    
  };

  const onDel = (id: number) => {
    setCartItems(cartItems.filter((it) => it.itemId !== item.itemId));
    setCartCount(cartItems.length - 1);
  };

  const onChecked = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCartItems(
      cartItems.map((it) =>
        it.itemId === item.itemId ? { ...it, checked: target?.checked } : it
      )
    );
  };

  return (
    <Container>
      <ItemGroup>
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
      </ItemGroup>
      <ButtonGroup>
        <Count>
          <button onClick={onAdd}>+</button>
          <div>{item.itemCount}</div>
          <button onClick={onSub}>-</button>
        </Count>
        <TwoButton>
          <DeleteItem>
            <button onClick={() => onDel(item.itemId)}>아이템 삭제</button>
          </DeleteItem>
          <HeartCount id={item.itemId} heartCount={item.heartCount} />
        </TwoButton>
      </ButtonGroup>
    </Container>
  );
};

export default CartCard;

const Container = styled.article`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
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
  a {
    text-decoration: none;
    color: black;
  }
`;

const ItemGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Info = styled.div`
  padding: 5px;
  font-size: var(--main-font-size);
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
`;

const TwoButton = styled.div`  
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px; 
    
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
  padding-right: 50px;
  text-align: center;
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  button {
    text-align: right;
    border: none;
    padding: 5px 10px;
    color: white;
    background-color: gray;
    transition: 0.2s;
    cursor: pointer;
    font-size: var(--button-font-size);
    &:hover {
      background-color: lightgray;
    }
  }
`;

const DeleteItem = styled.div`
  width: 100%;
  text-align: center;

  button {
    text-align: right;
    border: none;
    padding: 5px 10px;
    color: white;
    background-color: gray;
    transition: 0.2s;
    cursor: pointer;
    font-size: var(--button-font-size);
    &:hover {
      background-color: lightgray;
    }
  }
`;
