import styled from "styled-components";
import { useCart } from "../../api/cartContextApi";
import HeartCount from "../HeartCount";
import { Link } from "react-router-dom";
import { itemCartType } from "../../types/type";
import { layout } from "../../them/them";

const CartCard = ({ item }: { item: itemCartType }) => {
  const { setCartCount, cartItems, setCartItems } = useCart();

  const onAdd = () => {
    setCartItems(
      cartItems.map((it) =>
        it.itemId === item.itemId ? { ...it, itemCount: it.itemCount + 1 } : it,
      ),
    );
  };

  const onSub = () => {
    setCartItems(
      cartItems.map((it) =>
        it.itemId === item.itemId
          ? { ...it, itemCount: Math.max(1, it.itemCount - 1) }
          : it,
      ),
    );
  };

  const onDel = () => {
    setCartItems(cartItems.filter((it) => it.itemId !== item.itemId));
    setCartCount(cartItems.length - 1);
  };

  const onChecked = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCartItems(
      cartItems.map((it) =>
        it.itemId === item.itemId ? { ...it, checked: target.checked } : it,
      ),
    );
  };

  return (
    <Container>
      <ItemGroup>
        <CheckBox type="checkbox" checked={item.checked} onChange={onChecked} />

        <Link to={`/detail/${item.itemId}`}>
          <ProductImage src={item.fileUrl} alt={item.itemName} />
        </Link>

        <Info>
          <Link to={`/detail/${item.itemId}`}>
            <ProductName>{item.itemName}</ProductName>
            <ProductId>상품 아이디: {item.itemId}</ProductId>
            <Price>{item.price.toLocaleString()}원</Price>
          </Link>
        </Info>
      </ItemGroup>

      <ButtonGroup>
        <Count>
          <button onClick={onSub}>-</button>
          <span>{item.itemCount}</span>
          <button onClick={onAdd}>+</button>
        </Count>

        <ActionGroup>
          <HeartCount id={item.itemId} heartCount={item.heartCount} />
          <DeleteButton onClick={onDel}>삭제</DeleteButton>
        </ActionGroup>
      </ButtonGroup>
    </Container>
  );
};

export default CartCard;

const Container = styled.article`
  width: 100%;
  max-width: ${layout.maxWidth};

  margin: 12px auto;
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 24px;

  border: 1px solid #eee;
  border-radius: 24px;

  background: #fff;

  box-sizing: border-box;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.03);

  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 14px 34px rgba(0, 0, 0, 0.07),
      0 4px 10px rgba(0, 0, 0, 0.04);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ItemGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  min-width: 0;
  flex: 1;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;

  accent-color: #111;

  cursor: pointer;
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 110px;
  height: 110px;

  object-fit: cover;

  border-radius: 18px;

  background: #f4f4f4;

  display: block;

  @media (max-width: 480px) {
    width: 88px;
    height: 88px;
  }
`;

const Info = styled.div`
  min-width: 0;

  font-size: var(--main-font-size);
`;

const ProductName = styled.div`
  margin-bottom: 8px;

  font-size: 18px;
  font-weight: 800;

  color: #111;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductId = styled.div`
  margin-bottom: 8px;

  font-size: 13px;
  color: #999;
`;

const Price = styled.div`
  font-size: 17px;
  font-weight: 700;

  color: #e60023;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;

  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Count = styled.div`
  height: 44px;

  padding: 0 8px;

  display: flex;
  align-items: center;
  gap: 12px;

  border-radius: 999px;

  background: #f6f6f6;

  span {
    min-width: 24px;

    text-align: center;

    font-size: 16px;
    font-weight: 700;
  }

  button {
    min-width: 38px;
    height: 38px;

    padding: 0 14px;

    border: 1px solid #e5e5e5;
    border-radius: 14px;

    background: #fafafa;

    color: #333;

    font-size: 15px;
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.04),
      0 1px 3px rgba(0, 0, 0, 0.03);

    transition:
      background 0.2s,
      transform 0.2s,
      box-shadow 0.25s,
      border-color 0.2s;

    user-select: none;

    &:hover {
      background: white;

      border-color: #d0d0d0;

      transform: translateY(-1px);

      box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.06),
        0 2px 6px rgba(0, 0, 0, 0.04);
    }

    &:active {
      transform: scale(0.96);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const DeleteButton = styled.button`
  height: 38px;

  padding: 0 16px;

  border: none;
  border-radius: 999px;

  background: #fff1f1;

  color: #e60023;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #e60023;
    color: #fff;
  }
`;
