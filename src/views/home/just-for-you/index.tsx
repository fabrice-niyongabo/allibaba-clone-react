import { Col, Row } from "reactstrap";

import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../constants";
import { currencyFormatter, openUrlInNewTab } from "../../../helpers";
import { PRICE_TYPE_ENUM } from "../../../interfaces";
function JustForYou() {
  const { products } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);

  const getCategoryName = (id: number) => {
    const nm = categories.find((item) => item.id === id);
    if (nm) {
      return nm.name;
    }
    return " ";
  };
  return (
    <div className="afriseller-container my-3 home-just-for-you">
      <h3>JUST FOR YOU</h3>
      <Row>
        {products.slice(0, 12).map((item, position) => (
          <Col md={2} key={position}>
            <div
              className="product-container pointer"
              onClick={() => openUrlInNewTab("/product/" + item.pId)}
            >
              <ImageLoader
                src={app.FILE_URL + item.images[0]?.image}
                alt={item.name}
              />
              <div className="prod-description">
                <p>{item.name}</p>
                {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                  <p>
                    {item.currency} {currencyFormatter(item.singlePrice)}
                  </p>
                ) : (
                  <p>
                    {item.currency} {currencyFormatter(item.prices[0]?.amount)}
                  </p>
                )}

                <p>{getCategoryName(item.categoryId)}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default JustForYou;
