import React from 'react';
import { isEmptyValue } from '../../../includes/Helper';

export default function ChartContainer(props) {
  const { children, title, subtitle } = props;

  const renderTitle = !isEmptyValue(title) ? (
    <h2 className="title">{title}</h2>
  ) : (
    ''
  );
  const renderSubtitle = !isEmptyValue(subtitle) ? (
    <p className="subtitle">{subtitle}</p>
  ) : (
    ''
  );
  return (
    <div className="search-chart shadow p-3 bg-white">
      {renderTitle}
      {renderSubtitle}
      {children}
    </div>
  );
}
