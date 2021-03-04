import React from 'react';

import ChartContainer from '../../../../../components/Search/ChartContainer';
import HighchartsBase from '../../../../../components/HighchartsBase';
import Env from '../../../../../includes/Env';

export default function CargosBar(props) {
  const { data } = props;
  const categories = [];
  const seriesCandidatos = [];
  const seriesEleitos = [];

  data.forEach((item) => {
    categories.push(item.nome);
    seriesCandidatos.push(item.candidatos);
    seriesEleitos.push(item.eleitos);
  });

  const options = {
    chart: {
      type: 'bar',
    },
    title: { text: null },

    xAxis: {
      categories,
      title: { text: null },
    },
    yAxis: {
      min: 0,
      title: { text: null },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Candidatos',
        data: seriesCandidatos,
        color: Env.colors.yellow,
      },
      {
        name: 'Eleitos',
        data: seriesEleitos,
        color: Env.colors.green,
      },
    ],
  };

  return (
    <ChartContainer title="Candidatos e Eleitos por cargo">
      <HighchartsBase id="chart-cargos-bar-1" options={options} />
    </ChartContainer>
  );
}
