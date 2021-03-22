import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CandidatosBar from './Candidatos/CandidatosBar';
import EleitosBar from './Eleitos/EleitosBar';
import CandidatosEleitosColumn from './Comparativos/CandidatosEleitosColumn';
import EleitosCenario from './Eleitos/EleitosCenario';
import CandidatosGenerosPie from './Candidatos/CandidatosGenerosPie';
import CandidatosRacaBar from './Candidatos/CandidatosRacaBar';

export default function Charts(props) {
  const { data } = props;
  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <CandidatosBar
            data={data.espectroPolitico}
            total={data.totalCandidaturas.total}
          />
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <EleitosBar
            data={data.espectroPolitico}
            total={data.totalEleitos.total}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <CandidatosEleitosColumn data={data} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <EleitosCenario
            data={data.espectroPolitico}
            total={data.totalEleitos.total}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <CandidatosGenerosPie
            data={data.espectroPolitico}
            totalGenero={data.totalCandidaturas.totalGenero}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <CandidatosRacaBar
            data={data.espectroPolitico}
            totalCorRaca={data.totalCandidaturas.totalCorRaca}
          />
        </Col>
      </Row>
    </Container>
  );
}
