import axios from "axios";
import { BASE_URL } from "./baseUrl";

const getItems = async () => {
  return axios.get(`${BASE_URL}/api/items?sort=createAt,DESC&size=3`, {
    headers: {
      credentials: "include",
    },
  });
};

const CategoryItems = async (category) => {
  return axios.get(
    `${BASE_URL}/api/items/category/${category}?sort=createAt,DESC`
  );
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
}

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

export {
  getItems,
  CategoryItems,
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
};
