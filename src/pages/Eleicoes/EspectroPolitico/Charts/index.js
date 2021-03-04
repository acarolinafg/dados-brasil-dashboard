import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CandidatosBar from './Candidatos/CandidatosBar';
import EleitosBar from './Eleitos/EleitosBar';
import CandidatosEleitosColumn from './Comparativos/CandidatosEleitosColumn';

export default function Charts(props) {
  const { data } = props;
  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <CandidatosBar data={data.espectroPolitico} total={data.candidatos} />
        </Col>
        <Col md={6}>
          <EleitosBar data={data.espectroPolitico} total={data.eleitos} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <CandidatosEleitosColumn data={data.espectroPolitico} />
        </Col>
      </Row>
    </Container>
  );
}
