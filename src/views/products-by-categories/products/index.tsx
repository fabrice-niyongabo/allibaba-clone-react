import { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";

import image from "../../../assets/images/static/2.jpg";
import { useSelector } from "react-redux";
import { ICategory, IProduct, PRICE_TYPE_ENUM } from "../../../interfaces";
import { RootState } from "../../../reducers";
import MiniLoader from "../../../layouts/loader/MiniLoader";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../constants";
import { currencyFormatter, openUrlInNewTab } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

interface IProductsProps {
  category: ICategory;
  subCategoryId: any;
}
function Products({ category, subCategoryId }: IProductsProps) {
  const navigate = useNavigate();
  const { products, isLoading } = useSelector(
    (state: RootState) => state.products
  );

  const [productsToShow, setProductsToShow] = useState<IProduct[]>([]);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (subCategoryId === "all" || subCategoryId === undefined) {
        setProductsToShow(
          products.filter((item) => item.categoryId === category.id)
        );
      } else {
        setProductsToShow(
          products.filter(
            (item) =>
              item.categoryId === category.id &&
              item.subCategoryId === Number(subCategoryId)
          )
        );
      }
    }

    return () => {
      sub = false;
    };
  }, [category, subCategoryId, products]);
  return (
    <div>
      {isLoading && products.length === 0 && <MiniLoader />}
      {!isLoading && productsToShow.length === 0 && (
        <div className="bg-white p-5 mb-5 mt-5">
          <div className="alert alert-danger">
            No products found within this category.
          </div>
        </div>
      )}
      <Row>
        {productsToShow.map((item, index) => (
          <Col md={2} sm={6} xs={6} className="mb-3 pointer" key={index}>
            <div
              className="product-item"
              onClick={() =>
                isMobile
                  ? navigate("/product/" + item.pId)
                  : openUrlInNewTab("/product/" + item.pId)
              }
            >
              <ImageLoader
                src={app.FILE_URL + item.images[0]?.image}
                alt={item.name}
              />
              <div className="description">
                <span title={item.name}>{item.name}</span>
                <div className="price">
                  {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                    <>
                      {item.currency} {currencyFormatter(item.singlePrice)}{" "}
                    </>
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
    </div>
  );
}

export default Products;
