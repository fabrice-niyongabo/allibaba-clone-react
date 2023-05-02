import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
const Shops = () => {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Shops
            </CardTitle>
            <CardBody className=""></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Shops;
