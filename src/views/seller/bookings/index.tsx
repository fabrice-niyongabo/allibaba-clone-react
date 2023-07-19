import React from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

function bookings() {
  return (
    <>
      <div>
        <Row>
          <Col md={12}>
            <Card>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                Booked Products
              </CardTitle>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default bookings;
