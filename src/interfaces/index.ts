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

export interface IShippingEstimation {
  id: number;
  userId: number;
  shopId: number;
  fromCountry: string;
  toCountry: string;
  minAmount: number;
  maxAmount: number;
  currency: string;
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

export interface Iservice {
  id: number;
  name: string;
  price: number;
  currency: string;
  description: string;
  image: string;
  isActive: boolean;
}

export interface IRequestedService {
  id: number;
  serviceId: number;
  userId: number;
  price: number;
  currency: string;
  description: string;
  service: Iservice;
  status: VERIFICATION_ENUM;
  user: IUser;
}

export interface ICountry {
  id: number;
  name: string;
  isActive: boolean;
}

export type STATUS_ENUM = "PENDING" | "APPROVED" | "REJECTED";

export type VERIFICATION_ENUM =
  | "UNDER_REVIEW"
  | "REJECTED"
  | "VERIFIED"
  | "APPROVED";

export enum VERIFICATION_ENUM_ENUM {
  "UNDER_REVIEW" = "UNDER_REVIEW",
  "REJECTED" = "REJECTED",
  "VERIFIED" = "VERIFIED",
  "APPROVED" = "APPROVED",
}

export interface IBooking {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  description: string;
  product: IProduct | undefined;
  from: string;
  to: string;
  shippingCountry: string;
  status: STATUS_ENUM;
  createdAt: string;
  updatedAt: string;
}

export interface IBookingForSupplier {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  description: string;
  product: IProduct | undefined;
  from: string;
  to: string;
  shippingCountry: string;
  status: STATUS_ENUM;
  createdAt: string;
  updatedAt: string;
  user: IUser;
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

export interface IServicesReducer {
  isLoading: boolean;
  services: Iservice[];
}

export interface IWishlistReducer {
  isLoading: boolean;
  list: IProduct[];
}

export interface IShippingEstimationsReducer {
  isLoading: boolean;
  supplierId: number;
  estimaitons: IShippingEstimation[];
}
export interface ICountriesReducer {
  isLoading: boolean;
  countries: ICountry[];
}
export interface IAppReducer {
  country: string;
}

export interface IBookingsReducer {
  isLoading: boolean;
  bookings: IBooking[];
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
  brandName: string | null;
  productId: string | null;
  variations: IVariation[] | null;
  currency: string;
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
