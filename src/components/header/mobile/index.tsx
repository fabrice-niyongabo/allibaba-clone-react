import { useState, useEffect } from "react";
import downArrow from "../../../assets/images/downarrow.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { IProduct, Ishop, USER_ROLE_ENUM } from "../../../interfaces";
import countries from "../../constants/countries.json";

import logo from "../../../assets/images/logo2.png";
import { setCountry } from "../../../actions/appReducer";

function MobileHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { country } = useSelector((state: RootState) => state.appReducer);
  const { products } = useSelector((state: RootState) => state.products);
  const { shops } = useSelector((state: RootState) => state.shops);
  const { token, role } = useSelector((state: RootState) => state.user);

  const [searchCategory, setSearchCategory] = useState("products");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [shopSuggestions, setShopsSuggestions] = useState<Ishop[]>([]);

  const [focused, setFocused] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showHelpMenu, setShowHelpMenu] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

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
    <>
      <div className="mobile-main-container">
        <div className="top-container">
          <div onClick={() => setShowMenu(!showMenu)}>
            <i className="bi bi-list" style={{ fontSize: 25 }}></i>
          </div>
          <div className="logo-container">
            <Link to="/">
              <div className="logo-containter">
                <img src={logo} alt="Afriseller" />
                <span>Afriseller</span>
              </div>
            </Link>
          </div>
          <div
            className="icons-main-container"
            onClick={() => setShowSearch(!showSearch)}
          >
            <i
              className={`bi bi-${showSearch ? "x" : "search"}`}
              style={{ fontSize: 25 }}
            ></i>
          </div>
        </div>

        {showSearch && (
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
        )}
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

      {/* menus */}
      <div
        className={`mobile-menu ${
          showMenu ? "show-mobile-menu" : "hide-mobile-menu"
        }`}
      >
        <div className="menu-contents">
          <div className="close-btn">
            <div onClick={() => setShowMenu(!showMenu)}>
              <i className="bi bi-x-lg" style={{ fontSize: 25 }} />
            </div>
          </div>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li className="dropdown">
              <div
                className="menu"
                onClick={() => setShowHelpMenu(!showHelpMenu)}
              >
                <p>Help&Community</p>
                <i
                  className={`bi bi-chevron-${showHelpMenu ? "up" : "down"}`}
                />
              </div>
              <ul className={showHelpMenu ? "" : "d-none"}>
                <li>For Buyers</li>
                <li>For New Users</li>
                <li>For Suppliers</li>
                <li>Support</li>
              </ul>
            </li>
            <li>Shops</li>
            {token.trim() === "" ? (
              <>
                <li onClick={() => navigate("/login-register")}>Sign In</li>
                <li>Wishlist</li>
                <li onClick={() => navigate("/start-selling")}>
                  Start Selling
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={() =>
                    role === USER_ROLE_ENUM.ADMIN
                      ? navigate("/dashboard/main")
                      : navigate("/dashboard")
                  }
                >
                  Dashboard
                </li>
                <li>Wishlist</li>
                {role === USER_ROLE_ENUM.SELLER ? (
                  <li onClick={() => navigate("/start-selling")}>My Shop</li>
                ) : (
                  role !== USER_ROLE_ENUM.ADMIN && (
                    <li onClick={() => navigate("/start-selling")}>
                      Start Selling
                    </li>
                  )
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MobileHeader;
