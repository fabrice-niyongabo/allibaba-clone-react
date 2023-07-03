import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";

import image from "../../../assets/images/static/2.jpg";
import { IProduct, Ishop, PRICE_TYPE_ENUM } from "../../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../components/constants";
import {
  currencyFormatter,
  openUrlInNewTab,
} from "../../../components/helpers";

interface IProductsProps {
  shop: Ishop;
}
function Products(props: IProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [productsToShow, setProductsToShow] = useState<IProduct[]>([]);
  const { products } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (selectedCategory === 0) {
        const prods = products.filter(
          (item) => item.shopId === props.shop.shopId
        );
        setProductsToShow(prods);
      } else {
        const prods = products.filter(
          (item) =>
            item.shopId === props.shop.shopId &&
            item.categoryId === selectedCategory
        );
        setProductsToShow(prods);
      }
    }
    return () => {
      sub = false;
    };
  }, [selectedCategory, products]);
  return (
    <div>
      <h3>Products</h3>
      <Row>
        <Col md={2}>
          <div className="categories">
            <ul>
              <li
                className={selectedCategory === 0 ? "active" : ""}
                onClick={() => setSelectedCategory(0)}
              >
                <i className="bi bi-arrow-right-circle"></i>
                <span>All Categories</span>
              </li>
              {categories.map((item, index) => (
                <li
                  className={selectedCategory === item.id ? "active" : ""}
                  onClick={() => setSelectedCategory(item.id)}
                  key={index}
                >
                  <i className="bi bi-arrow-right-circle"></i>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={10}>
          <Row>
            {productsToShow.map((item, index) => (
              <Col md={3} sm={6} xs={6} className="mb-3" key={index}>
                <div
                  className="product-item pointer"
                  onClick={() => openUrlInNewTab("/product/" + item.pId, false)}
                >
                  <ImageLoader
                    src={app.FILE_URL + item.images[0]?.image}
                    alt={item.name}
                  />
                  <div className="description">
                    <span title={item.name}>{item.name}</span>
                    <div className="price">
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                        <>{currencyFormatter(item.singlePrice)} </>
                      ) : (
                        <>
                          {item.currency}{" "}
                          {currencyFormatter(item.prices[0]?.amount)}
                          {item.prices.length - 1 > 0 && (
                            <>
                              -{" "}
                              {currencyFormatter(
                                item.prices[item.prices.length - 1].amount
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Products;
