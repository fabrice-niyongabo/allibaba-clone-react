import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { RootState } from "../../reducers";
import { fetchWishlist } from "../../actions/wishlist";
import Loader from "../../layouts/loader/Loader";
import ImageLoader from "../../components/image-loader";
import { app } from "../../constants";
import "../../assets/scss/wishlist.scss";
import { Link } from "react-router-dom";

const WishList = () => {
  const dispatch = useDispatch();
  const { isLoading, list } = useSelector((state: RootState) => state.wishlist);
  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          My Wishlist
        </CardTitle>
        <CardBody>
          {isLoading && list.length === 0 ? (
            <Loader />
          ) : (
            <Row>
              {list.map((item, index) => (
                <Col md={3} key={index}>
                  <div className="wishlist-card-item shadow">
                    <Link to={"/product/" + item.pId}>
                      <ImageLoader src={app.FILE_URL + item.images[0]?.image} />
                    </Link>
                    <p>{item.name}</p>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default WishList;
