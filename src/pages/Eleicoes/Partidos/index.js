import React from 'react';
import Dashboard from '../../../components/Dashboard';

export default function Partidos() {
  const navigation = [
    { key: 1, name: 'Eleições' },
    { key: 2, name: 'Partidos', active: true },
  ];

  return (
    <Dashboard
      title="Partidos"
      icon={['fas', 'flag']}
      navigation={navigation}
    />
  );
}
