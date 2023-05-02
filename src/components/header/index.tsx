import React, { useState } from "react";
import "../../assets/scss/header.scss";

import userImage from "../../assets/images/user.png";
import downArrow from "../../assets/images/downarrow.png";
import walletImage from "../../assets/images/wallet.png";
import wishListImage from "../../assets/images/orders.png";
import categoryBanner from "../../assets/images/static/banner.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { IUser, USER_ROLE_ENUM } from "../../interfaces";

function Header() {
  const { categories } = useSelector((state: RootState) => state.categories);
  const { role, token } = useSelector(
    (state: RootState) => state.user as IUser
  );
  const [categoriesHover, setCategoriesHover] = useState(false);
  const [helpHover, setHelpHover] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="app-header">
      <div className="top-container">
        <Link to="/">
          <img
            src="https://demowpthemes.com/buy2alibaba/wp-content/themes/buy2alibaba/images/logo-head.png"
            alt="Buy2alibaba"
          />
        </Link>
        <div className="search-container">
          <select
            className="col-md-3"
            style={{
              background: `url(${downArrow}) right / 16px no-repeat #fff`,
            }}
          >
            <option value="products">Products</option>
            <option value="seller">Seller</option>
          </select>
          <input type="text" placeholder="What are you looking for..." />
          <button>Search</button>
        </div>
        <div className="icons-main-container">
          {token.trim() === "" ? (
            <>
              <div
                className="icon-container"
                onClick={() => navigate("/login-register")}
              >
                <img alt="" src={userImage} />
                <span>Sign In</span>
              </div>
              <div className="icon-container">
                <img alt="" src={wishListImage} />
                <span>Wishlist</span>
              </div>
              <div
                className="icon-container"
                onClick={() => navigate("/start-selling")}
              >
                <img alt="" src={walletImage} />
                <span>Start Selling</span>
              </div>
            </>
          ) : (
            <>
              <div
                className="icon-container"
                onClick={() =>
                  role === USER_ROLE_ENUM.ADMIN
                    ? navigate("/dashboard/main")
                    : navigate("/dashboard")
                }
              >
                <i className="bi bi-speedometer2" style={{ fontSize: 20 }}></i>
                <span>Dashboard</span>
              </div>
              <div className="icon-container">
                <img alt="" src={wishListImage} />
                <span>Wishlist</span>
              </div>
              {role === USER_ROLE_ENUM.SELLER ? (
                <div
                  className="icon-container"
                  onClick={() => navigate("/start-selling")}
                >
                  <i className="bi bi-shop"></i>
                  <span>My Shop</span>
                </div>
              ) : (
                <div
                  className="icon-container"
                  onClick={() => navigate("/start-selling")}
                >
                  <img alt="" src={walletImage} />
                  <span>Start Selling</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="menu-container">
        <ul>
          <li
            onMouseOver={() => {
              setCategoriesHover(true);
            }}
            onMouseLeave={() => {
              setCategoriesHover(false);
            }}
          >
            <span className={categoriesHover ? "text-orange" : ""}>
              Categories{" "}
              {categoriesHover ? (
                <i className="bi bi-chevron-up" />
              ) : (
                <i className="bi bi-chevron-down" />
              )}
            </span>
            {categoriesHover && (
              <div className="menu categories-menu">
                <div className="row">
                  <div className="col-md-8">
                    <div className="row">
                      {categories
                        .filter((item) => item.onHeaderSection)
                        .map((item, position) => (
                          <div className="col-md-6 mb-2" key={position}>
                            <h3>{item.name}</h3>
                            <ul>
                              {item.subCategories.map((cat, position) => (
                                <li key={position}>{cat.name}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img
                      alt=""
                      src={categoryBanner}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </li>
          <li
            onMouseOver={() => {
              setHelpHover(true);
            }}
            onMouseLeave={() => {
              setHelpHover(false);
            }}
          >
            <span className={helpHover ? "text-orange" : ""}>
              Help & Community{" "}
              {helpHover ? (
                <i className="bi bi-chevron-up" />
              ) : (
                <i className="bi bi-chevron-down" />
              )}
            </span>
            {helpHover && (
              <div className="menu ">
                <ul>
                  <li>For Buyers</li>
                  <li>For New Users</li>
                  <li>For Suppliers</li>
                  <li>Support</li>
                </ul>
              </div>
            )}
          </li>
          <li>Electronics</li>
          {role === USER_ROLE_ENUM.CLIENT ||
            (token.trim() === "" && (
              <li onClick={() => navigate("/start-selling")}>Start selling</li>
            ))}
          <li onClick={() => navigate("/memberships")}>All Membership</li>
          <li>Shops</li>
          <li>Wish list</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
