import React from "react";
import userImage from "../../../assets/images/user.png";
import downArrow from "../../../assets/images/downarrow.png";
import walletImage from "../../../assets/images/wallet.png";
import wishListImage from "../../../assets/images/orders.png";
import categoryBanner from "../../../assets/images/static/banner.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { IProduct, IUser, Ishop, USER_ROLE_ENUM } from "../../../interfaces";
import { openUrlInNewTab } from "../../helpers";

import logo from "../../../assets/images/logo2.png";

function MobileHeader() {
  const { token, role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  return (
    <div className="mobile-main-container">
      <div>
        <i className="bi bi-list" style={{ fontSize: 20 }}></i>
      </div>
      <div className="top-container">
        <Link to="/">
          <div className="logo-containter">
            <img src={logo} alt="Afriseller" />
            <span>Afriseller</span>
          </div>
        </Link>
        {/* <div className="search-main-container">
          <div className="search-container">
            <select
              className="col-md-3"
              style={{
                background: `url(${downArrow}) right / 16px no-repeat #fff`,
              }}
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="products">Products</option>
              <option value="seller">Seller</option>
            </select>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="What are you looking for..."
              onFocus={() => setFocused(true)}
              onBlur={() =>
                setTimeout(() => {
                  setFocused(false);
                }, 500)
              }
            />
            <button onClick={() => handleSearch()}>Search</button>
          </div>
          {searchCategory === "products" &&
            suggestions.length > 0 &&
            focused && (
              <div className="search-sugestions">
                <ul>
                  {suggestions.map((item, index) => (
                    <li
                      onClick={() => {
                        setSearchKeyword(item.name);
                        navigate("/search/" + searchCategory + "/" + item.name);
                      }}
                      key={index}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          {searchCategory === "seller" &&
            shopSuggestions.length > 0 &&
            focused && (
              <div className="search-sugestions">
                <ul>
                  {shopSuggestions.map((item, index) => (
                    <li
                      onClick={() => {
                        setSearchKeyword(item.shopName);
                        navigate(
                          "/search/" + searchCategory + "/" + item.shopName
                        );
                      }}
                      key={index}
                    >
                      {item.shopName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div> */}
        <div className="icons-main-container"></div>
      </div>
    </div>
  );
}

export default MobileHeader;
