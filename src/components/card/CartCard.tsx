import { Link } from "react-router-dom";
import { useCart } from "../../api/cartContextApi";
import HeartCount from "../HeartCount";
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
    <div
      className="
        d-flex justify-content-between align-items-center
        gap-4 p-4 mx-auto my-3
        border rounded-5 bg-white shadow-sm
        flex-column flex-md-row
      "
      style={{
        maxWidth: layout.maxWidth,
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* LEFT */}
      <div className="d-flex align-items-center gap-3 flex-grow-1 min-w-0">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={onChecked}
          className="form-check-input m-0"
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
        />

        <Link to={`/detail/${item.itemId}`}>
          <img
            src={item.fileUrl}
            alt={item.itemName}
            className="rounded-4"
            style={{
              width: "110px",
              height: "110px",
              objectFit: "cover",
              background: "#f4f4f4",
            }}
          />
        </Link>

        <div className="min-w-0">
          <Link
            to={`/detail/${item.itemId}`}
            className="text-decoration-none text-dark"
          >
            <div
              className="fw-bold text-truncate mb-2"
              style={{
                fontSize: "18px",
              }}
            >
              {item.itemName}
            </div>

            <div
              className="text-secondary mb-2"
              style={{
                fontSize: "13px",
              }}
            >
              상품 아이디: {item.itemId}
            </div>

            <div
              className="fw-bold text-danger"
              style={{
                fontSize: "17px",
              }}
            >
              {item.price.toLocaleString()}원
            </div>
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="
          d-flex align-items-center gap-4
          justify-content-between justify-content-md-end
          w-100 w-md-auto
        "
      >
        {/* COUNT */}
        <div
          className="d-flex align-items-center gap-3 px-2 rounded-pill"
          style={{
            height: "44px",
            background: "#f6f6f6",
          }}
        >
          <button
            onClick={onSub}
            className="btn btn-light border rounded-4 fw-bold"
            style={{
              minWidth: "38px",
              height: "38px",
            }}
          >
            -
          </button>

          <span
            className="fw-bold text-center"
            style={{
              minWidth: "24px",
            }}
          >
            {item.itemCount}
          </span>

          <button
            onClick={onAdd}
            className="btn btn-light border rounded-4 fw-bold"
            style={{
              minWidth: "38px",
              height: "38px",
            }}
          >
            +
          </button>
        </div>

        {/* ACTION */}
        <div className="d-flex align-items-center gap-3">
          <HeartCount id={item.itemId} heartCount={item.heartCount} />

          <button
            onClick={onDel}
            className="btn rounded-pill fw-bold"
            style={{
              background: "#fff1f1",
              color: "#e60023",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e60023";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff1f1";
              e.currentTarget.style.color = "#e60023";
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
