//@ts-nocheck
import React from "react";
import Carousel from "nuka-carousel";

import { IProduct, PRICE_TYPE_ENUM } from "../../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { app } from "../../../constants";
import { currencyFormatter, openUrlInNewTab } from "../../../helpers";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

interface IRelatedProductsProps {
  product: IProduct;
}
function RelatedProducts({ product }: IRelatedProductsProps) {
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.products);
  const [relatedProducts, setRelatedProducts] = React.useState<IProduct[]>([]);
  React.useEffect(() => {
    let sub = true;
    if (sub) {
      try {
        const prods = products.filter(
          (item) =>
            item.categoryId === product.categoryId && item.pId !== product.pId
        );
        setRelatedProducts(prods);
      } catch (error) {}
    }
    return () => {
      sub = false;
    };
  }, [product, products]);
  return (
    <>
      {relatedProducts.length > 0 && (
        <div className="related-products-container">
          <h3 style={{ fontSize: 16 }}>You may also like</h3>
          <Carousel
            autoplay={false}
            wrapAround={true}
            slidesToShow={isMobile ? 1 : 5}
            adaptiveHeight={true}
            slidesToScroll={isMobile ? 1 : 5}
            style={{ outline: "none" }}
            renderBottomCenterControls={() => <></>}
            renderCenterLeftControls={({ previousSlide }) => (
              <div className="carausel-custom-control" onClick={previousSlide}>
                <i className="bi bi-caret-left-fill"></i>
              </div>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <div className="carausel-custom-control" onClick={nextSlide}>
                <i className="bi bi-caret-right-fill"></i>
              </div>
            )}
          >
            {relatedProducts.map((item, index) => (
              <div
                className="slider-item"
                key={index}
                onClick={() =>
                  isMobile
                    ? navigate("/product/" + item.pId)
                    : openUrlInNewTab("/product/" + item.pId)
                }
              >
                <img
                  src={app.FILE_URL + item.images[0]?.image}
                  alt={item.name}
                />
                <p title={item.name}>{item.name}</p>
                {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                  <span
                    title={`${item.currency} ${currencyFormatter(
                      item.singlePrice
                    )}`}
                  >
                    {item.currency} {currencyFormatter(item.singlePrice)}
                  </span>
                ) : (
                  <span
                    title={`${item.currency} ${currencyFormatter(
                      item.prices[0]?.amount
                    )} ${
                      item.prices.length - 1 > 0 &&
                      " - " +
                        currencyFormatter(
                          item.prices[item.prices.length - 1].amount
                        )
                    }  `}
                  >
                    {item.currency}
                    {currencyFormatter(item.prices[0]?.amount)}
                    {item.prices.length - 1 > 0 && (
                      <>
                        -{" "}
                        {currencyFormatter(
                          item.prices[item.prices.length - 1].amount
                        )}
                      </>
                    )}
                  </span>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
}

export default RelatedProducts;
