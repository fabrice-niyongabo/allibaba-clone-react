import { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullLayout from "./layouts/FullLayout";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createMuiTheme } from "@mui/material";
import AdminProtectedRoute from "./controllers/admin-protected-route";
import UnProtectedRoute from "./controllers/un-protected-route";
import ProtectedRoute from "./controllers/protected-route";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import { IUser, USER_ROLE_ENUM } from "./interfaces";
import { useLoadBasicData } from "./helpers";

const Dashboard = lazy(() => import("./views/admin/dashboard"));
const Home = lazy(() => import("./views/home"));
const Logout = lazy(() => import("./views/logout"));
const LoginRegister = lazy(() => import("./views/login-register"));
const Memberships = lazy(() => import("./views/memberships"));
const StartSelling = lazy(() => import("./views/start-selling"));
const SingleProduct = lazy(() => import("./views/single-product"));
const ProductCategory = lazy(() => import("./views/products-by-categories"));
const Shop = lazy(() => import("./views/shop"));
const Search = lazy(() => import("./views/search"));

const Categories = lazy(() => import("./views/admin/categories"));
const CategoryImage = lazy(() => import("./views/admin/category-image"));
const HomeCategories = lazy(() => import("./views/admin/home-categories"));
const AdminProducts = lazy(() => import("./views/admin/products"));
const AdminUsers = lazy(() => import("./views/admin/users"));
const AdminShops = lazy(() => import("./views/admin/shops"));
const AdminMemberships = lazy(() => import("./views/admin/memberships"));
const Countries = lazy(() => import("./views/admin/countries"));
const Services = lazy(() => import("./views/admin/services"));

const Apply = lazy(() => import("./views/apply"));
const WishList = lazy(() => import("./views/wishlist"));
const BookedProducts = lazy(() => import("./views/booked-products"));

//seller
const MyShop = lazy(() => import("./views/seller/my-shop"));
const AddProduct = lazy(() => import("./views/seller/add-product"));
const Products = lazy(() => import("./views/seller/products"));
const AddProductImage = lazy(() => import("./views/seller/add-product-image"));
const Subscriptions = lazy(() => import("./views/seller/subscriptions"));
const AskedQuestions = lazy(() => import("./views/seller/asked-questions"));
const ShippingOptions = lazy(() => import("./views/seller/shipping-options"));
const Bookings = lazy(() => import("./views/seller/bookings"));

//
const Profile = lazy(() => import("./views/profile"));

const theme = createMuiTheme({
  //   theme properties here
});

const App = () => {
  const loadBasicData = useLoadBasicData();
  const { role } = useSelector((state: RootState) => state.user as IUser);
  useEffect(() => {
    loadBasicData();

    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/start-selling" element={<StartSelling />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/search/:searchType/:keyword" element={<Search />} />
          <Route path="/category/:categoryId" element={<ProductCategory />} />
          <Route
            path="/category/:categoryId/:subCategoryId"
            element={<ProductCategory />}
          />
          <Route path="/shops/:id" element={<Shop />} />
          <Route
            path="/login-register"
            element={
              <UnProtectedRoute>
                <LoginRegister />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/apply"
            element={
              <ProtectedRoute>
                <Apply />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/main"
            element={
              <AdminProtectedRoute>
                <div className="dark">
                  <FullLayout />
                </div>
              </AdminProtectedRoute>
            }
            children={
              <>
                <Route path="/dashboard/main" element={<Dashboard />} />
                <Route
                  path="/dashboard/main/categories"
                  element={<Categories />}
                />
              </>
            }
          />
          <Route
            path="/dashboard/main"
            element={
              <AdminProtectedRoute>
                <div className="dark">
                  <FullLayout />
                </div>
              </AdminProtectedRoute>
            }
            children={
              <>
                <Route path="/dashboard/main" element={<Dashboard />} />
                <Route
                  path="/dashboard/main/categories"
                  element={<Categories />}
                />
                <Route path="/dashboard/main/services" element={<Services />} />
                <Route path="/dashboard/main/profile" element={<Profile />} />
                <Route
                  path="/dashboard/main/category/:id"
                  element={<CategoryImage />}
                />
                <Route
                  path="/dashboard/main/homecategories"
                  element={<HomeCategories />}
                />
                <Route
                  path="/dashboard/main/products"
                  element={<AdminProducts />}
                />
                <Route path="/dashboard/main/users" element={<AdminUsers />} />
                <Route path="/dashboard/main/shops" element={<AdminShops />} />
                <Route
                  path="/dashboard/main/memberships"
                  element={<AdminMemberships />}
                />
                <Route
                  path="/dashboard/main/countries"
                  element={<Countries />}
                />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="dark">
                  <FullLayout />
                </div>
              </ProtectedRoute>
            }
            children={
              role === USER_ROLE_ENUM.SELLER ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/myshop" element={<MyShop />} />
                  <Route path="/dashboard/profile" element={<Profile />} />
                  <Route path="/dashboard/booking" element={<Bookings />} />
                  <Route path="/dashboard/wishlist" element={<WishList />} />
                  <Route
                    path="/dashboard/addproduct"
                    element={<AddProduct />}
                  />
                  <Route path="/dashboard/products" element={<Products />} />
                  <Route
                    path="/dashboard/shipping"
                    element={<ShippingOptions />}
                  />
                  <Route
                    path="/dashboard/product/:id"
                    element={<AddProductImage />}
                  />
                  <Route
                    path="/dashboard/subscriptions"
                    element={<Subscriptions />}
                  />
                  <Route
                    path="/dashboard/askedquestions"
                    element={<AskedQuestions />}
                  />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/profile" element={<Profile />} />
                  <Route path="/dashboard/wishlist" element={<WishList />} />
                  <Route
                    path="/dashboard/booking"
                    element={<BookedProducts />}
                  />
                </>
              )
            }
          />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
};

export default App;
