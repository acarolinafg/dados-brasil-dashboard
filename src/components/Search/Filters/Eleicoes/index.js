import React from 'react';

export default function SearchFilter(props) {
  const { filters } = props;
  const content = [];

  if (filters.ano) {
    content.push(
      <span key={1}>
        Ano: <b>{filters.ano}</b>
      </span>
    );
  }

  if (filters.regiao) {
    const filter = filters.regiao !== '' ? filters.regiao : 'Todas';
    content.push(
      <span key={2}>
        Região: <b>{filter}</b>
      </span>
    );
  }

  if (filters.estado) {
    const filter = filters.estado !== '' ? filters.estado : 'Todos';
    content.push(
      <span key={3}>
        Estado: <b>{filter}</b>
      </span>
    );
  }

  if (filters.municipio) {
    const filter = filters.municipio !== '' ? filters.municipio : 'Todos';
    content.push(
      <span key={4}>
        Município: <b>{filter}</b>
      </span>
    );
  }

  if (filters.turno) {
    content.push(
      <span key={5}>
        Turno: <b>{filters.turno}</b>
      </span>
    );
  }

  if (filters.tipoEleicao) {
    content.push(
      <span key={6}>
        Tipo de Eleição: <b>{filters.tipoEleicao}</b>
      </span>
    );
  }

  if (filters.eleicao) {
    content.push(
      <span key={6}>
        Eleição: <b>{filters.eleicao}</b>
      </span>
    );
  }

  if (filters.cargo) {
    const filter = filters.cargo !== '' ? filters.cargo : 'Todos';
    content.push(
      <span key={9}>
        Cargo: <b>{filter}</b>
      </span>
    );
  }

  if (filters.partido) {
    const filter = filters.partido !== '' ? filters.partido : 'Todos';
    content.push(
      <span key={7}>
        Partido: <b>{filter}</b>
      </span>
    );
  }

  if (filters.espectroPolitico) {
    const filter =
      filters.espectroPolitico !== '' ? filters.espectroPolitico : 'Todos';
    content.push(
      <span key={8}>
        Espectro Político: <b>{filter}</b>
      </span>
    );
  }

  return <div className="search-filters">{content}</div>;
}
