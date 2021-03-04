import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CandidatosBar from './Candidatos/CandidatosBar';
import EleitosBar from './Eleitos/EleitosBar';
import CandidatosEleitosColumn from './Comparativos/CandidatosEleitosColumn';
import EleitosCenario from './Eleitos/EleitosCenario';

export default function Charts(props) {
  const { data, ano } = props;
  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <CandidatosBar data={data.espectroPolitico} total={data.candidatos} />
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <EleitosBar data={data.espectroPolitico} total={data.eleitos} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <CandidatosEleitosColumn data={data.espectroPolitico} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <EleitosCenario
            ano={ano}
            total={data.eleitos}
            data={data.espectroPolitico}
          />
        </Col>
      </Row>
    </Container>
  );
}
