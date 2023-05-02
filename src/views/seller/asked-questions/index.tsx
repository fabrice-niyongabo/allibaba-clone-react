import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
const AskedQuestions = () => {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              AskedQuestions
            </CardTitle>
            <CardBody className=""></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AskedQuestions;
