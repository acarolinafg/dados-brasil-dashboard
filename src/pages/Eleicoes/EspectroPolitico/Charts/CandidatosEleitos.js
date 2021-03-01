import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Chart from '../../../../components/Search/ChartContainer';

export default class CandidatosEleitos extends Component {
  constructor(props) {
    super(props);
    /* Iniciar state */
    this.getInitialState();
  }

  getInitialState() {
    const { data } = this.props;
    const series = [];

    data.forEach((item) => {
      series.push({
        name: item.nome,
        color: item.cor,
        data: [item.candidatos, item.eleitos],
      });
    });

    this.state = {
      options: {
        chart: { type: 'column' },
        title: { text: 'Candidatos e Eleitos por Espectro Político' },
        xAxis: { categories: ['Candidatos', 'Eleitos'], crosshair: true },
        yAxis: { title: { text: null }, labels: { format: '{value}' } },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: { pointPadding: 0.2, borderWidth: 0 },
        },
        credits: { enabled: false },
        series,
      },
    };
  }

  componentDidMount() {
    this.internalChart.setSize(null);
  }

  afterChartCreated = (chart) => {
    this.internalChart = chart;
  };

  render() {
    const { options } = this.state;
    return (
      <Chart md={12} lg={12}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          callback={this.afterChartCreated}
        />
      </Chart>
    );
  }
}
