import React from 'react';

import ChartContainer from '../../../../../components/Search/ChartContainer';
import HighchartsBase from '../../../../../components/HighchartsBase';
import Env from '../../../../../includes/Env';

export default function PartidosColumn(props) {
  const { data } = props;
  const categories = [];
  const seriesCandidatos = [];
  const seriesEleitos = [];

  data.forEach((item) => {
    categories.push(item.sigla);
    seriesCandidatos.push(item.totalCandidaturas);
    seriesEleitos.push(item.totalEleitos);
  });
  const options = {
    chart: { type: 'column' },
    title: { text: null },
    xAxis: { categories, crosshair: true },
    yAxis: { title: { text: null }, labels: { format: '{value}' } },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
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
    series: [
      { name: 'Candidatos', color: Env.colors.green, data: seriesCandidatos },
      { name: 'Eleitos', color: Env.colors.yellow, data: seriesEleitos },
    ],
  };
  return (
    <ChartContainer title="Candidatos e Eleitos por partido">
      <HighchartsBase id="chart-partidos-column-1" options={options} />
    </ChartContainer>
  );
}
