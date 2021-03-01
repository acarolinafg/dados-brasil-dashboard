import React from 'react';
import { Col } from 'react-bootstrap';

import ChartContainer from '../../../../components/Search/ChartContainer';
import HighchartsBase from '../../../../components/HighchartsBase';
import { numberFormatBr } from '../../../../includes/Helper';

export default function ChartCandidatosEleitos(props) {
  const { data } = props;
  const categories = [];
  const seriesCandidatos = [];
  const seriesEleitos = [];

  data.candidatosEleitos.forEach((item) => {
    categories.push(item.nome);
    seriesCandidatos.push(item.candidatos.total);
    let target = '( ';
    target = target
      .concat(numberFormatBr(item.taxaEleitosCandidatos))
      .concat('% dos candidatos )');
    seriesEleitos.push({
      name: item.nome,
      y: item.eleitos.total,
      color: item.cor,
      target,
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
    <Col md={12}>
      <ChartContainer
        title="Candidatos e Eleitos"
        subtitle="Análise comparativa entre o número de candidatos e o número de eleitos"
      >
        <HighchartsBase id="columChar1" options={options} />
      </ChartContainer>
    </Col>
  );
}
