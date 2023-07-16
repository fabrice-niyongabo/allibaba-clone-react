import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row, Spinner } from "reactstrap";
import { isValidPhoneNumber } from "react-phone-number-input/input";
import FullPageLoader from "../../components/full-page-loader";
import { RootState } from "../../reducers";
import { app } from "../../constants";

const WishList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          My Wishlist
        </CardTitle>
        <CardBody></CardBody>
      </Card>
    </div>
  );
};

export default WishList;
