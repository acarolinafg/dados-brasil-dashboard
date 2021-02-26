import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function Chart(props) {
  const { children, md, lg } = props;

  return (
    <Row className="search-chart shadow p-3 bg-white">
      <Col md={md} lg={lg}>
        {children}
      </Col>
    </Row>
  );
}
