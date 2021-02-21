import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Env from '../../includes/Env';

export default function Footer() {
  return (
    <footer className="footer bg-success" role="contentinfo">
      <Container fluid>
        <Row className="text-white">
          <Col>&copy; {Env.copy}</Col>
          <Col className="text-right">Versão {Env.version}</Col>
        </Row>
      </Container>
    </footer>
  );
}
