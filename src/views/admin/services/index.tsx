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
import { Iservice } from "../../../interfaces";
import AddService from "./add-service";

const Services = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<Iservice[]>([]);

  const [addService, setAddService] = useState<boolean>(false);

  const [showEdit, setShowEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Iservice | undefined>(
    undefined
  );

  const fetchServices = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/services/all", setHeaders(token))
      .then((res) => {
        setTimeout(() => {
          setServices(res.data.services);
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Afriseller services</span>
            <button className="common-btn" onClick={() => setAddService(true)}>
              <i className="bi bi-plus"></i> Add New
            </button>
          </div>
        </CardTitle>
        <CardBody className="">
          {isLoading ? (
            <MiniLoader />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </thead>
                <tbody style={{ borderTopWidth: 0 }}>
                  {services.map((item, position) => (
                    <tr key={position}>
                      <td>{item.id}</td>
                      <td>
                        <img
                          src={app.FILE_URL + item.image}
                          style={{ width: 100 }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        {currencyFormatter(item.price)} {item.currency}
                      </td>
                      <td>{item.description}</td>
                      <td>{item.isActive ? "Active" : "Disabled"}</td>
                      <td align="center">
                        <span
                          className="text-primary pointer"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowEdit(true);
                          }}
                        >
                          Edit
                        </span>
                        {/* &nbsp;|&nbsp;
                        <span
                          className="text-danger pointer"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowAlert(true);
                          }}
                        >
                          Delete
                        </span> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleDelete}
        title="Do you want to delete this category?"
      />
      <Edit
        selectedItem={selectedItem}
        showModal={showEdit}
        setShowModal={setShowEdit}
        fetchData={fetchServices}
      />
      <AddService
        showModal={addService}
        setShowModal={setAddService}
        fetchData={fetchServices}
      />
      <FullPageLoader open={isSubmitting} />
    </div>
  );
};

export default Services;
