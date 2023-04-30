export enum TOAST_MESSAGE_TYPES {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
}

export interface IAction {
  type: string;
  payload: any;
}

export enum USER_ROLE_ENUM {
  CLIENT = "client",
  ADMIN = "admin",
  SELLER = "seller",
}

export interface IUser {
  userId: number;
  names: string;
  email: string;
  phone: string;
  role: USER_ROLE_ENUM;
  shopId: number | null;
  image: string;
  isActive: boolean;
  apply: boolean;
  token: string;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
  subCategories: ISubCategory[];
}

export interface ISubCategory {
  id: number;
  categoryId: number;
  name: string;
}

export interface Ishop {
  shopId: number;
  userId: number;
  shopName: string;
  description: string;
  phone1: string;
  phone2: string;
  phone3: string;
  address: string;
  open: string;
  close: string;
  shopImage: string;
  shopBanner: string;
  isVerified: boolean;
  verificationStatus: string;
  verificationMessage: string;
  isDisabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMyshopReducer {
  isLoading: boolean;
  myShop: Ishop | undefined;
}

export interface ICategoriesReducer {
  isLoading: boolean;
  categories: ICategory[];
}

export enum PRICE_TYPE_ENUM {
  SINGLE = "single",
  MANY = "many",
}
