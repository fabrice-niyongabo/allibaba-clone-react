import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row, Spinner } from "reactstrap";
import Edit from "./edit";
import { RootState } from "../../../reducers";
import { app } from "../../../components/constants";
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../components/helpers";
import MiniLoader from "../../../layouts/loader/MiniLoader";
import Confirmation from "../../../components/controllers/confirmation";
import FullPageLoader from "../../../components/full-page-loader";
import { ICategory, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import SubCategories from "./sub-categories";

const Categories = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [showEdit, setShowEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ICategory | undefined>(
    undefined
  );
  const [showSubCategories, setShowSubCategories] = useState<boolean>(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        app.BACKEND_URL + "/productcategories/",
        formData,
        setHeaders(token)
      );
      setName("");
      if (imageRef.current) imageRef.current.value = "";
      setIsSubmitting(false);
      setCategories([{ ...res.data.category }, ...categories]);
      toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
    } catch (error) {
      errorHandler(error);
      setIsSubmitting(false);
    }
  };

  const fetchCategories = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/productcategories/")
      .then((res) => {
        setTimeout(() => {
          setCategories(res.data.categories);
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
          setCategories(
            categories.filter((item) => item.id !== selectedItem.id)
          );
          setSelectedItem(undefined);
        })
        .catch((error) => {
          errorHandler(error);
          setIsSubmitting(false);
        });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <Row>
        <Col md={8}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Product Categories List
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
                      <th>Category Name</th>
                      <th className="text-center">Action</th>
                    </thead>
                    <tbody style={{ borderTopWidth: 0 }}>
                      {categories.map((item, position) => (
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
                            <span
                              className="text-primary pointer"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowEdit(true);
                              }}
                            >
                              Edit
                            </span>{" "}
                            &nbsp;|&nbsp;
                            <span
                              className="text-danger pointer"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowAlert(true);
                              }}
                            >
                              Delete
                            </span>
                            &nbsp;|&nbsp;
                            <span
                              className="pointer"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowSubCategories(true);
                              }}
                            >
                              Sub Cats({item.subCategories.length})
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Add New Category
            </CardTitle>
            <CardBody className="">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="form-control"
                    required
                    value={name}
                    disabled={isSubmitting}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group my-2">
                  <span>Banner Image</span>
                  <input
                    type="file"
                    className="form-control"
                    required
                    disabled={isSubmitting}
                    onChange={(t: any) => setImage(t.target.files[0])}
                    ref={imageRef}
                  />
                </div>
                <div>
                  <button className="btn btn-primary">
                    {isSubmitting && <Spinner size="sm" color="white" />} Submit
                  </button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
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
        fetchData={fetchCategories}
      />
      <SubCategories
        selectedItem={selectedItem}
        showModal={showSubCategories}
        setShowModal={setShowSubCategories}
        fetchData={fetchCategories}
        categories={categories}
      />
      <FullPageLoader open={isSubmitting} />
    </div>
  );
};

export default Categories;
