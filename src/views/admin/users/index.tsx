import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
const Users = () => {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Users
            </CardTitle>
            <CardBody className=""></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Users;
