import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { RootState } from "../../../reducers";
import { app } from "../../../constants";
import { currencyFormatter } from "../../../helpers";
import MiniLoader from "../../../layouts/loader/MiniLoader";
import { Iservice } from "../../../interfaces";
import { fetchServices } from "../../../actions/services";
import ImageLoader from "../../../components/image-loader";
import ViewMore from "./view-more";
import { isMobile } from "react-device-detect";

const SellerServices = () => {
  const dispatch = useDispatch();
  const { services, isLoading } = useSelector(
    (state: RootState) => state.services
  );

  const [showViewMore, setShowViewMore] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Iservice | undefined>(
    undefined
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, []);
  return (
    <div>
      <h2>Afriseller services</h2>
      {isLoading && services.length === 0 && (
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0"></CardTitle>
          <CardBody className="">
            <MiniLoader />
          </CardBody>
        </Card>
      )}
      <Row>
        {services.map((item, position) => (
          <Col md={3} key={position}>
            <Card>
              <CardBody>
                <ImageLoader
                  props={{
                    style: {
                      width: "100%",
                      borderRadius: 10,
                      height: isMobile ? "auto" : 150,
                    },
                  }}
                  src={app.FILE_URL + item.image}
                  alt={item.name}
                />
                <p className="mt-2" style={{ textTransform: "capitalize" }}>
                  <b>{item.name}</b>
                </p>
                <p>
                  Price: {currencyFormatter(item.price)} {item.currency}
                </p>
                <button
                  className="common-btn"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowViewMore(true);
                  }}
                >
                  <i className="bi bi-eye"></i> View more
                </button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <ViewMore
        selectedItem={selectedItem}
        showModal={showViewMore}
        setShowModal={setShowViewMore}
      />
    </div>
  );
};

export default SellerServices;
