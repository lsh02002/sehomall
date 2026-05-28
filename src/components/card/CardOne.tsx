import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoppingCart from "../../assets/shopping-cart.svg";
import HeartCount from "../HeartCount";
import { useLogin } from "../../api/loginContextApi";
import { itemCartType, itemType } from "../../types/type";
import { useCart } from "../../api/cartContextApi";

const CardOne = ({ item }: { item: itemType }) => {
  const { isLogin } = useLogin();
  const { setCartCount, cartItems, setCartItems, isEditing, setIsEditing } =
    useCart();

  const OnAddToCartClick = () => {
    if (!isLogin) {
      alert("장바구니 기능은 로그인 하셔야 합니다.");
      return;
    }

    if (cartItems?.find((it) => it.itemId === item.id)) {
      alert("이미 이 상품이 장바구니에 있습니다.");
      return;
    }

    const tempItem: itemCartType = {
      itemId: item.id,
      itemCount: 1,
      itemName: item.name,
      price: item.price,
      fileUrl: item.files?.[0]?.fileUrl,
      checked: true,
      heartCount: item.heartCount,
    };

    setCartItems([...cartItems, tempItem]);
    setCartCount(cartItems.length + 1);
    setIsEditing(!isEditing);
  };

  return (
    <Container>
      <Link to={`/detail/${item.id}`}>
        <ProductImage src={item.files?.[0]?.fileUrl} alt={item.name} />
        <Title>{item.name}</Title>
        <Price>{item.price.toLocaleString()}원</Price>
      </Link>

      <CartImage>
        <HeartCount id={item.id} heartCount={item.heartCount} />
        <CartIcon
          src={ShoppingCart}
          alt="장바구니"
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
  width: 130px;
  height: 200px;
  box-sizing: border-box;
  position: relative;
  transition: 0.4s;
  overflow: hidden;

  a {
    text-decoration: none;
    color: black;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  display: block;
`;

const Title = styled.span`
  font-size: var(--main-font-size);
  display: block;
  background-color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  gap: 6px;
  width: 100%;
  margin-top: 4px;
  z-index: 300;
  position: relative;

  span {
    color: red;
  }
`;

const CartIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  cursor: pointer;
`;

const ItemInfo = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.35);
  transition: 0.5s;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--main-price-font-size);
  z-index: 200;
  border-radius: 16px;

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
