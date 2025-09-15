export type userInfoType = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  phoneNumber: string;
  address: string;
  gender: string;
  birthDate: string;
};

export type fileType = {
  id: number;
  fileName: string;
  fileSize: number;
  fileExtension: string;
  fileUrl: string;
};

export type itemType = {
  id: number;
  count: number;
  price: number;
  size: string;
  careGuide: string;
  name: string;
  description: string;
  category: string;
  deliveryFee: number;
  userNickname: string;
  views: number;
  heartCount: number;
  createAt: string;
  files: fileType[];
  reviewCount: number;
};

export type itemCartType = {
  itemId: number;
  itemCount: number;
  itemName: string;
  price: number;
  fileUrl: string;
  checked: boolean;
  heartCount: number;
};

export type itemCartTypeWithAllString = {
  itemId: string | null;
  count: string | null;
  itemName: string | null;
  price: string | null;
  fileUrl: string | null;
  checked: string | null;
  heartCount: string | null;
};

export type itemOrderType = {
  id: number;
  item: itemType;
  count: number;
};

export type orderRequestType = {
  productSum: number;
  email: string;
  deliveryName: string;
  deliveryAddress: string;
  deliveryPhone: string;
  deliveryMessage: string;
  items: itemCartType[];
};

export type orderResponseType = {
  id: number;
  productSum: number;
  email: string;
  deliveryName: string;
  deliveryAddress: string;
  deliveryPhone: string;
  deliveryMessage: string;
  orderStatus: string;
  createAt: string;
  items: itemOrderType[];
};

export type reviewType = {
  id: number;
  itemId: number;
  itemName: string;
  nickname: string;
  content: string;
  rating: number;
  createAt: string;
  files: fileType[];
};

export type unReviewedItemType = {
  id: number;
  name: string;
};

export type noticeType = {
  id: number;
  title: string;
  content: string;
  nickname: string;  
  modifyAt: string;
};
