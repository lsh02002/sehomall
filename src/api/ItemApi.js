import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { getCookie } from "./cookies";

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
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.delete(`${BASE_URL}/user/logout`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  })
}

const EnrollItem = async (formDataToSend) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.post(`${BASE_URL}/api/items`, formDataToSend, {
    headers: {
      accessToken,
      refreshToken,
    },
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
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
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
      withCredentials: "true",
    }
  );
};

const FindCartItems = async () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/cart`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const CountCartItems = async () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/cart/count`, {
    headers: {
      accessToken,
      refreshToken,
    },
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
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.delete(`${BASE_URL}/cart/${id}`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const UpdateCartItem = async (itemId, count, checked) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
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
      withCredentials: "true",
    }
  );
};

const CountHeart = async (itemId) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/heart/count/${itemId}`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const IsHearted = async (itemId) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/heart/is-hearted/${itemId}`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const InsertHeart = async (itemId) => {  
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.post(`${BASE_URL}/heart/${itemId}`, null, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const DeleteHeart = async (itemId) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.delete(`${BASE_URL}/heart/${itemId}`, {
    headers: {
      accessToken,
      refreshToken,
    },
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
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.post(`${BASE_URL}/review`, formDataToSend, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const GetUserInfo = async () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/user/info`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const EnrollPayment = async (payment) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.post(`${BASE_URL}/api/payments`, payment, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const GetMyReviews = async () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/review/user`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const GetMyHeartedItems = async () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/heart/user`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

// const GetMyOrderedItems = async () => {
//   const Token = localStorage.getItem("token");
// }

const GetMyPayments = async () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/api/payments/user`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const ChangePaymentStatus = async (paymentId, status) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/api/payments/status/${paymentId}/${status}`, {
    headers: {
      accessToken,
      refreshToken,
    },
    withCredentials: "true",
  });
};

const GetUnReviewedItems = async () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return axios.get(`${BASE_URL}/review/unreviewed-items`, {
    headers: {
      accessToken,
      refreshToken,
    },
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
