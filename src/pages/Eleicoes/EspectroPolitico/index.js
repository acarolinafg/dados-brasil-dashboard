import React from 'react';
import Dashboard from '../../../components/Dashboard';
import SearchForm from '../../../components/Search/Form/Eleicoes';

export default function EspectroPolitico() {
  const navigation = [
    { key: 1, name: 'Eleições' },
    { key: 2, name: 'Espectro Político', active: true },
  ];
  const sidebar = <SearchForm selectEspectroPolitico selectCargo />;
  return (
    <Dashboard
      title="Espectro Político"
      icon={['fas', 'flag-checkered']}
      navigation={navigation}
      sidebar={sidebar}
    />
  );
}
