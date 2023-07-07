import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row, Spinner } from "reactstrap";
import { RootState } from "../../../reducers";
import { app } from "../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../helpers";
import FullPageLoader from "../../../components/full-page-loader";
import { fetchCategories } from "../../../actions/categories";
import { TOAST_MESSAGE_TYPES } from "../../../interfaces";
import Check from "./check";

const HomeCategories = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const categoriesReducer = useSelector((state: RootState) => state.categories);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (
        categoriesReducer.isLoading &&
        categoriesReducer.categories.length === 0
      ) {
        setIsSubmitting(true);
      } else {
        setIsSubmitting(false);
      }
    }
    return () => {
      sub = false;
    };
  }, [categoriesReducer]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleChange = (req: {
    column: string;
    value: boolean;
    id: number;
  }) => {
    setIsSubmitting(true);
    axios
      .put(
        app.BACKEND_URL + "/productcategories/toggle",
        { ...req },
        setHeaders(token)
      )
      .then((res) => {
        setIsSubmitting(false);
        dispatch(fetchCategories());
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };
  return (
    <div>
      <Row>
        <Col md={6}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Header section categories
            </CardTitle>
            <CardBody className="">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody style={{ borderTopWidth: 0 }}>
                    {categoriesReducer.categories.map((item, position) => (
                      <tr key={position}>
                        <td>{item.name}</td>
                        <td>
                          <Check
                            callBack={handleChange}
                            id={item.id}
                            column="onHeaderSection"
                            defaultValue={item.onHeaderSection}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Home ALL CATEGORIES Section
            </CardTitle>
            <CardBody className="">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody style={{ borderTopWidth: 0 }}>
                    {categoriesReducer.categories.map((item, position) => (
                      <tr key={position}>
                        <td>{item.name}</td>
                        <td>
                          <Check
                            callBack={handleChange}
                            id={item.id}
                            column="onCategoriesSection"
                            defaultValue={item.onCategoriesSection}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Categories to be shown on home page
            </CardTitle>
            <CardBody className="">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody style={{ borderTopWidth: 0 }}>
                    {categoriesReducer.categories.map((item, position) => (
                      <tr key={position}>
                        <td>{item.name}</td>
                        <td>
                          <Check
                            callBack={handleChange}
                            id={item.id}
                            column="onHome"
                            defaultValue={item.onHome}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Header Navbar section
            </CardTitle>
            <CardBody className="">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody style={{ borderTopWidth: 0 }}>
                    {categoriesReducer.categories.map((item, position) => (
                      <tr key={position}>
                        <td>{item.name}</td>
                        <td>
                          <Check
                            callBack={handleChange}
                            id={item.id}
                            column="onHeaderNav"
                            defaultValue={item.onHeaderNav}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <FullPageLoader open={isSubmitting} />
    </div>
  );
};

export default HomeCategories;
