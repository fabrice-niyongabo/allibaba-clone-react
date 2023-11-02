import { IOrder } from "../../../interfaces";
import { Modal } from "react-bootstrap";
import { currencyFormatter } from "../../../helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

interface IProps {
  order: IOrder | undefined;
  showModal: boolean;
  setShowModal: any;
}

function Details(props: IProps) {
  const { names } = useSelector((state: RootState) => state.user);

  const returnCartQuantity = (pid: number) => {
    let value = 0;
    const prod = props.order?.cartItems.find((item) => item.productId === pid);
    if (prod) {
      value = prod.quantity;
    }
    return value;
  };
  const returnCartPrice = (pid: number) => {
    let value = 0;
    const prod = props.order?.cartItems.find((item) => item.productId === pid);
    if (prod) {
      value = prod.price;
    }
    return value;
  };

  const handlePrint = () => {
    const windowFeatures = "width=400,height=500";
    const url = window.location.origin + "/invoice/" + props.order?.id;
    window.open(url, "SmallWindow", windowFeatures);
  };

  return (
    <Modal
      show={props.showModal}
      onHide={() => props.setShowModal(false)}
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>
          <i>Bill To | Ship To:</i>
        </h3>
        <p>
          <b>Client Names:</b> {names}
        </p>
        <p>
          <b>Address:</b> {props.order?.deliveryAddress}
        </p>
        <p>
          <b>Contacts:</b> {props.order?.deliveryContactNumber}
        </p>
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p>
              <b>Inv No: </b> {props.order?.id}
            </p>
          </div>
          <div>
            <p>
              <b> Date: </b>
              {new Date(props.order?.createdAt as any).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="table-reponsive">
          <table className="table">
            <thead>
              <tr className="bg-light">
                <th>Item Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.order?.products?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td></td>
                  <td>{returnCartQuantity(item.pId)}</td>
                  <td>{currencyFormatter(returnCartPrice(item.pId))}</td>
                  <td>
                    {currencyFormatter(
                      returnCartPrice(item.pId) * returnCartQuantity(item.pId)
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td>Delivery Fees</td>
                <td>-</td>
                <td>1</td>
                <td>{currencyFormatter(props.order?.deliveryFees)}</td>
                <td>{currencyFormatter(props.order?.deliveryFees)}</td>
              </tr>
              <tr className="bg-light">
                <td></td>
                <td colSpan={3}>
                  <b>Total Amount Paid</b>
                </td>
                <td>
                  <b>
                    {currencyFormatter(
                      Number(props.order?.cartTotalAmount) +
                        Number(props.order?.deliveryFees)
                    )}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button onClick={() => handlePrint()} className="btn btn-primary">
          Print Invoice
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default Details;
