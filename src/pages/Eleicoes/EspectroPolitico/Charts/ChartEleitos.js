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

  const { candidatosEleitos, meta } = data;
  const charts = [];

  candidatosEleitos.forEach((item) => {
    charts.push(
      <ProgressBar
        key={item.id}
        now={item.eleitos.percentual}
        variant={selectBgColorEspectro(item.id)}
        label={`${item.nome} (${numberFormatBr(item.eleitos.percentual)}%)`}
        labelExtra={numberFormatBr(item.eleitos.total)}
      />
    );
  });
  return (
    <Col md={6} className="mb-3">
      <ChartContainer
        title="Número de Eleitos"
        subtitle={`Total de eleitos: ${numberFormatBr(meta.eleitos)}`}
      >
        {charts}
      </ChartContainer>
    </Col>
  );
}
