import { Modal } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { IBookingForSupplier } from "../../../../interfaces";

interface Iprops {
  showModal: boolean;
  setShowModal: any;
  booked: IBookingForSupplier | undefined;
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
          <div>
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
                    <b>Shipping Country</b>
                  </td>
                  <td>{booked?.shippingCountry}</td>
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
            <small>
              <i>{new Date(String(booked?.createdAt)).toDateString()}</i>
            </small>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewProduct;
