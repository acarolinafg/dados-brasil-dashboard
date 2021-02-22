import React from 'react';
import Dashboard from '../../../components/Dashboard';
import SearchForm from '../../../components/Search/Form/Eleicoes';

export default function Partidos() {
  const navigation = [
    { key: 1, name: 'Eleições' },
    { key: 2, name: 'Partidos', active: true },
  ];
  const sidebar = <SearchForm />;
  return (
    <Dashboard
      title="Partidos"
      icon={['fas', 'flag']}
      navigation={navigation}
      sidebar={sidebar}
    />
  );
}
