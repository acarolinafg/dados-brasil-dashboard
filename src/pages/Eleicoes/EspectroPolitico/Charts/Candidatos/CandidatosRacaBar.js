import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ProgressBar from '../../../../../components/ProgressBar';
import {
  numberFormatBr,
  selectBgColorEspectro,
} from '../../../../../includes/Helper';
import ChartContainer from '../../../../../components/Search/ChartContainer';

export default function CandidatosRacaBar(props) {
  const { data } = props;
  const charts = [];

  data.forEach((item) => {
    charts.push(
      <Col md={4} className="mt-3" key={item.id}>
        <h3 className="title">{item.nome}</h3>
        <ChartRacas data={item.candidaturas.corRacas} espectroId={item.id} />
      </Col>
    );
  });

  return (
    <ChartContainer title="Candidatos por Cor/Raça">
      <Row>{charts}</Row>
    </ChartContainer>
  );
}

function ChartRacas(props) {
  const { data, espectroId } = props;
  const progressBar = [];
  data.forEach((item) => {
    if (item.id !== 1 && item.id !== 7) {
      progressBar.push(
        <ProgressBar
          key={`espectro-${espectroId}-${item.id}`}
          now={item.percentual}
          variant={selectBgColorEspectro(espectroId)}
          label={`${item.nome}: ${numberFormatBr(item.total)}`}
          labelExtra={`${numberFormatBr(item.percentual)}%`}
        />
      );
    }
  });

  return <div>{progressBar}</div>;
}
