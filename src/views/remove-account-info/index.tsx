import React from "react";
import Header from "../../components/header";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

function RemoveAccountInfo() {
  return (
    <>
      <Header />
      <div className="mt-5 afriseller-container">
        <h3 className="text-center">Remove/delete your user account</h3>
        <Card className="mt-5">
          <CardBody className="p-5">
            <div>
              <p>Before you proceed, please consider the following:</p>

              <ul>
                <li>
                  <strong>Data Deletion:</strong> Deleting your account will
                  permanently remove all associated data, including profile
                  information and activity history.
                </li>
                <li>
                  <strong>Irreversible Action:</strong> This action is
                  irreversible. Once your account is deleted, it cannot be
                  recovered.
                </li>
                <li>
                  <strong>Reauthentication:</strong> For security reasons, we
                  may ask you to re-enter your password to confirm the deletion.
                </li>
              </ul>

              <p>
                If you still wish to proceed, please click the "Delete My
                Account" button below.
              </p>
            </div>
            <div className="text-center">
              <Link to={"/account/remove/confirm"}>
                <button className="common-btn">
                  I am aware of that, Continue
                </button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default RemoveAccountInfo;
