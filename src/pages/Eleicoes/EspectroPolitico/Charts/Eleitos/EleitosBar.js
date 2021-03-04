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
        now={item.eleitos.percentualTotal}
        variant={selectBgColorEspectro(item.id)}
        label={`${item.nome} (${numberFormatBr(
          item.eleitos.percentualTotal
        )}%)`}
        labelExtra={numberFormatBr(item.eleitos.total)}
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
