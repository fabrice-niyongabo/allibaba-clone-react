import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import Edit from "./edit";
import { RootState } from "../../../reducers";
import { app } from "../../../constants";
import { currencyFormatter, errorHandler, setHeaders } from "../../../helpers";
import MiniLoader from "../../../layouts/loader/MiniLoader";
import Confirmation from "../../../controllers/confirmation";
import FullPageLoader from "../../../components/full-page-loader";
import { IRequestedService } from "../../../interfaces";
import ViewRequest from "./view-request";

const RequestedServices = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<IRequestedService[]>([]);

  const [showEdit, setShowEdit] = useState(false);
  const [showViewRequest, setShowViewRequest] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    IRequestedService | undefined
  >(undefined);

  const fetchServices = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/reqservices/all", setHeaders(token))
      .then((res) => {
        setTimeout(() => {
          setServices(res.data.requestedServices);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsLoading(false);
        }, 1000);
      });
  };

  const handleDelete = () => {
    if (selectedItem) {
      setIsSubmitting(true);
      axios
        .delete(
          app.BACKEND_URL + "/productcategories/" + selectedItem.id,
          setHeaders(token)
        )
        .then((res) => {
          setIsSubmitting(false);
          setServices(services.filter((item) => item.id !== selectedItem.id));
          setSelectedItem(undefined);
        })
        .catch((error) => {
          errorHandler(error);
          setIsSubmitting(false);
        });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <span>Requested services</span>
        </CardTitle>
        <CardBody className="">
          {isLoading ? (
            <MiniLoader />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <th>#</th>
                  <th>Service Name</th>
                  <th>Price</th>
                  <th>User Email</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </thead>
                <tbody style={{ borderTopWidth: 0 }}>
                  {services.map((item, position) => (
                    <tr key={position}>
                      <td valign="top">{position + 1}</td>
                      <td valign="top">{item.service.name}</td>
                      <td valign="top">
                        {currencyFormatter(item.price)} {item.currency}
                      </td>
                      <td valign="top">{item.user.email}</td>
                      <td valign="top">{item.status}</td>
                      <td align="center">
                        <span
                          className="text-info pointer"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowEdit(true);
                          }}
                        >
                          <i className="bi bi-eye"></i> Details
                        </span>
                        &nbsp;|&nbsp;
                        <span
                          className="text-primary pointer"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowEdit(true);
                          }}
                        >
                          <i className="bi bi-pen"></i> Edit
                        </span>
                        {item.status === "APPROVED" && (
                          <>
                            &nbsp;|&nbsp;
                            <span
                              className="text-primary pointer"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowEdit(true);
                              }}
                            >
                              <i className="bi bi-file-earmark-check"></i> Files
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      <Edit
        selectedItem={selectedItem}
        showModal={showEdit}
        setShowModal={setShowEdit}
      />
      <ViewRequest
        selectedItem={selectedItem}
        showModal={showViewRequest}
        setShowModal={setShowViewRequest}
      />

      <FullPageLoader open={isSubmitting} />
    </div>
  );
};

export default RequestedServices;
