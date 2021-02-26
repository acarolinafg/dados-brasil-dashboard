import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Env from '../../includes/Env';

export default function Footer(props) {
  const { classFooter } = props;
  return (
    <footer className={`footer bg-success mt-5 ${classFooter}`} role="contentinfo">
      <Container fluid>
        <Row className="text-white">
          <Col>&copy; {Env.copy}</Col>
          <Col className="text-right">Versão {Env.version}</Col>
        </Row>
      </Container>
    </footer>
  );
}
