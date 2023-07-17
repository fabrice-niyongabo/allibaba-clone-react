import { useState } from "react";
import { Col, Row } from "reactstrap";
import Description from "./description";
import Reviews from "./reviews";
import Faq from "./faq";
import { IProduct } from "../../../interfaces";

enum PRODUCT_TABS_ENUM {
  PRODUCT_DESCRIPTION = "PRODUCT_DESCRIPTION",
  PRODUCT_FAQ = "PRODUCT_FAQ",
  PRODUCT_REVIEWS = "PRODUCT_REVIEWS",
}
interface IProductTabs {
  product: IProduct;
}
function ProductTabs({ product }: IProductTabs) {
  const [activeTab, setActiveTab] = useState<string>(
    PRODUCT_TABS_ENUM.PRODUCT_DESCRIPTION
  );
  return (
    <div className="afriseller-container single-product-tabs-container">
      <Row>
        <Col md={9}>
          <div
            className={`tab ${
              activeTab === PRODUCT_TABS_ENUM.PRODUCT_DESCRIPTION
                ? "active"
                : ""
            }`}
            onClick={() => setActiveTab(PRODUCT_TABS_ENUM.PRODUCT_DESCRIPTION)}
          >
            Product description
          </div>
          <div
            className={`tab ${
              activeTab === PRODUCT_TABS_ENUM.PRODUCT_REVIEWS ? "active" : ""
            }`}
            onClick={() => setActiveTab(PRODUCT_TABS_ENUM.PRODUCT_REVIEWS)}
          >
            Product reviews (1)
          </div>
          <div
            className={`tab ${
              activeTab === PRODUCT_TABS_ENUM.PRODUCT_FAQ ? "active" : ""
            }`}
            onClick={() => setActiveTab(PRODUCT_TABS_ENUM.PRODUCT_FAQ)}
          >
            Product FAQ
          </div>
          <div className="tab-contents-main-container">
            {activeTab === PRODUCT_TABS_ENUM.PRODUCT_DESCRIPTION && (
              <Description product={product} />
            )}
            {activeTab === PRODUCT_TABS_ENUM.PRODUCT_REVIEWS && <Reviews />}
            {activeTab === PRODUCT_TABS_ENUM.PRODUCT_FAQ && <Faq />}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductTabs;
