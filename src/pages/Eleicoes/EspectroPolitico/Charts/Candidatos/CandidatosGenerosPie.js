import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import ChartContainer from '../../../../../components/Search/ChartContainer';
import HighchartsBase from '../../../../../components/HighchartsBase';
import { isEmptyArray } from '../../../../../includes/Helper';

export default class CandidatosGenerosPie extends Component {
  constructor(props) {
    super(props);

    this.state = { seriesFem: [], seriesMasc: [] };
  }

  componentDidMount() {
    const { seriesFem, seriesMasc } = this.state;

    if (isEmptyArray(seriesFem) && isEmptyArray(seriesMasc)) {
      this.renderSeries();
    }
  }

  setSerieGenero(name, color, data) {
    const { seriesFem, seriesMasc } = this.state;

    data.forEach((item) => {
      const serie = {
        name,
        color,
        y: item.percentual,
        target: `Candidatos: ${item.total}`,
      };

      if (item.id === 2) seriesMasc.push(serie);
      else if (item.id === 3) seriesFem.push(serie);

      this.setState({ seriesFem, seriesMasc });
    });
  }

  renderSeries() {
    const { data } = this.props;

    data.forEach((item) => {
      const { generos } = item.candidatos;
      this.setSerieGenero(item.nome, item.cor, generos);
    });
  }

  render() {
    const { seriesFem, seriesMasc } = this.state;
    return (
      <ChartContainer title="Candidatos por gênero">
        <Row>
          <ChartPie id="fem-3" title="Feminino" series={seriesFem} />
          <ChartPie id="masc-2" title="Masculino" series={seriesMasc} />
        </Row>
      </ChartContainer>
    );
  }
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
