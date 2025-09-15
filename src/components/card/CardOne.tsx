import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoppingCart from "../../assets/shopping-cart.svg";
import HeartCount from "../HeartCount";
import { useLogin } from "../../api/loginContextApi";
import { itemCartType, itemType } from "../../types/type";
import { useCart } from "../../api/cartContextApi";

const CardOne = ({ item }: { item: itemType }) => {
  const { isLogin } = useLogin();
  const { cartItems, setCartItems, isEditing, setIsEditing } = useCart();

  const OnAddToCartClick = () => {
    if (!isLogin) {
      alert("장바구니 기능은 로그인 하셔야 합니다.");
      return;
    }

    const tempItem: itemCartType = {
      itemId: item?.id,
      count: item?.count,
      itemName: item?.name,
      price: item?.price,
      fileUrl: item?.files[0].fileUrl,
      checked: true,
      heartCount: item?.heartCount,
    };

    setCartItems([...cartItems, tempItem]);
    setIsEditing(!isEditing);
  };

  return (
    <Container>
      <Link to={`/detail/${item.id}`}>
        <img width="230px" height="230px" src={item.files[0].fileUrl} alt="" />
        <Title>{item.name}</Title>
        <Price>{item.price.toLocaleString()}원</Price>
      </Link>
      <CartImage>
        <HeartCount id={item.id} heartCount={item.heartCount} />
        <img
          style={{ cursor: "pointer" }}
          src={ShoppingCart}
          alt=""
          onClick={OnAddToCartClick}
        />
      </CartImage>
      <Link to={`/detail/${item.id}`}>
        <ItemInfo>
          <div>{item.name}</div>
          <span>{item.price.toLocaleString()}원</span>
          <div>조회수: {item.views}</div>
          <div>등록날짜: {item.createAt}</div>
          <div>등록자: {item.userNickname}</div>
          <div>Review 수: {item.reviewCount}</div>
          {item.count < 1 ? (
            <div>
              재고 수량: <span>품절됨</span>
            </div>
          ) : (
            <div>재고 수량: {item.count}</div>
          )}
        </ItemInfo>
      </Link>
    </Container>
  );
};

export default CardOne;

const Container = styled.article`  
  width: 140px;
  height: 200px;
  img {
    width: 132px;
    height: 140px;
    margin: 2px;
    object-fit: cover;
  }
  box-sizing: border-box;
  margin: 18px;
  position: relative;
  a {
    text-decoration: none;
    color: black;
  }
`;

const Title = styled.span`
  font-size: var(--main-font-size);
  display: block;
  padding: 5px 5px;
  background-color: #fff;
`;

const Price = styled.span`
  font-size: var(--main-font-size);
  color: red;
  display: block;
  background-color: #fff;
  padding: 0px 5px 0px 5px;
`;

const CartImage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  bottom: 25px;
  width: 45px;
  height: 20px;
  z-index: 10;
  img {
    width: 18px;
    height: 18px;
    object-fit: cover;
  }
  span {
    color: red;
  }
`;

const ItemInfo = styled.div`
  position: absolute;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  top: -10px;
  left: -10px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  transition: 0.5s;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--main-font-size);
  z-index: 200;
  &:hover {
    opacity: 1;
  }
  div {
    color: white;
    padding-bottom: 5px;
  }
  span {
    color: red;
  }
`;
