import React from 'react';

import ChartContainer from '../../../../../components/Search/ChartContainer';
import HighchartsBase from '../../../../../components/HighchartsBase';

export default function CandidatosEleitosColumn(props) {
  const { data } = props;
  const categories = [];
  const seriesCandidatos = [];
  const seriesEleitos = [];

  data.espectroPolitico.forEach((item) => {
    categories.push(item.nome);

    seriesCandidatos.push(item.candidaturas.total);

    seriesEleitos.push({
      name: item.nome,
      color: item.cor,
      y: item.eleitos.total,
    });
  });

  const options = {
    chart: {
      type: 'column',
    },
    title: null,
    plotOptions: {
      series: {
        grouping: false,
        borderWidth: 0,
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      headerFormat: '<span style="font-size: 15px">{point.name}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} </b> {point.target}<br/>',
    },
    xAxis: { categories },
    yAxis: [
      {
        title: {
          text: null,
        },
        showFirstLabel: false,
      },
    ],
    series: [
      {
        color: 'rgb(158, 159, 163)',
        pointPlacement: -0.2,
        linkedTo: 'main',
        data: seriesCandidatos,
        name: 'Candidatos',
      },
      {
        name: 'Eleitos',
        id: 'main',
        dataLabels: [
          {
            enabled: true,
            inside: true,
            style: {
              fontSize: '12px',
            },
          },
        ],
        data: seriesEleitos,
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <ChartContainer
      title="Candidatos e Eleitos"
      subtitle="Análise comparativa entre o número de candidatos e o número de eleitos"
    >
      <HighchartsBase id="chart-espectro-1" options={options} />
    </ChartContainer>
  );
}
