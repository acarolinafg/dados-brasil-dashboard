import React from 'react';

import ChartContainer from '../ChartContainer';
import HighchartsBase from '../../HighchartsBase';
import Env from '../../../includes/Env';

export default function ChartGeneroPie(props) {
  const { data, title, serieName, id } = props;
  const seriesData = [];

  data.forEach((item) => {
    seriesData.push({ name: item.nome, y: item.percentual });
  });

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: '{series.name}: <br>{point.percentage:.1f} %',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: serieName,
        colorByPoint: true,
        data: seriesData,
      },
    ],
    colors: [Env.colors.blue, Env.colors.green, Env.colors.yellow],
    credits: {
      enabled: false,
    },
  };
  return (
    <ChartContainer title={title}>
      <HighchartsBase id={`chart-genero-pie-${id}`} options={options} />
    </ChartContainer>
  );
}
