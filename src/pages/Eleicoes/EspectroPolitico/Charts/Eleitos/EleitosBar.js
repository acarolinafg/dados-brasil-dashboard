import React from 'react';

import {
  numberFormatBr,
  selectBgColorEspectro,
} from '../../../../../includes/Helper';
import ChartContainer from '../../../../../components/Search/ChartContainer';
import ProgressBar from '../../../../../components/ProgressBar';

export default function EleitosBar(props) {
  const { data, total } = props;
  const charts = [];

  data.forEach((item) => {
    charts.push(
      <ProgressBar
        key={item.id}
        now={item.percentual}
        variant={selectBgColorEspectro(item.id)}
        label={`${item.nome}: ${numberFormatBr(item.total)}`}
        labelExtra={`${numberFormatBr(item.percentual)}%`}
      />
    );
  });
  return (
    <ChartContainer
      title="Número de Eleitos"
      subtitle={`Total de eleitos: ${numberFormatBr(total)}`}
    >
      {charts}
    </ChartContainer>
  );
}
