import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Env from '../../includes/Env';
import Footer from '../../components/Footer';

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
