import React from 'react';
import { Col } from 'react-bootstrap';
import {
  numberFormatBr,
  selectBgColorEspectro,
} from '../../../../includes/Helper';
import ChartContainer from '../../../../components/Search/ChartContainer';
import ProgressBar from '../../../../components/ProgressBar';

export default function ChartEleitos(props) {
  const { data } = props;

  const { candidatosEleitos } = data;
  const charts = [];

  candidatosEleitos.forEach((item) => {
    charts.push(
      <ProgressBar
        now={item.eleitos.taxa}
        variant={selectBgColorEspectro(item.id)}
        label={item.nome}
        labelExtra={numberFormatBr(item.eleitos.total)}
      />
    );
  });
  return (
    <Col md={6} className="mb-3">
      <ChartContainer
        title="Número de Eleitos"
        subtitle={`Total de eleitos: ${numberFormatBr(data.totalEleitos)}`}
      >
        {charts}
      </ChartContainer>
    </Col>
  );
}
