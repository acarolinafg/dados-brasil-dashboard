import React from 'react';
import Dashboard from '../../../components/Dashboard';

export default function EspectroPolitico() {
  const navigation = [
    { key: 1, name: 'Eleições' },
    { key: 2, name: 'Espectro Político', active: true },
  ];
  return (
    <Dashboard
      title="Espectro Político"
      icon={['fas', 'flag-checkered']}
      navigation={navigation}
    />
  );
}
