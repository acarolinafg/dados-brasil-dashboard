import React from 'react';
import { Col } from 'react-bootstrap';
import {
  numberFormatBr,
  selectBgColorEspectro,
} from '../../../../includes/Helper';
import ChartContainer from '../../../../components/Search/ChartContainer';
import ProgressBar from '../../../../components/ProgressBar';

export default function ChartCandidatos(props) {
  const { data } = props;
  const { candidatosEleitos } = data;
  const charts = [];

  candidatosEleitos.forEach((item) => {
    charts.push(
      <ProgressBar
        now={item.candidatos.taxa}
        variant={selectBgColorEspectro(item.id)}
        label={item.nome}
        labelExtra={numberFormatBr(item.candidatos.total)}
      />
    );
  });
  return (
    <Col md={6} className="mb-3">
      <ChartContainer
        title="Número de candidatos"
        subtitle={`Total de candidatos: ${numberFormatBr(
          data.totalCandidatos
        )}`}
      >
        {charts}
      </ChartContainer>
    </Col>
  );
}
