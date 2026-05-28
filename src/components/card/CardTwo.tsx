import { Link } from "react-router-dom";
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
    <div
      className="card border-0 m-2 rounded-4 overflow-hidden"
      style={{
        width: "140px",
        transition: "0.4s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "5px 5px 5px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Link
        to={`/detail/${item.id}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={item.files[0].fileUrl}
          alt={item.name}
          className="card-img-top rounded-4"
          style={{
            width: "140px",
            height: "140px",
            objectFit: "cover",
          }}
        />

        <div className="card-body px-1 py-2">
          <div
            className="text-truncate"
            style={{
              fontSize: "var(--main-font-size)",
            }}
          >
            {item.name}
          </div>

          <div
            className="text-danger"
            style={{
              fontSize: "var(--main-price-font-size)",
            }}
          >
            {item.price.toLocaleString()}원
          </div>
        </div>
      </Link>

      <div className="d-flex justify-content-end align-items-center pe-1">
        <HeartCount id={item.id} heartCount={item.heartCount} />

        <img
          src={ShoppingCart}
          alt="장바구니"
          onClick={OnAddToCartClick}
          style={{
            width: "18px",
            height: "18px",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default CardTwo;
