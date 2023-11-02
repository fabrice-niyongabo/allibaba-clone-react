import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import {
  IOrder,
  IPAYMENT_METHODS_ENUM,
  ITableFilterConfig,
  PAYMENT_STATUS_ENUM,
} from "../../interfaces";
import axios from "axios";
import { app } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import MiniLoader from "../../layouts/loader/MiniLoader";
import { currencyFormatter, errorHandler, setHeaders } from "../../helpers";
import Details from "./details";
import Paginator from "../../components/table/paginator";
import TableFilter from "../../components/tableFilter";
import NoDataFound from "../../components/noDataFound";
const Orders = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IOrder | undefined>(
    undefined
  );

  //pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const itemsToShow = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);
  //pagination

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/orders", setHeaders(token))
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
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle
              tag="h6"
              className="border-bottom p-3 mb-0 card-header-container"
            >
              Orders List ({orders.length})
              <div>
                <TableFilter
                  placeHolder="Payment method"
                  filterBy="paymentMethod"
                  filterByOptions={[
                    { label: "Momo", value: IPAYMENT_METHODS_ENUM.MOMO },
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
                      <th>Delivery Address</th>
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
                        <td>{item.deliveryAddress}</td>
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <NoDataFound
                  data={allOrders}
                  title="You haven't placed any order yet."
                />
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
        order={selectedItem}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};

export default Orders;
