import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Col, NavItem, Row, Spinner } from "reactstrap";
import { RootState } from "../../../../reducers";
import { app } from "../../../../components/constants";
import {
  currencyFormatter,
  errorHandler,
  toastMessage,
} from "../../../../components/helpers";
import { IProduct, Ishop, PRICE_TYPE_ENUM } from "../../../../interfaces";
import ReactHtmlParser from "react-html-parser";

const initilaState = { name: "", icon: "" };
interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: IProduct | undefined;
}
function Details({ showModal, setShowModal, selectedItem }: IEditProps) {
  const { shops } = useSelector((state: RootState) => state.shops);
  const [selectedShop, setSelectedShop] = useState<Ishop | undefined>(
    undefined
  );

  useEffect(() => {
    if (showModal) {
      const shp = shops.find((item) => item.shopId === selectedItem?.shopId);
      if (shp) {
        setSelectedShop(shp);
      }
    }
  }, [showModal]);
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>{selectedItem?.name} - full details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info">
            {ReactHtmlParser(selectedItem?.description as string)}
          </div>
          <h3>Pricing</h3>
          {selectedItem?.priceType === PRICE_TYPE_ENUM.SINGLE && (
            <>{currencyFormatter(selectedItem.singlePrice)} RWF</>
          )}
          {selectedItem?.priceType === PRICE_TYPE_ENUM.MANY && (
            <>
              <table className="table table-bordered">
                <tbody style={{ borderTopWidth: 0 }}>
                  {selectedItem.prices.map((item, position) => (
                    <tr key={position}>
                      <td>{item.name}</td>
                      <td>{currencyFormatter(item.amount)} RWF</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <h3>Shop Information</h3>
          <table className="table table-bordered">
            <tbody style={{ borderTopWidth: 0 }}>
              <tr>
                <td>Name</td>
                <td>{selectedShop?.shopName}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{selectedShop?.address}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{selectedShop?.phone1}</td>
              </tr>
            </tbody>
          </table>
          <h3>Product Images</h3>
          <Row>
            {selectedItem?.images.map((item, position) => (
              <Col md={3} xs={6} key={position}>
                <img
                  src={app.FILE_URL + item.image}
                  style={{ width: "100%", borderRadius: 10 }}
                  alt=""
                />
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Details;
