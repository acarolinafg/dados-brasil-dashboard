import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CandidatosBar from './Candidatos/CandidatosBar';
import EleitosBar from './Eleitos/EleitosBar';
import CandidatosEleitosColumn from './Comparativos/CandidatosEleitosColumn';
import EleitosCenario from './Eleitos/EleitosCenario';

export default function Charts(props) {
  const { data } = props;
  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <CandidatosBar
            data={data.candidaturas}
            total={data.totalCandidatos}
          />
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <EleitosBar data={data.eleitos} total={data.totalEleitos} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <CandidatosEleitosColumn data={data} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <EleitosCenario total={data.totalEleitos} data={data.eleitos} />
        </Col>
      </Row>
    </Container>
  );
}
