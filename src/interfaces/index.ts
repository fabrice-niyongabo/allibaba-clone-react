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
  banner: string;
  icon: string;
  onCategoriesSection: boolean;
  onHeaderSection: boolean;
  onHome: boolean;
  onHeaderNav: boolean;
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
  country: string;
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

export interface IProductsReducer {
  isLoading: boolean;
  products: IProduct[];
}

export interface IshopsReducer {
  isLoading: boolean;
  shops: Ishop[];
}

export enum PRICE_TYPE_ENUM {
  SINGLE = "single",
  MANY = "many",
}

export interface IProductPrice {
  ppId: number;
  shopId: number;
  productId: number;
  name: string;
  amount: number;
}

export interface IProductImage {
  id: number;
  productId: number;
  image: string;
}

export interface IProduct {
  pId: number;
  shopId: number;
  categoryId: number;
  subCategoryId: number;
  name: string;
  description: string;
  priceType: PRICE_TYPE_ENUM;
  singlePrice: number;
  isActive: boolean;
  onNewArrivals: boolean;
  onElectronics: boolean;
  onTopRated: boolean;
  onBeauty: boolean;
  onSale: boolean;
  onBestSelling: boolean;
  images: IProductImage[];
  prices: IProductPrice[];
}

export enum VARITION_TYPES_ENUM {
  empty = "",
  SCENT_NAME = "Scent Name",
  COLOR = "Color",
  PATTERN = "Pattern",
  FLAVOR = "Flavor",
  SIZE = "Size",
}
export interface IVariation {
  type: VARITION_TYPES_ENUM;
  values: string[];
}
