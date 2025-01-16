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

const EnrollItem = async (formDataToSend) => {
  const Token = localStorage.getItem("token");
  return axios.post(`${BASE_URL}/api/items`, formDataToSend, {
    headers: {
      Token,
    },
  });
};

const DetailItem = async (id) => {
  return axios.get(`${BASE_URL}/api/items/${id}`);
};

const AddCart = async (itemId, count, checked) => {
  const Token = localStorage.getItem("token");
  return axios.post(
    `${BASE_URL}/cart`,
    {
      itemId,
      count,
      checked,
    },
    {
      headers: {
        Token,
      },
    }
  );
};

const FindCartItems = async () => {
  const Token = localStorage.getItem("token");
  return axios.get(`${BASE_URL}/cart`, {
    headers: {
      Token,
    },
  });
};

const CountCartItems = async () => {
  const Token = localStorage.getItem("token");
  return axios.get(`${BASE_URL}/cart/count`, {
    headers: {
      Token,
    },
  });
};

const AddToCart = (id, setCartCount) => {
  AddCart(id, 1, true)
    .then((res) => {
      console.log(res);

      CountCartItems()
        .then((res) => {
          console.log(res);
          setCartCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const DelCartItem = async (id) => {
  const Token = localStorage.getItem("token");
  return axios.delete(`${BASE_URL}/cart/${id}`, {
    headers: {
      Token,
    },
  });
};

const UpdateCartItem = async (itemId, count, checked) => {
  const Token = localStorage.getItem("token");
  return axios.patch(
    `${BASE_URL}/cart`,
    {
      itemId,
      count,
      checked,
    },
    {
      headers: {
        Token,
      },
    }
  );
};

const CountHeart = async (itemId) => {
  const Token = localStorage.getItem("token");
  return axios.get(`${BASE_URL}/heart/count/${itemId}`, {
    headers: {
      Token,
    },
  });
};

const IsHearted = async (itemId) => {
  const Token = localStorage.getItem("token");
  return axios.get(`${BASE_URL}/heart/is-hearted/${itemId}`, {
    headers: {
      Token,
    },
  });
};

const InsertHeart = async (itemId) => {
  const Token = localStorage.getItem("token");
  return axios.post(
    `${BASE_URL}/heart/${itemId}`,
    {},
    {
      headers: {
        Token,
      },
    }
  );
};

const DeleteHeart = async (itemId) => {
  const Token = localStorage.getItem("token");
  return axios.delete(`${BASE_URL}/heart/${itemId}`, {
    headers: {
      Token,
    },
  });
};

const GetReviews = async (itemId) => {
  return axios.get(`${BASE_URL}/review/items/${itemId}?sort=createAt,DESC`);
};

const EnrollReview = async (formDataToSend) => {
  const Token = localStorage.getItem("token");
  return axios.post(`${BASE_URL}/review`, formDataToSend, {
    headers: {
      Token,
    },
  });
};

export {
  NewItems,
  CategoryItems,
  PopularItems,
  UserLogin,
  EnrollItem,
  DetailItem,
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
  GetReviews,
  EnrollReview,
};
