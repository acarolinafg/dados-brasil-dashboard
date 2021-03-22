import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CanidatosCard from './Candidatos/CandidatosCard';
import EleitosCard from './Eleitos/EleitosCard';

export default function ChartsComplementary(props) {
  const { data } = props;

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md={6}>
          <CanidatosCard
            nome={data.nome}
            total={data.candidaturas.total}
            percentual={data.candidaturas.percentual}
          />
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <EleitosCard
            nome={data.nome}
            total={data.eleitos.total}
            percentual={data.eleitos.percentual}
            percentualEspectro={data.eleitos.percentualCandidatura}
          />
        </Col>
      </Row>
    </Container>
  );
}
