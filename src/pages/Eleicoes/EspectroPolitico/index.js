import React, { Component } from 'react';
import Dashboard from '../../../components/Dashboard';
import SearchForm from '../../../components/Search/Form/Eleicoes';
import Loading from '../../../components/Search/Loading';

export default class EspectroPolitico extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, filters: {}, loading: false };
    this.onLoading = this.onLoading.bind(this);
    this.onResult = this.onResult.bind(this);
  }

  /**
   * Colocar a página no modo de carregar
   */
  onLoading() {
    this.setState({ loading: true });
  }

  /**
   * Armazena o resultado da requisição
   * @param {Object} result
   */
  onResult(result) {
    this.setState(result);
  }

  render() {
    const { data, filters, loading } = this.state;
    const navigation = [
      { key: 1, name: 'Eleições' },
      { key: 2, name: 'Espectro Político', active: true },
    ];
    const sidebar = (
      <SearchForm
        selectEspectroPolitico
        selectCargo
        onResult={this.onResult}
        onLoading={this.onLoading}
        urlFilters="eleicoes/espectro-politico/filtros"
        urlSearch="eleicoes/espectro-politico"
      />
    );
    return (
      <Dashboard
        title="Espectro Político"
        icon={['fas', 'flag-checkered']}
        navigation={navigation}
        sidebar={sidebar}
        filters={filters}
      >
        {loading ? (
          <div className="search-loading">
            <Loading />
          </div>
        ) : (
          ''
        )}
        {data ? '' : ''}
      </Dashboard>
    );
  }
}
