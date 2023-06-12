import { useState, useEffect } from "react";
import downArrow from "../../../assets/images/downarrow.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { IProduct, Ishop } from "../../../interfaces";

import logo from "../../../assets/images/logo2.png";

function MobileHeader() {
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.products);
  const { shops } = useSelector((state: RootState) => state.shops);

  const [searchCategory, setSearchCategory] = useState("products");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [shopSuggestions, setShopsSuggestions] = useState<Ishop[]>([]);

  const [focused, setFocused] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

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

  return (
    <div className="mobile-main-container">
      <div className="top-container">
        <div>
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
        </div>
      )}
    </div>
  );
}

export default MobileHeader;
