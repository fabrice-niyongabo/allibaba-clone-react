import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../constants";
import Products from "./products";
function Categories() {
  const { products } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);

  const checkForProducts = (categoryId: number) => {
    return products.filter((item) => item.categoryId === categoryId).length > 0;
  };
  return (
    <>
      {categories
        // .filter((item) => item.onHome)
        .filter((item) => checkForProducts(item.id))
        .map((category, position) => (
          <div
            className="afriseller-container my-3 home-products-by-category"
            key={position}
          >
            <h3>{category.name}</h3>
            <Row>
              <Col md={3} style={{ height: "100%" }}>
                <div className="icon">
                  <ImageLoader src={app.FILE_URL + category.image} />
                </div>
              </Col>
              <Col md={9}>
                <Products categoryId={category.id} />
              </Col>
            </Row>
          </div>
        ))}
    </>
  );
}

export default Categories;
