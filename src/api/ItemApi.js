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
  return axios.post(`${BASE_URL}/user/login`, {
    email,
    password,
  });
};

const UserSignup = async (userInfo) => {
  return axios.post(`${BASE_URL}/user/sign-up`, userInfo);
};

const UserLogout = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.delete(`${BASE_URL}/user/logout`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const EnrollItem = async (formDataToSend) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.post(`${BASE_URL}/api/items`, formDataToSend, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const DetailItem = async (id) => {
  return axios.get(`${BASE_URL}/api/items/${id}`);
};

const SearchItemsByKeyword = async (keyword) => {
  return axios.get(`${BASE_URL}/api/items/search/${keyword}`);
};

const AddCart = async (itemId, count, checked) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.post(
    `${BASE_URL}/cart`,
    {
      itemId,
      count,
      checked,
    },
    {
      headers: {
        accessToken,
        refreshToken,
      },
    }
  );
};

const FindCartItems = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/cart`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const CountCartItems = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/cart/count`, {
    headers: {
      accessToken,
      refreshToken,
    },
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
    })
    .catch((err) => {
      console.error(err);
      if (err.response) {
        alert(err.response.data.detailMessage);
      }
    });
};

const DelCartItem = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.delete(`${BASE_URL}/cart/${id}`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const UpdateCartItem = async (itemId, count, checked) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.patch(
    `${BASE_URL}/cart`,
    {
      itemId,
      count,
      checked,
    },
    {
      headers: {
        accessToken,
        refreshToken,
      },
    }
  );
};

const CountHeart = async (itemId) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/heart/count/${itemId}`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const IsHearted = async (itemId) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/heart/is-hearted/${itemId}`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const InsertHeart = async (itemId) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.post(`${BASE_URL}/heart/${itemId}`, null, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const DeleteHeart = async (itemId) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.delete(`${BASE_URL}/heart/${itemId}`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetAllReviews = async (page, size) => {
  return axios.get(
    `${BASE_URL}/review?sort=createAt,DESC&page=${page - 1}&size=${size}`
  );
};

const GetItemReviews = async (itemId) => {
  return axios.get(`${BASE_URL}/review/items/${itemId}?sort=createAt,DESC`);
};

const EnrollReview = async (formDataToSend) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.post(`${BASE_URL}/review`, formDataToSend, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetUserInfo = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/user/info`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const EnrollPayment = async (payment) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.post(`${BASE_URL}/api/payments`, payment, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetMyReviews = async (page, size) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/review/user?sort=createAt,DESC&page=${page - 1}&size=${size}`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetMyHeartedItems = async (page, size) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/heart/user?page=${page - 1}&size=${size}`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

// const GetMyOrderedItems = async () => {
//   const Token = localStorage.getItem("token");
// }

const GetMyPayments = async (page, size) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/api/payments/user?sort=createAt,DESC&page=${page - 1}&size=${size}`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const ChangePaymentStatus = async (paymentId, status) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/api/payments/status/${paymentId}/${status}`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetUnReviewedItems = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/review/unreviewed-items`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetAllNotices = async (page, size) => {
  return axios.get(
    `${BASE_URL}/api/notices?sort=createAt,DESC&page=${page - 1}&size=${size}`
  );
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
  GetAllNotices,
};
