import React, { Component } from 'react';

import {
  numberFormatBr,
  selectBgColorEspectro,
} from '../../../../../includes/Helper';
import ChartContainer from '../../../../../components/Search/ChartContainer';
import ProgressBar from '../../../../../components/ProgressBar';

export default class CandidatosBar extends Component {
  renderCharts() {
    const { data } = this.props;
    const charts = [];

    data.forEach((item) => {
      charts.push(
        <ProgressBar
          key={item.id}
          now={item.candidaturas.percentual}
          variant={selectBgColorEspectro(item.id)}
          label={`${item.nome}: ${numberFormatBr(item.candidaturas.total)}`}
          labelExtra={`${numberFormatBr(item.candidaturas.percentual)}%`}
        />
      );
    });
    return charts;
  }

  render() {
    const { total } = this.props;
    return (
      <ChartContainer
        title="Número de Candidatos"
        subtitle={`Total de candidatos: ${numberFormatBr(total)}`}
      >
        {this.renderCharts()}
      </ChartContainer>
    );
  }
}
