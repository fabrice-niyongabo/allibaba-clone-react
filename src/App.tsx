//@ts-nocheck
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullLayout from "./layouts/FullLayout";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createMuiTheme } from "@mui/material";
import AdminProtectedRoute from "./components/controllers/admin-protected-route";
import UnProtectedRoute from "./components/controllers/un-protected-route";
import ProtectedRoute from "./components/controllers/protected-route";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import { IUser, USER_ROLE_ENUM } from "./interfaces";

const Dashboard = lazy(() => import("./views/admin/dashboard"));
const Home = lazy(() => import("./views/home"));
const Logout = lazy(() => import("./views/logout"));
const LoginRegister = lazy(() => import("./views/login-register"));
const Memberships = lazy(() => import("./views/memberships"));
const StartSelling = lazy(() => import("./views/start-selling"));
const SingleProduct = lazy(() => import("./views/single-product"));
const ProductCategory = lazy(() => import("./views/products-by-categories"));
const Shop = lazy(() => import("./views/shop"));
const Categories = lazy(() => import("./views/admin/categories"));
const Apply = lazy(() => import("./views/apply"));

const MyShop = lazy(() => import("./views/seller/my-shop"));
const AddProduct = lazy(() => import("./views/seller/add-product"));
const Products = lazy(() => import("./views/seller/products"));
const AddProductImage = lazy(() => import("./views/seller/add-product-image"));

const theme = createMuiTheme({
  //   theme properties here
});

const App = () => {
  const { role } = useSelector((state: RootState) => state.user as IUser);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/memberships" element={<Memberships />} />
          <Route exact path="/start-selling" element={<StartSelling />} />
          <Route exact path="/product" element={<SingleProduct />} />
          <Route exact path="/product-category" element={<ProductCategory />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route
            exact
            path="/login-register"
            element={
              <UnProtectedRoute>
                <LoginRegister />
              </UnProtectedRoute>
            }
          />
          <Route
            exact
            path="/apply"
            element={
              <ProtectedRoute>
                <Apply />
              </ProtectedRoute>
            }
          />
          <Route
            exact
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
                <Route path="/dashboard/main" exact element={<Dashboard />} />
                <Route
                  path="/dashboard/main/categories"
                  exact
                  element={<Categories />}
                />
              </>
            }
          />
          <Route
            exact
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
                <Route path="/dashboard/main" exact element={<Dashboard />} />
                <Route
                  path="/dashboard/main/categories"
                  exact
                  element={<Categories />}
                />
              </>
            }
          />
          <Route
            exact
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
                  <Route path="/dashboard" exact element={<Dashboard />} />
                  <Route path="/dashboard/myshop" exact element={<MyShop />} />
                  <Route
                    path="/dashboard/addproduct"
                    exact
                    element={<AddProduct />}
                  />
                  <Route
                    path="/dashboard/products"
                    exact
                    element={<Products />}
                  />
                  <Route
                    path="/dashboard/product/:id"
                    exact
                    element={<AddProductImage />}
                  />
                </>
              ) : (
                <>
                  <Route path="/dashboard" exact element={<Dashboard />} />
                  {/* for clients */}
                  {/* <Route
                  path="/dashboard/main/categories"
                  exact
                  element={<Categories />}
                /> */}
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
