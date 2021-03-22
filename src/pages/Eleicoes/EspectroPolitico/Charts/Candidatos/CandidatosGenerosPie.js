import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import ChartContainer from '../../../../../components/Search/ChartContainer';
import HighchartsBase from '../../../../../components/HighchartsBase';
import { numberFormatBr } from '../../../../../includes/Helper';

export default class CandidatosGenerosPie extends Component {
  constructor(props) {
    super(props);

    this.state = { seriesFem: [], totalFem: 0, seriesMasc: [], totalMasc: 0 };
  }

  componentDidMount() {
    this.renderSeries();
    this.setTotalMasc();
    this.setTotalFem();
  }

  setTotalMasc() {
    const { totalGenero } = this.props;
    let totalMasc = 0;
    totalGenero.forEach((item) => {
      if (item.id === 2) totalMasc = item.total;
    });

    this.setState({ totalMasc });
  }

  setTotalFem() {
    const { totalGenero } = this.props;
    let totalFem = 0;
    totalGenero.forEach((item) => {
      if (item.id === 3) totalFem = item.total;
    });

    this.setState({ totalFem });
  }

  setSerieMasc(name, color, data) {
    const { seriesMasc } = this.state;

    data.forEach((item) => {
      const serie = {
        name,
        color,
        y: item.total,
      };

      if (item.id === 2) seriesMasc.push(serie);

      this.setState({ seriesMasc });
    });
  }

  setSerieFem(name, color, data) {
    const { seriesFem } = this.state;

    data.forEach((item) => {
      const serie = {
        name,
        color,
        y: item.total,
      };

      if (item.id === 3) seriesFem.push(serie);

      this.setState({ seriesFem });
    });
  }

  renderSeries() {
    const { data } = this.props;

    data.forEach((item) => {
      const { generos } = item.candidaturas;
      this.setSerieMasc(item.nome, item.cor, generos);
      this.setSerieFem(item.nome, item.cor, generos);
    });
  }

  render() {
    const { seriesFem, totalFem, seriesMasc, totalMasc } = this.state;

    return (
      <ChartContainer title="Candidatos por gênero">
        <Row>
          <ChartFemPie series={seriesFem} total={totalFem} />
          <ChartMascPie series={seriesMasc} total={totalMasc} />
        </Row>
      </ChartContainer>
    );
  }
}

function ChartFemPie(props) {
  const { series, total } = props;
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
          format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %',
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Gênero Feminino',
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
      <h3 className="title">Feminino</h3>
      <p className="subtitle">Total de candidatas: {numberFormatBr(total)}</p>
      <HighchartsBase id="chart-candidaturas-fem-3" options={options} />
    </Col>
  );
}

function ChartMascPie(props) {
  const { series, total } = props;
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
          format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %',
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Gênero Masculino',
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
      <h3 className="title">Masculino</h3>
      <p className="subtitle">Total de candidatos: {numberFormatBr(total)}</p>
      <HighchartsBase id="chart-candidaturas-masc-3" options={options} />
    </Col>
  );
}
