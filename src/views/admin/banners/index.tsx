import { Card } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { RootState } from "../../../reducers";
import { app } from "../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../helpers";
import { IBanner, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import MiniLoader from "../../../layouts/loader/MiniLoader";
import Confirmation from "../../../controllers/confirmation";
import { fetchBanners, setBanners } from "../../../actions/banners";

const initialState = {
  image: "",
  url: "",
};
const Banners = () => {
  const dispatch = useDispatch();
  const { banners, isLoading } = useSelector(
    (state: RootState) => state.banners
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState(initialState);
  const { token } = useSelector((state: RootState) => state.user);

  const [showAlert, setShowAlert] = useState(false);
  const [deleteItem, setDeleteItem] = useState<IBanner | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      setIsSubmitting(false);
      const res = await axios.delete(
        app.BACKEND_URL + "/banners/" + deleteItem?.id,
        setHeaders(token)
      );
      setState(initialState);
      toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
      dispatch(
        setBanners(banners.filter((item) => item.id !== deleteItem?.id))
      );
      setIsDeleting(false);
      setDeleteItem(null);
    } catch (error) {
      errorHandler(error);
      setIsDeleting(false);
      setDeleteItem(null);
    }
  };

  const changeHandler = (e: any) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", state.image);
    formData.append("url", state.url);
    setIsSubmitting(true);
    try {
      setIsSubmitting(false);
      const res = await axios.post(
        app.BACKEND_URL + "/banners/",
        formData,
        setHeaders(token)
      );
      setState(initialState);
      toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
      dispatch(setBanners([...banners, res.data.banner]));
      if (imageRef?.current !== null) {
        imageRef.current.value = "";
      }
    } catch (error) {
      errorHandler(error);
      setIsSubmitting(false);
    }
  };

  const fetchData = () => {
    dispatch(fetchBanners());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <Card>
            <Card.Header>
              <strong>Manage Banners</strong>
            </Card.Header>
            <Card.Body>
              {isLoading && banners.length === 0 ? (
                <MiniLoader />
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Link</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banners.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={app.FILE_URL + item.image}
                              alt=""
                              style={{ width: 50, height: 40 }}
                            />
                          </td>
                          <td>
                            {item.url !== "" ? (
                              <a href={item.url} target="_blank">
                                Open url
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            {deleteItem &&
                            deleteItem.id === item.id &&
                            isDeleting ? (
                              <Spinner size="sm" />
                            ) : (
                              <span
                                onClick={() => {
                                  setDeleteItem(item);
                                  setShowAlert(true);
                                }}
                                style={{ color: "red", cursor: "pointer" }}
                              >
                                Delete
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card>
            <Card.Header>
              <strong>Add Banner</strong>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="">Banner URL (optiontional)</label>
                  <input
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="Ex: https://google.com"
                    value={state.url}
                    onChange={changeHandler}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={(e: any) =>
                      setState({ ...state, image: e.target.files[0] })
                    }
                    required
                    disabled={isSubmitting}
                    ref={imageRef}
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary"
                >
                  {isSubmitting && <Spinner />} Save Banner
                </button>
              </form>
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleDelete}
        title="Do you want to delete this banner?"
      />
    </>
  );
};

export default Banners;
