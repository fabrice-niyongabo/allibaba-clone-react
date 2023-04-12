//@ts-nocheck
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullLayout from "./layouts/FullLayout";

const Dashboard = lazy(() => import("./views/dashboard"));
const Alerts = lazy(() => import("./views/ui/Alerts"));
const Home = lazy(() => import("./views/home"));
const LoginRegister = lazy(() => import("./views/login-register"));
const Memberships = lazy(() => import("./views/memberships"));
const StartSelling = lazy(() => import("./views/start-selling"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login-register" element={<LoginRegister />} />
          <Route exact path="/memberships" element={<Memberships />} />
          <Route exact path="/start-selling" element={<StartSelling />} />
          {/* <Route
            exact
            path="/login"
            element={
              <UnProtectedRoute>
                <LoginRegister />
              </UnProtectedRoute>
            }
          /> */}
          <Route
            exact
            path="/dashboard"
            element={
              // <AdminProtectedRoute>
              <div className="dark">
                <FullLayout />
              </div>
              // </AdminProtectedRoute>
            }
            children={
              <>
                <Route path="/dashboard/" element={<Dashboard />} />
                <Route path="/dashboard/all" exact element={<Alerts />} />
                {/* <Route
                path="/dashboard/profile"
                exact
                element={<AdminProfile />}
              />
              <Route
                path="/dashboard/productscategories"
                exact
                element={<ProductCats />}
              />
              <Route
                path="/dashboard/addproduct"
                exact
                element={<AddProduct />}
              />
              <Route path="/dashboard/products" exact element={<Products />} />
              <Route path="/dashboard/users" exact element={<Users />} />
              <Route
                path="/dashboard/deliveryfees"
                exact
                element={<DeliveryFees />}
              /> */}
              </>
            }
          />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
