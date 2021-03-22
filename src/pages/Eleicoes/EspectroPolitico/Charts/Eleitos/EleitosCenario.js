import React from 'react';
import ChartContainer from '../../../../../components/Search/ChartContainer';
import HighchartsBase from '../../../../../components/HighchartsBase';
import { numberFormatBr } from '../../../../../includes/Helper';

export default function EleitosCenario(props) {
  const { data, total } = props;
  const seriesData = [];

  data.forEach((item) => {
    seriesData.push({
      name: item.nome,
      color: item.cor,
      y: item.eleitos.total,
    });
  });

  const title = `Total de eleitos: <br> ${numberFormatBr(total)}`;

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: title,
      align: 'center',
      verticalAlign: 'middle',
      y: 60,
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
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '150%',
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Eleitos',
        innerSize: '50%',
        data: seriesData,
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <ChartContainer
      title="Eleitos - Cenário político"
      subtitle="Composição política pelo espectro político"
    >
      <HighchartsBase id="chart-espectro-2" options={options} />
    </ChartContainer>
  );
}
