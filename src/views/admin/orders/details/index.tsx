import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { ICartItem, IOrder, IProduct, Ishop } from "../../../../interfaces";
import { Modal } from "react-bootstrap";
import { currencyFormatter } from "../../../../helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers";
import { Link } from "react-router-dom";

interface IProps {
  order: IOrder | undefined;
  showModal: boolean;
  setShowModal: any;
}

const BoughtFrom = ({ shopId }: { shopId: number }) => {
  const { shops } = useSelector((state: RootState) => state.shops);
  const [shop, setShop] = useState<Ishop | undefined>(undefined);
  useEffect(() => {
    const shp = shops.find((item) => item.shopId === shopId);
    if (shp) {
      setShop(shp);
    }
  }, [shopId, shops]);

  return (
    <p
      style={{
        textTransform: "capitalize",
        margin: 0,
        color: "#333",
      }}
    >
      Seller: {shop?.shopName}
    </p>
  );
};

const ShopInfo = ({
  shopId,
  products,
}: {
  shopId: number;
  products: IProduct[] | undefined;
}) => {
  const { shops } = useSelector((state: RootState) => state.shops);
  const [shop, setShop] = useState<Ishop | undefined>(undefined);
  useEffect(() => {
    const shp = shops.find((item) => item.shopId === shopId);
    if (shp) {
      setShop(shp);
    }
  }, [shopId, shops]);

  const returnProductsBought = () => {
    let prods = products?.filter((prod) => prod.shopId === shopId);
    return prods?.length;
  };
  return (
    <div style={{ borderBottom: "1px solid #CCC" }}>
      <p style={{ textTransform: "capitalize", padding: "10px", margin: 0 }}>
        {shop?.shopName} | {returnProductsBought()} products
      </p>
    </div>
  );
};

function Details(props: IProps) {
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
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <h4>Order information</h4>
            <hr />
            <table className="table">
              <tbody>
                <tr>
                  <td>Delivery Address</td>
                  <td>{props.order?.deliveryAddress}</td>
                </tr>
                <tr>
                  <td>Delevery Contact</td>
                  <td>{props.order?.deliveryContactNumber}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{props.order?.deliveryDescription}</td>
                </tr>
                <tr>
                  <td>Delivery Fees</td>
                  <td>{currencyFormatter(props.order?.deliveryFees)} RWF</td>
                </tr>
                <tr>
                  <td>Cart Total</td>
                  <td>{currencyFormatter(props.order?.cartTotalAmount)} RWF</td>
                </tr>
                <tr>
                  <td>Payment Method</td>
                  <td>{props.order?.paymentMethod}</td>
                </tr>
                <tr>
                  <td>Payment Status</td>
                  <td>{props.order?.paymentStatus}</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col md={6}>
            <h4>Client's Info</h4>
            <hr />
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <b>Names</b>
                  </td>
                  <td>{props.order?.client?.names}</td>
                </tr>
                <tr>
                  <td>
                    <b>Phone</b>
                  </td>
                  <td>{props.order?.client?.phone}</td>
                </tr>
                <tr>
                  <td>
                    <b>Email</b>
                  </td>
                  <td>{props.order?.client?.email}</td>
                </tr>
              </tbody>
            </table>
            <h4>Seller's Info</h4>
            <hr />
            {props.order?.shopsIdList.map((shopId, index) => (
              <ShopInfo
                shopId={shopId}
                products={props.order?.products}
                key={index}
              />
            ))}
          </Col>
        </Row>
        <h4>Ordered Products</h4>
        <hr />
        <Row>
          {props.order?.products?.map((product, index) => (
            <Col md={3} key={index}>
              <div className="shadow p-3">
                <p className="m-0" style={{ textTransform: "capitalize" }}>
                  <b>{product.name}</b>
                </p>
                <span>
                  {currencyFormatter(props.order?.cartItems[index].price)} RWF x{" "}
                  {props.order?.cartItems[index].quantity}
                </span>
                <BoughtFrom shopId={product.shopId} />
                <Link to={`/product/${product.pId}`}>View product</Link>
              </div>
            </Col>
          ))}
        </Row>
      </Modal.Body>
      {/* <Modal.Footer>
        <button onClick={() => handlePrint()} className="btn btn-primary">
          Print Invoice
        </button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default Details;
