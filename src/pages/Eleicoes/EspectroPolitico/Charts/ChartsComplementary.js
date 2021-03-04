import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CanidatosCard from './Candidatos/CandidatosCard';
import EleitosCard from './Eleitos/EleitosCard';
import ChartGeneroPie from '../../../../components/Search/Charts/ChartGeneroPie';
import ChartRacaBar from '../../../../components/Search/Charts/ChartRacaBar';
import CargosBar from './Comparativos/CargosBar';
import PartidosColumn from './Comparativos/PartidosColumn';

export default function ChartsComplementary(props) {
  const { data } = props;

  return (
    <Container fluid>
      <Row className="mb-3">
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
      <Row className="mb-3">
        <Col md={6}>
          <ChartGeneroPie
            data={data.candidatos.generos}
            title="Candidatos por gênero"
            serieName="Candidatos"
            id={1}
          />
        </Col>
        <Col md={6} className="mt-3  mt-md-0">
          <ChartGeneroPie
            data={data.eleitos.generos}
            title="Eleitos por gênero"
            serieName="Eleitos"
            id={2}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <ChartRacaBar
            title="Candidatos por cor/raça"
            bgColor="bg-warning"
            data={data.candidatos.racas}
          />
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <ChartRacaBar
            title="Eleitos por cor/raça"
            bgColor="bg-success"
            data={data.eleitos.racas}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12}>
          <CargosBar data={data.cargos} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12}>
          <PartidosColumn data={data.partidos} />
        </Col>
      </Row>
    </Container>
  );
}
