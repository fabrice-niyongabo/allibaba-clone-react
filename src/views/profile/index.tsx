import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row, Spinner } from "reactstrap";
import FullPageLoader from "../../components/full-page-loader";
import { TOAST_MESSAGE_TYPES } from "../../interfaces";
import { errorHandler, toastMessage } from "../../helpers";

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //   const res = await axios.post(
      //     app.BACKEND_URL + "/productcategories/",
      //     { name, icon },
      //     setHeaders(token)
      //   );
      //   setName("");
      //   setIcon("");
      //   setIsLoading(false);
      //   setCategories([{ ...res.data.category }, ...categories]);
      //   toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
    } catch (error) {
      errorHandler(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Product Categories List
            </CardTitle>
            <CardBody className=""></CardBody>
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
                  />
                </div>
                <div>
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <FullPageLoader open={isLoading} />
    </div>
  );
};

export default Profile;
