import { Link } from "react-router-dom";
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
    <div
      className="card border-0 position-relative overflow-hidden"
      style={{ width: "130px" }}
    >
      <Link
        to={`/detail/${item.id}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={item.files?.[0]?.fileUrl}
          alt={item.name}
          className="card-img-top rounded-4"
          style={{
            aspectRatio: "1 / 1",
            objectFit: "cover",
          }}
        />

        <div className="card-body px-0 py-2">
          <div
            className="text-truncate"
            style={{ fontSize: "var(--main-font-size)" }}
          >
            {item.name}
          </div>

          <div
            className="text-danger fw-bold"
            style={{ fontSize: "var(--main-price-font-size)" }}
          >
            {item.price.toLocaleString()}원
          </div>
        </div>
      </Link>

      <div className="d-flex justify-content-end align-items-center gap-2 mt-1 position-relative z-3">
        <HeartCount id={item.id} heartCount={item.heartCount} />

        <img
          src={ShoppingCart}
          alt="장바구니"
          onClick={OnAddToCartClick}
          style={{
            width: "18px",
            height: "18px",
            objectFit: "contain",
            cursor: "pointer",
          }}
        />
      </div>

      <Link to={`/detail/${item.id}`} className="text-decoration-none">
        <div
          className="
            position-absolute top-0 start-0 w-100 h-100
            d-flex flex-column justify-content-center align-items-center
            text-white rounded-4
            opacity-0
          "
          style={{
            backgroundColor: "rgba(0,0,0,0.35)",
            transition: "0.5s",
            fontSize: "var(--main-price-font-size)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0";
          }}
        >
          <div className="pb-1">{item.name}</div>
          <div className="pb-1 text-danger">
            {item.price.toLocaleString()}원
          </div>
          <div className="pb-1">조회수: {item.views}</div>
          <div className="pb-1">등록날짜: {item.createAt}</div>
          <div className="pb-1">등록자: {item.userNickname}</div>
          <div className="pb-1">Review 수: {item.reviewCount}</div>

          {item.count < 1 ? (
            <div>
              재고 수량: <span className="text-danger">품절됨</span>
            </div>
          ) : (
            <div>재고 수량: {item.count}</div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CardOne;
