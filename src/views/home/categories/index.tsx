import React from "react";
import { Col, Row } from "reactstrap";

import img1 from "../../../assets/images/static/electronics.jpg";
import img2 from "../../../assets/images/static/1.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../constants";
import { openUrlInNewTab } from "../../../components/helpers";
function Categories() {
  const { products } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);
  return (
    <>
      {categories
        .filter((item) => item.onHome)
        .map((category, position) => (
          <div
            className="afriseller-container my-3 home-products-by-category"
            key={position}
          >
            <h3>{category.name}</h3>
            <Row>
              <Col md={4} style={{ height: "100%" }}>
                <div className="icon">
                  <ImageLoader src={app.FILE_URL + category.image} />
                </div>
              </Col>
              <Col md={8}>
                <Row>
                  {products
                    .filter((item) => item.categoryId === category.id)
                    .slice(0, 8)
                    .map((item, index) => (
                      <Col
                        xs={6}
                        sm={6}
                        md={3}
                        className="product-container"
                        key={index}
                      >
                        <h3 title={item.name}>{item.name}</h3>
                        <ImageLoader
                          src={app.FILE_URL + item.images[0]?.image}
                          props={{
                            className: "pointer",
                            onClick: () =>
                              openUrlInNewTab("/product/" + item.pId),
                          }}
                        />
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
          </div>
        ))}
    </>
  );
}

export default Categories;
