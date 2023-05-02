import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/scss/product.scss";
import { Col, Row } from "reactstrap";
import ProductImages from "./product-images";
import Supplier from "./supplier";
import RelatedProducts from "./related-products";
import ProductTabs from "./product-tabs";
import { useSelector } from "react-redux";
import { IProduct, PRICE_TYPE_ENUM } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../reducers";
import MiniLoader from "../../layouts/loader/MiniLoader";
import { currencyFormatter } from "../../components/helpers";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { app } from "../../components/constants";

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  useEffect(() => {
    let sub = true;
    if (sub) {
      const prod = products.find((item) => item.pId === Number(id));
      if (prod) setProduct(prod);
    }
    return () => {
      sub = false;
    };
  }, [products, id]);

  const getCategoryName = (id: number) => {
    const nm = categories.find((item) => item.id === id);
    if (nm) {
      return nm.name;
    }
    return " ";
  };

  const getSubCategoryName = (id: number, subcatId: number) => {
    const cat = categories.find((item) => item.id === id);
    if (cat) {
      const subCat = cat.subCategories.find((item) => item.id === subcatId);
      if (subCat) {
        return subCat.name;
      }
    }
    return "-";
  };

  return (
    <>
      <Header />

      {product === undefined ? (
        <div className="afriseller-container single-product-container">
          <MiniLoader />
        </div>
      ) : (
        <>
          <div className="afriseller-container single-product-container">
            <div className="categories">
              <ul>
                <li onClick={() => navigate("/")}>
                  <span>Home</span>
                </li>
                <li>/</li>
                <li onClick={() => navigate("/")}>
                  <span>{getCategoryName(product.categoryId)}</span>
                </li>
                <li>/</li>
                <li onClick={() => navigate("/")}>
                  <span>
                    {getSubCategoryName(
                      product.categoryId,
                      product.subCategoryId
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <Row className="mt-4">
              <Col md={4}>
                <ProductImages product={product} />
              </Col>
              <Col md={5}>
                <p>{product.name}</p>
                <div className="prices-container">
                  <Row>
                    {product.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                      <Col md={4}>
                        <div className="price">
                          <span>Unit Price:</span>
                          <h3>{currencyFormatter(product.singlePrice)} RWF</h3>
                        </div>
                      </Col>
                    ) : (
                      product.prices.map((item, index) => (
                        <Col md={4} key={index}>
                          <div className="price">
                            <span>{item.name}</span>
                            <h3>{currencyFormatter(item.amount)} RWF</h3>
                          </div>
                        </Col>
                      ))
                    )}
                  </Row>
                </div>
                <p style={{ margin: 0, marginTop: 10 }}>Share this product:</p>
                <div className="share-container">
                  <FacebookShareButton
                    url={app.PUBLIC_URL + "/product/" + product.pId}
                  >
                    <div>
                      <i className="bi bi-facebook"></i>
                    </div>
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={app.PUBLIC_URL + "/product/" + product.pId}
                  >
                    <div>
                      <i className="bi bi-twitter"></i>
                    </div>
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={app.PUBLIC_URL + "/product/" + product.pId}
                  >
                    <div>
                      <i className="bi bi-whatsapp"></i>
                    </div>
                  </WhatsappShareButton>
                  <TelegramShareButton
                    url={app.PUBLIC_URL + "/product/" + product.pId}
                  >
                    <div>
                      <i className="bi bi-telegram"></i>
                    </div>
                  </TelegramShareButton>
                </div>
              </Col>
              <Col md={3}>
                <Supplier product={product} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={9}>
                <RelatedProducts product={product} />
              </Col>
            </Row>
          </div>
          <ProductTabs product={product} />
        </>
      )}
      <Footer />
    </>
  );
}

export default SingleProduct;
