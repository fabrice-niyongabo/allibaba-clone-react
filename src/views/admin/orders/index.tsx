import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import {
  IOrder,
  IPAYMENT_METHODS_ENUM,
  ITableFilterConfig,
  IUser,
  PAYMENT_STATUS_ENUM,
  TOAST_MESSAGE_TYPES,
} from "../../../interfaces";
import axios from "axios";
import { app } from "../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import MiniLoader from "../../../layouts/loader/MiniLoader";
import {
  currencyFormatter,
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../helpers";
import Paginator from "../../../components/table/paginator";
import Details from "./details";
import TableFilter from "../../../components/tableFilter";
import NoDataFound from "../../../components/noDataFound";
import Confirmation from "../../../controllers/confirmation";
import FullPageLoader from "../../../components/full-page-loader";
const Orders = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [showApproveAlert, setShowApproveAlert] = useState(false);
  const [showRejectAlert, setShowRejectAlert] = useState(false);

  const [selectedItem, setSelectedItem] = useState<IOrder | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState(false);

  const approveHandler = () => {
    setIsUpdatingOrder(true);
    axios
      .put(
        app.BACKEND_URL + "/orders",
        { ...selectedItem, paymentStatus: PAYMENT_STATUS_ENUM.SUCCESS },
        setHeaders(token)
      )
      .then((res) => {
        setIsUpdatingOrder(false);
        setSelectedItem(undefined);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        fetchData();
      })
      .catch((error) => {
        setIsUpdatingOrder(false);
        errorHandler(error);
        setSelectedItem(undefined);
      });
  };
  const rejectHandler = () => {
    setIsUpdatingOrder(true);
    axios
      .put(
        app.BACKEND_URL + "/orders",
        { ...selectedItem, paymentStatus: PAYMENT_STATUS_ENUM.FAILED },
        setHeaders(token)
      )
      .then((res) => {
        setIsUpdatingOrder(false);
        setSelectedItem(undefined);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        fetchData();
      })
      .catch((error) => {
        setIsUpdatingOrder(false);
        errorHandler(error);
        setSelectedItem(undefined);
      });
  };

  //filtering
  const [tableFilterConfig, setTableFilterConfig] =
    useState<ITableFilterConfig>({
      filters: [
        { type: "paymentMethod", value: "" },
        { type: "paymentStatus", value: "" },
      ],
      searchKeyword: "",
    });
  useEffect(() => {
    let res = allOrders;
    for (let i = 0; i < tableFilterConfig.filters.length; i++) {
      if (tableFilterConfig.filters[i].value.trim() !== "") {
        res = res.filter(
          (item: any) =>
            item[tableFilterConfig.filters[i].type] ===
            tableFilterConfig.filters[i].value
        );
      }
    }
    setOrders(res);
  }, [tableFilterConfig]);
  //filtering

  //pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const itemsToShow = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);
  //pagination

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const clients: IUser[] = [];
  //   for (let i = 0; i < allOrders.length; i++) {
  //     const client = clients.find(
  //       (item) => item.userId === (allOrders[i].client?.userId as any)
  //     );
  //     if (!client) {
  //       clients.push(allOrders[i].client as any);
  //     }
  //   }
  //   setOrderClients(clients);
  // }, [allOrders]);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/orders/all", setHeaders(token))
      .then((res) => {
        setIsLoading(false);
        setOrders(res.data.orders);
        setAllOrders(res.data.orders);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  };
  return (
    <div>
      <FullPageLoader open={isUpdatingOrder} />
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle
              tag="h6"
              className="border-bottom p-3 mb-0 card-header-container"
            >
              <span> Orders List ({orders.length})</span>
              <div>
                {/* <TableFilter
                  placeHolder="Client's email"
                  filterBy="paymentMethod"
                  filterByOptions={orderClients.map((item) => ({
                    label: item.email,
                    value: item.email,
                  }))}
                  config={tableFilterConfig}
                  setConfig={setTableFilterConfig}
                  maxWidth={100}
                /> */}
                <TableFilter
                  placeHolder="Payment method"
                  filterBy="paymentMethod"
                  filterByOptions={[
                    { label: "Momo", value: IPAYMENT_METHODS_ENUM.MOMO },
                    {
                      label: "Momo Code",
                      value: IPAYMENT_METHODS_ENUM.MOMO_CODE,
                    },
                    { label: "Card", value: IPAYMENT_METHODS_ENUM.CARD },
                  ]}
                  config={tableFilterConfig}
                  setConfig={setTableFilterConfig}
                />
                <TableFilter
                  placeHolder="Payment Status"
                  filterBy="paymentStatus"
                  filterByOptions={[
                    { label: "Pending", value: PAYMENT_STATUS_ENUM.PENDING },
                    { label: "Success", value: PAYMENT_STATUS_ENUM.SUCCESS },
                    { label: "Failed", value: PAYMENT_STATUS_ENUM.FAILED },
                  ]}
                  config={tableFilterConfig}
                  setConfig={setTableFilterConfig}
                />
              </div>
            </CardTitle>
            <CardBody className="">
              {isLoading && <MiniLoader />}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Client</th>
                      <th>Client's Phone</th>
                      <th>Cart Items</th>
                      <th>Total</th>
                      <th>Payment Method</th>
                      <th>Payment Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsToShow.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item?.client?.names}</td>
                        <td>{item?.client?.phone}</td>
                        <td>{item.cartItems.length}</td>
                        <td>
                          {currencyFormatter(
                            Number(item.cartTotalAmount) +
                              Number(item.deliveryFees)
                          )}
                        </td>
                        <td>{item.paymentMethod}</td>
                        <td>{item.paymentStatus}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span
                            className="pointer text-primary"
                            onClick={() => {
                              setSelectedItem(item);
                              setShowModal(true);
                            }}
                          >
                            More details
                          </span>
                          {item.paymentMethod ===
                            IPAYMENT_METHODS_ENUM.MOMO_CODE &&
                            item.paymentStatus === "PENDING" && (
                              <>
                                <p
                                  className="p-0 m-0 text-success pointer"
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setShowApproveAlert(true);
                                  }}
                                >
                                  Approve
                                </p>
                                <p
                                  className="p-0 m-0 text-danger pointer"
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setShowRejectAlert(true);
                                  }}
                                >
                                  Reject
                                </p>
                              </>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <NoDataFound data={allOrders} />
                <Paginator
                  setItemsPerPage={setItemsPerPage}
                  itemsPerPage={itemsPerPage}
                  pageCount={pageCount}
                  setItemOffset={setItemOffset}
                  tableData={orders}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Details
        showModal={showModal}
        setShowModal={setShowModal}
        order={selectedItem}
      />
      <Confirmation
        showAlert={showApproveAlert}
        setShowAlert={setShowApproveAlert}
        callback={approveHandler}
        title="Do you want to approve this MOMO PAY Transaction?"
      />
      <Confirmation
        showAlert={showRejectAlert}
        setShowAlert={setShowRejectAlert}
        callback={rejectHandler}
        title="Do you want to reject this MOMO PAY transaction?"
      />
    </div>
  );
};

export default Orders;
