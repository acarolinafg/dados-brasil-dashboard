import React from 'react';
import { isEmptyValue, numberFormatBr } from '../../includes/Helper';

export default function ProgressBar(props) {
  const { now, variant, dark, label, labelExtra } = props;
  const classDark = dark ? 'progress-bar-dark' : '';

  const renderLabel = !isEmptyValue(label) ? <span>{label}</span> : '';
  const renderLabelExtra = !isEmptyValue(labelExtra) ? (
    <span className="float-right">{labelExtra}</span>
  ) : (
    ''
  );
  const nowFormat = numberFormatBr(now);
  return (
    <div className="progress-bar-chart">
      {renderLabel}
      {renderLabelExtra}
      <div className="progress">
        <div
          className={`progress-bar ${classDark} ${variant}`}
          role="progressbar"
          style={{ width: `${now}%` }}
          aria-valuenow={now}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {`${nowFormat}%`}
        </div>
      </div>
    </div>
  );
}
