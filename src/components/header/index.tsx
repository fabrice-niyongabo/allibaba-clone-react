import { useState, useEffect } from "react";
import "../../assets/scss/header.scss";

import userImage from "../../assets/images/user.png";
import downArrow from "../../assets/images/downarrow.png";
import walletImage from "../../assets/images/wallet.png";
import wishListImage from "../../assets/images/orders.png";
import categoryBanner from "../../assets/images/static/banner.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { IProduct, IUser, Ishop, USER_ROLE_ENUM } from "../../interfaces";
import { openUrlInNewTab } from "../../helpers";

import logo from "../../assets/images/logo2.png";
import { isMobile } from "react-device-detect";
import MobileHeader from "./mobile";
import { setCountry } from "../../actions/appReducer";

function Header() {
  const dispatch = useDispatch();
  const { countries } = useSelector((state: RootState) => state.countries);
  const { country } = useSelector((state: RootState) => state.appReducer);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { products } = useSelector((state: RootState) => state.products);
  const { shops } = useSelector((state: RootState) => state.shops);
  const { role, token } = useSelector(
    (state: RootState) => state.user as IUser
  );
  const [categoriesHover, setCategoriesHover] = useState(false);
  const [helpHover, setHelpHover] = useState(false);
  const navigate = useNavigate();

  const [searchCategory, setSearchCategory] = useState("products");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [shopSuggestions, setShopsSuggestions] = useState<Ishop[]>([]);

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (searchKeyword.trim() !== "") {
        if (searchCategory === "products") {
          const sugge = products.filter((item) =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase())
          );
          setSuggestions(sugge.slice(0, 5));
        } else {
          const sugge = shops.filter((item) =>
            item.shopName.toLowerCase().includes(searchKeyword.toLowerCase())
          );
          setShopsSuggestions(sugge.slice(0, 5));
        }
      } else {
        setSuggestions([]);
        setShopsSuggestions([]);
      }
    }
    return () => {
      sub = false;
    };
  }, [products, searchKeyword, searchCategory]);

  const handleSearch = () => {
    if (searchKeyword.trim() === "") {
      return;
    }
    navigate("/search/" + searchCategory + "/" + searchKeyword);
  };

  const handleCountryChange = (val: string) => {
    dispatch(setCountry(val));
    window.location.reload();
  };

  return (
    <div className="app-header">
      {isMobile ? (
        <MobileHeader />
      ) : (
        <>
          <div className="top-container">
            <Link to="/">
              <div className="logo-containter">
                <img src={logo} alt="Afriseller" />
                <span>Afriseller</span>
              </div>
            </Link>
            <div className="search-main-container">
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
                            navigate(
                              "/search/" + searchCategory + "/" + item.name
                            );
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
            </div>
            <div className="icons-main-container">
              <div className="icon-container">
                <div className="location">
                  <i className="bi bi-geo-alt-fill" />
                  <select
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                  >
                    {countries.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
                    <i
                      className="bi bi-speedometer2"
                      style={{ fontSize: 20 }}
                    ></i>
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
                    role !== USER_ROLE_ENUM.ADMIN && (
                      <div
                        className="icon-container"
                        onClick={() => navigate("/start-selling")}
                      >
                        <img alt="" src={walletImage} />
                        <span>Start Selling</span>
                      </div>
                    )
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
                                <h3
                                  className="pointer"
                                  onClick={() =>
                                    openUrlInNewTab("/category/" + item.id)
                                  }
                                >
                                  {item.name}
                                </h3>
                                <ul>
                                  {item.subCategories.map((cat, position) => (
                                    <li
                                      key={position}
                                      onClick={() =>
                                        openUrlInNewTab(
                                          "/category/" + item.id + "/" + cat.id
                                        )
                                      }
                                    >
                                      {cat.name}
                                    </li>
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
              {categories
                .filter((item) => item.onHeaderNav)
                .map((item, index) => (
                  <li
                    key={index}
                    onClick={() => openUrlInNewTab("/category/" + item.id)}
                  >
                    {item.name}
                  </li>
                ))}
              {(role === USER_ROLE_ENUM.CLIENT || token.trim() === "") && (
                <li onClick={() => navigate("/start-selling")}>
                  Start selling
                </li>
              )}
              <li onClick={() => navigate("/memberships")}> All Membership</li>
              <li>Shops</li>
              <li>Wish list</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
