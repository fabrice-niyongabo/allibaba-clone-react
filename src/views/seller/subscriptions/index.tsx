import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
const Subscriptions = () => {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Subscriptions
            </CardTitle>
            <CardBody className=""></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Subscriptions;
