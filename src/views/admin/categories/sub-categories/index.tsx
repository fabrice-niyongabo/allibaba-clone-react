import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Col, Row, Spinner } from "reactstrap";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../../helpers";
import {
  ICategory,
  ISubCategory,
  TOAST_MESSAGE_TYPES,
} from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";
import Confirmation from "../../../../controllers/confirmation";

const initilaState = { name: "" };
interface ISubCategoriesProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: ICategory | undefined;
  categories: ICategory[];
  fetchData: any;
}
function SubCategories({
  showModal,
  setShowModal,
  selectedItem,
  fetchData,
  categories,
}: ISubCategoriesProps) {
  const { token } = useSelector((state: RootState) => state.user);
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);

  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    ISubCategory | undefined
  >(undefined);

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post(
        app.BACKEND_URL + "/productsubcategories/",
        { ...state, categoryId: selectedItem?.id },
        setHeaders(token)
      )
      .then((res) => {
        setIsSubmitting(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        setState(initilaState);
        fetchData();
      })
      .catch((error) => {
        errorHandler(error);
        setIsSubmitting(false);
      });
  };

  const handleDelete = () => {
    if (selectedSubCategory) {
      setIsSubmitting(true);
      axios
        .delete(
          app.BACKEND_URL + "/productsubcategories/" + selectedSubCategory.id,
          setHeaders(token)
        )
        .then((res) => {
          setIsSubmitting(false);
          fetchData();
          toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, "Subcategory deleted!");
        })
        .catch((error) => {
          errorHandler(error);
          setIsSubmitting(false);
        });
    }
  };

  useEffect(() => {
    if (selectedItem) {
      const cat = categories.find((item) => item.id === selectedItem.id);
      if (cat) {
        setSubCategories(cat.subCategories);
      }
    }
  }, [categories, selectedItem]);

  return (
    <div>
      <FullPageLoader open={isSubmitting} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>SubCategories of {selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col>
                {subCategories.map((item, position) => (
                  <div
                    key={position}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #CCC",
                    }}
                  >
                    <span>{item.name}</span>
                    <div>
                      <span
                        className="text-danger pointer"
                        onClick={() => {
                          setSelectedSubCategory(item);
                          setShowAlert(true);
                        }}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                ))}
              </Col>
              <Col>
                <div className="shadow p-2">
                  <div className="form-group mb-3">
                    <label>Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      required
                      onChange={(e) =>
                        setState({ ...state, name: e.target.value })
                      }
                      value={state.name}
                      disabled={isSubmitting}
                    />
                  </div>
                  <button className="btn btn-primary">
                    {isSubmitting && <Spinner size="sm" color="white" />} Save
                  </button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </form>
      </Modal>

      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleDelete}
        title="Do you want to delete this sub category?"
      />
    </div>
  );
}

export default SubCategories;
