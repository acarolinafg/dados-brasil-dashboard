import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import Dashboard from '../../../components/Dashboard';
import SearchForm from '../../../components/Search/Form/Eleicoes';
import Loading from '../../../components/Search/Loading';
import ChartCandidatos from './Charts/ChartCandidatos';
import ChartEleitos from './Charts/ChartEleitos';
import ChartCandidatosEleitos from './Charts/ChartCandidatosEleitos';
import { isEmptyObject } from '../../../includes/Helper';

export default class EspectroPolitico extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, filters: {}, loading: false };
    this.refreshPage = this.refreshPage.bind(this);
  }

  /**
   * Método responsável por atualizar a página conforme as requisições do formulário
   */
  refreshPage(response) {
    this.setState({
      data: response.data,
      filters: response.filters,
      loading: response.loading,
    });
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

        {data && !isEmptyObject(data) ? (
          <Container fluid>
            <Row>
              <ChartCandidatos
                data={data.espectroPolitico}
                totalCandidatos={data.candidatos}
              />
              <ChartEleitos
                data={data.espectroPolitico}
                totalEleitos={data.eleitos}
              />
            </Row>
            <Row>
              <ChartCandidatosEleitos data={data.espectroPolitico} />
            </Row>
          </Container>
        ) : (
          ''
        )}
      </Dashboard>
    );
  }
}
