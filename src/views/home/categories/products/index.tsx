// @ts-nocheck
import Carousel from "nuka-carousel";

import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { RootState } from "../../../../reducers";
import { currencyFormatter, openUrlInNewTab } from "../../../../helpers";
import { PRICE_TYPE_ENUM } from "../../../../interfaces";
import { app } from "../../../../constants";

interface IProps {
  categoryId: number;
}
function Products({ categoryId }: IProps) {
  const { products } = useSelector((state: RootState) => state.products);

  return (
    <div className="products-carousel">
      <Carousel
        autoplay={false}
        wrapAround={true}
        slidesToShow={isMobile ? 1 : 5}
        adaptiveHeight={true}
        slidesToScroll={isMobile ? 1 : 2}
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
        {products
          .filter((item) => item.categoryId === categoryId)
          .slice(0, 50)
          .map((item, index) => (
            <div
              className="slider-item"
              key={index}
              onClick={() => openUrlInNewTab("/product/" + item.pId)}
            >
              <img src={app.FILE_URL + item.images[0]?.image} alt={item.name} />
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
  );
}

export default Products;
