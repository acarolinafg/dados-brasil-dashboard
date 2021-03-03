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
  const { candidatosEleitos, meta } = data;
  const charts = [];

  candidatosEleitos.forEach((item) => {
    charts.push(
      <ProgressBar
        key={item.id}
        now={item.candidatos.percentual}
        variant={selectBgColorEspectro(item.id)}
        label={`${item.nome} (${numberFormatBr(item.candidatos.percentual)}%)`}
        labelExtra={numberFormatBr(item.candidatos.total)}
      />
    );
  });

  return (
    <Col md={6} className="mb-3">
      <ChartContainer
        title="Número de candidatos"
        subtitle={`Total de candidatos: ${numberFormatBr(meta.candidatos)}`}
      >
        {charts}
      </ChartContainer>
    </Col>
  );
}
