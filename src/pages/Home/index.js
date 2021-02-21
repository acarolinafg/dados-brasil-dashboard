import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Env from '../../includes/Env';

function Footer() {
  return (
    <footer className="footer bg-success">
      <Container fluid>
        <Row className="text-white">
          <Col>&copy; {Env.copy}</Col>
          <Col className="text-right">Versão {Env.version}</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="box">
      <main role="main" className="wrapper-home">
        <Container className="h-100">
          <Row className="h-100 align-items-center">
            <Col>
              <h1>{Env.name}</h1>
              <p className="lead">{Env.description}</p>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
