import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import { IProduct } from "../../../../interfaces";
import { app } from "../../../../components/constants";
import { Link } from "react-router-dom";

interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: IProduct | undefined;
}
function Images({ showModal, setShowModal, selectedItem }: IEditProps) {
  useEffect(() => {}, [showModal]);
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
          <Modal.Title>
            Images for {selectedItem && selectedItem.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {selectedItem &&
              selectedItem.images.map((item, position) => (
                <Col md={4}>
                  <img
                    src={app.FILE_URL + item.image}
                    style={{ width: "100%" }}
                    alt=""
                  />
                </Col>
              ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/dashboard/product/${selectedItem?.pId}`} target="_blank">
            <button className="btn btn-primary">Add Image</button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Images;
