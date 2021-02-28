import React, { Component } from 'react';
import Dashboard from '../../../components/Dashboard';
import SearchForm from '../../../components/Search/Form/Eleicoes';
import Loading from '../../../components/Search/Loading';

export default class EspectroPolitico extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, filters: {}, loading: false };
    this.refreshPage = this.refreshPage.bind(this);
  }

  /**
   * Método responsável por atualizar a página conforme as requisições do formulário
   * @param data
   * @param filters
   * @param loading
   */
  refreshPage(data, filters, loading) {
    this.setState({ data, filters, loading });
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
        onRefresh={this.refreshPage}
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
