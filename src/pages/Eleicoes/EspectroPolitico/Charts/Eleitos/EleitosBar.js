import React, { Component } from 'react';

import {
  numberFormatBr,
  selectBgColorEspectro,
} from '../../../../../includes/Helper';
import ChartContainer from '../../../../../components/Search/ChartContainer';
import ProgressBar from '../../../../../components/ProgressBar';

export default class EleitosBar extends Component {
  renderCharts() {
    const { data } = this.props;
    const charts = [];

    data.forEach((item) => {
      charts.push(
        <ProgressBar
          key={item.id}
          now={item.eleitos.percentual}
          variant={selectBgColorEspectro(item.id)}
          label={`${item.nome}: ${numberFormatBr(item.eleitos.total)}`}
          labelExtra={`${numberFormatBr(item.eleitos.percentual)}%`}
        />
      );
    });
    return charts;
  }

  render() {
    const { total } = this.props;
    return (
      <ChartContainer
        title="Número de Eleitos"
        subtitle={`Total de eleitos: ${numberFormatBr(total)}`}
      >
        {this.renderCharts()}
      </ChartContainer>
    );
  }
}
