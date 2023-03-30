import React, { useState } from "react";
import "../../../assets/scss/header.scss";

import userImage from "../../../assets/images/user.png";
import downArrow from "../../../assets/images/downarrow.png";
import walletImage from "../../../assets/images/wallet.png";
import wishListImage from "../../../assets/images/orders.png";
import categoryBanner from "../../../assets/images/static/banner.jpg";

function Header() {
  const [categoriesHover, setCategoriesHover] = useState(false);
  return (
    <div className="app-header">
      <div className="top-container">
        <img
          src="https://demowpthemes.com/buy2alibaba/wp-content/themes/buy2alibaba/images/logo-head.png"
          alt="Buy2alibaba"
        />
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
          <div className="icon-container">
            <img src={userImage} />
            <span>Sign In</span>
          </div>
          <div className="icon-container">
            <img src={wishListImage} />
            <span>Wishlist</span>
          </div>
          <div className="icon-container">
            <img src={walletImage} />
            <span>Start Selling</span>
          </div>
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
              <div className="categories-menu">
                <div className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-6">
                        <h3>Electronics</h3>
                        <ul>
                          <li>Batteries</li>
                          <li>Headphones</li>
                          <li>Watch</li>
                          <li>Camera</li>
                          <li>Laptop</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h3>Electronics</h3>
                        <ul>
                          <li>Batteries</li>
                          <li>Headphones</li>
                          <li>Watch</li>
                          <li>Camera</li>
                          <li>Laptop</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img src={categoryBanner} style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
            )}
          </li>
          <li>Help & Community</li>
          <li>Electronics</li>
          <li>Start selling</li>
          <li>All Membership</li>
          <li>Shop</li>
          <li>Wish list</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
