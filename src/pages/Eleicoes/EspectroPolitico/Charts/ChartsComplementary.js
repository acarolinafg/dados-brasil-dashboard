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
            nome={data.espectroPolitico.nome}
            total={data.espectroPolitico.candidaturas.total}
            percentual={data.espectroPolitico.candidaturas.percentual}
          />
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <EleitosCard
            nome={data.espectroPolitico.nome}
            total={data.espectroPolitico.eleitos.total}
            percentual={data.espectroPolitico.eleitos.percentual}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <ChartGeneroPie
            data={data.espectroPolitico.candidaturas.generos}
            title="Candidatos por gênero"
            serieName="Candidatos"
            id={1}
          />
        </Col>
        <Col md={6} className="mt-3  mt-md-0">
          <ChartGeneroPie
            data={data.espectroPolitico.eleitos.generos}
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
            data={data.espectroPolitico.candidaturas.corRacas}
          />
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <ChartRacaBar
            title="Eleitos por cor/raça"
            bgColor="bg-success"
            data={data.espectroPolitico.eleitos.corRacas}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12}>
          <CargosBar data={data.espectroPolitico.cargos} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12}>
          <PartidosColumn data={data.espectroPolitico.partidos} />
        </Col>
      </Row>
    </Container>
  );
}
