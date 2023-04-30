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
