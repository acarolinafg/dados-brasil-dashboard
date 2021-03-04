import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CanidatosCard from './Candidatos/CandidatosCard';
import EleitosCard from './Eleitos/EleitosCard';
import ChartGeneroPie from '../../../../components/Search/Charts/ChartGeneroPie';

export default function ChartsComplementary(props) {
  const { data } = props;

  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <CanidatosCard
            nome={data.nome}
            total={data.candidatos.total}
            percentual={data.candidatos.percentualTotal}
          />
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <EleitosCard
            nome={data.nome}
            total={data.eleitos.total}
            percentual={data.eleitos.percentualTotal}
            percentualEspectro={data.percentualEleitosEspectro}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <ChartGeneroPie
            data={data.candidatos.generos}
            title="Candidatos por gênero"
            serieName="Candidatos"
            key={1}
          />
        </Col>
        <Col md={6}>
          <ChartGeneroPie
            data={data.eleitos.generos}
            title="Eleitos por gênero"
            serieName="Eleitos"
            key={2}
          />
        </Col>
      </Row>
    </Container>
  );
}
