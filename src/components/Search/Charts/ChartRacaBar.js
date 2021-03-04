import React from 'react';
import ChartContainer from '../ChartContainer';
import ProgressBar from '../../ProgressBar';
import { numberFormatBr } from '../../../includes/Helper';

export default function ChartRacaBar(props) {
  const { title, data, bgColor } = props;
  const bars = [];

  data.forEach((item) => {
    bars.push(
      <ProgressBar
        key={item.id}
        now={item.percentual}
        variant={bgColor}
        label={`${item.nome}: ${numberFormatBr(item.total)}`}
        labelExtra={`${numberFormatBr(item.percentual)}%`}
      />
    );
  });
  return <ChartContainer title={title}>{bars}</ChartContainer>;
}
