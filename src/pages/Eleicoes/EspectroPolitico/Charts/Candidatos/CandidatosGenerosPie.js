import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ChartContainer from '../../../../../components/Search/ChartContainer';
import HighchartsBase from '../../../../../components/HighchartsBase';

export default function CandidatosGenerosPie(props) {
  const { data } = props;
  const seriesFeminino = [];
  const seriesMasculino = [];

  function renderGenero(id, nome, cor, candidatos) {
    const { generos } = candidatos;
    generos.forEach((item) => {
      if (item.id === 2) {
        seriesMasculino.push({
          name: nome,
          y: item.percentual,
          color: cor,
        });
      } else if (item.id === 3) {
        seriesFeminino.push({
          name: nome,
          y: item.percentual,
          color: cor,
        });
      }
    });
  }

  data.forEach((item) => {
    renderGenero(item.id, item.nome, item.cor, item.candidatos);
  });

  return (
    <ChartContainer title="Candidatos por gênero">
      <Row>
        <ChartPie id="fem-3" title="Feminino" series={seriesFeminino} />
        <ChartPie id="mas-2" title="Masculino" series={seriesMasculino} />
      </Row>
    </ChartContainer>
  );
}

function ChartPie(props) {
  const { id, title, series } = props;
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
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
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
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: title,
        colorByPoint: true,
        data: series,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Col col={6}>
      <h3 className="title">{title}</h3>
      <HighchartsBase id={id} options={options} />
    </Col>
  );
}
