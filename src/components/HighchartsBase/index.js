import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

/**
 * Base para renderização de gráficos da biblioteca Highcharts
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function HighchartsBase(props) {
  const { options, id } = props;

  return (
    <div id={id}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
HighchartsBase.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
};

HighchartsBase.defaultProps = {};
