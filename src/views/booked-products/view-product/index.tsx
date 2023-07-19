import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { IBooking } from "../../../interfaces";
import ReactHtmlParser from "react-html-parser";

interface Iprops {
  showModal: boolean;
  setShowModal: any;
  booked: IBooking | undefined;
}
function ViewProduct({ setShowModal, showModal, booked }: Iprops) {
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{booked?.product?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <b>Quantity</b>
                </td>
                <td>{booked?.quantity}</td>
              </tr>
              <tr>
                <td>
                  <b>Shipping date range</b>
                </td>
                <td>
                  {booked?.from} - {booked?.to}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {ReactHtmlParser(booked?.description as string)}
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewProduct;
