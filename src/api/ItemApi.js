import axios from "axios";
import { BASE_URL } from "./baseUrl";

const NewItems = async () => {
  return axios.get(`${BASE_URL}/api/items?sort=createAt,DESC&size=10`);
};

const CategoryItems = async (category) => {
  if (category === "ALL") {
    return axios.get(`${BASE_URL}/api/items?sort=createAt,DESC`);
  } else {
    return axios.get(
      `${BASE_URL}/api/items/category/${category}?sort=createAt,DESC`
    );
  }
};

const PopularItems = async () => {
  return axios.get(`${BASE_URL}/api/items?sort=views,DESC&size=10`);
};

const UserLogin = async (email, password) => {
  return axios.post(
    `${BASE_URL}/user/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

const UserSignup = async (userInfo) => {
  return axios.post(`${BASE_URL}/user/sign-up`, userInfo);
};

const UserLogout = async () => {
  return axios.delete(`${BASE_URL}/user/logout`, {
    withCredentials: "true",
  });
};

const EnrollItem = async (formDataToSend) => {
  return axios.post(`${BASE_URL}/api/items`, formDataToSend, {
    withCredentials: "true",
  });
};

const DetailItem = async (id) => {
  return axios.get(`${BASE_URL}/api/items/${id}`);
};

const SearchItemsByKeyword = async (keyword) => {
  return axios.get(`${BASE_URL}/api/items/search/${keyword}`);
};

const AddCart = async (itemId, count, checked) => {
  return axios.post(
    `${BASE_URL}/cart`,
    {
      itemId,
      count,
      checked,
    },
    {
      withCredentials: "true",
    }
  );
};

const FindCartItems = async () => {
  return axios.get(`${BASE_URL}/cart`, {
    withCredentials: "true",
  });
};

const CountCartItems = async () => {
  return axios.get(`${BASE_URL}/cart/count`, {
    withCredentials: "true",
  });
};

const AddToCart = (id, setCartCount) => {
  AddCart(id, 1, true)
    .then((res) => {
      // console.log(res);

      CountCartItems()
        .then((res) => {
          // console.log(res);
          setCartCount(res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            alert(err.response.data.detailMessage);
          }
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.response) {
        alert(err.response.data.detailMessage);
      }
    });
};

const DelCartItem = async (id) => {
  return axios.delete(`${BASE_URL}/cart/${id}`, {
    withCredentials: "true",
  });
};

const UpdateCartItem = async (itemId, count, checked) => {
  return axios.patch(
    `${BASE_URL}/cart`,
    {
      itemId,
      count,
      checked,
    },
    {
      withCredentials: "true",
    }
  );
};

const CountHeart = async (itemId) => {
  return axios.get(`${BASE_URL}/heart/count/${itemId}`, {
    withCredentials: "true",
  });
};

const IsHearted = async (itemId) => {
  return axios.get(`${BASE_URL}/heart/is-hearted/${itemId}`, {
    withCredentials: "true",
  });
};

const InsertHeart = async (itemId) => {
  return axios.post(`${BASE_URL}/heart/${itemId}`, null, {
    withCredentials: "true",
  });
};

const DeleteHeart = async (itemId) => {
  return axios.delete(`${BASE_URL}/heart/${itemId}`, {
    withCredentials: "true",
  });
};

const GetAllReviews = async () => {
  return axios.get(`${BASE_URL}/review?sort=createAt,DESC`);
};

const GetItemReviews = async (itemId) => {
  return axios.get(`${BASE_URL}/review/items/${itemId}?sort=createAt,DESC`);
};

const EnrollReview = async (formDataToSend) => {
  return axios.post(`${BASE_URL}/review`, formDataToSend, {
    withCredentials: "true",
  });
};

const GetUserInfo = async () => {
  return axios.get(`${BASE_URL}/user/info`, {
    withCredentials: "true",
  });
};

const EnrollPayment = async (payment) => {
  return axios.post(`${BASE_URL}/api/payments`, payment, {
    withCredentials: "true",
  });
};

const GetMyReviews = async () => {
  return axios.get(`${BASE_URL}/review/user`, {
    withCredentials: "true",
  });
};

const GetMyHeartedItems = async () => {
  return axios.get(`${BASE_URL}/heart/user`, {
    withCredentials: "true",
  });
};

// const GetMyOrderedItems = async () => {
//   const Token = localStorage.getItem("token");
// }

const GetMyPayments = async () => {
  return axios.get(`${BASE_URL}/api/payments/user`, {
    withCredentials: "true",
  });
};

const ChangePaymentStatus = async (paymentId, status) => {
  return axios.get(`${BASE_URL}/api/payments/status/${paymentId}/${status}`, {
    withCredentials: "true",
  });
};

const GetUnReviewedItems = async () => {
  return axios.get(`${BASE_URL}/review/unreviewed-items`, {
    withCredentials: "true",
  });
};

export {
  NewItems,
  CategoryItems,
  PopularItems,
  UserLogin,
  UserLogout,
  UserSignup,
  EnrollItem,
  DetailItem,
  SearchItemsByKeyword,
  AddCart,
  FindCartItems,
  CountCartItems,
  AddToCart,
  DelCartItem,
  UpdateCartItem,
  CountHeart,
  IsHearted,
  InsertHeart,
  DeleteHeart,
  GetAllReviews,
  GetItemReviews,
  EnrollReview,
  GetUserInfo,
  EnrollPayment,
  GetMyReviews,
  GetMyHeartedItems,
  GetMyPayments,
  ChangePaymentStatus,
  GetUnReviewedItems,
};
