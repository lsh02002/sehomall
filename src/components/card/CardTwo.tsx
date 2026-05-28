import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoppingCart from "../../assets/shopping-cart.svg";
import { useLogin } from "../../api/loginContextApi";
import HeartCount from "../HeartCount";
import { itemCartType, itemType } from "../../types/type";
import { useCart } from "../../api/cartContextApi";

const CardTwo = ({ item }: { item: itemType }) => {
  const { isLogin } = useLogin();
  const { setCartCount, cartItems, setCartItems, isEditing, setIsEditing } =
    useCart();

  const OnAddToCartClick = () => {
    if (!isLogin) {
      alert("장바구니 기능은 로그인 하셔야 합니다.");
      return;
    }

    if (cartItems?.find((it) => it.itemId === item?.id)) {
      alert("이미 이 상품이 장바구니에 있습니다.");
      return;
    }

    const tempItem: itemCartType = {
      itemId: item?.id,
      itemCount: 1,
      itemName: item?.name,
      price: item?.price,
      fileUrl: item?.files[0].fileUrl,
      checked: true,
      heartCount: item?.heartCount,
    };

    setCartItems([...cartItems, tempItem]);
    setCartCount(cartItems.length + 1);
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
    </Container>
  );
};

export default CardTwo;

const Container = styled.article`
  width: 140px;
  height: 200px;
  box-sizing: border-box;
  margin: 10px;
  transition: 0.4s;
  border-radius: 16px;
  img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 16px;
    transition: 0.1s;
  }
  &:hover {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const Title = styled.span`
  font-size: var(--main-font-size);
  display: block;
  background-color: #fff;
`;

const Price = styled.span`
  font-size: var(--main-price-font-size);
  color: red;
  display: block;
  background-color: #fff;
`;

const CartImage = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  z-index: 300;
  padding-right: 2px;
  box-sizing: border-box;
  img {
    width: 18px;
    height: 18px;
    object-fit: cover;
  }
  span {
    color: red;
  }
`;
