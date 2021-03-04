import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ButtonSubmit from '../../../Form/ButtonSubmit';
import ButtonReset from '../../../Form/ButtonReset';
import Select from '../../../Form/Select';
import Loading from '../../../Form/Loading';
import API from '../../../../includes/Api';
import {
  isEleicaoMunicipal,
  isEleicaoSuplementar,
  isEmptyArray,
  isEmptyObject,
  isEmptyValue,
  searchDataNome,
  selectDataCargo,
  selectDataEstadoRegiao,
} from '../../../../includes/Helper';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    // Iniciar state
    this.getInitialState();

    // Métodos de controle do formulário
    this.handleChangeAno = this.handleChangeAno.bind(this);
    this.handleChangeRegiao = this.handleChangeRegiao.bind(this);
    this.handleChangeEstado = this.handleChangeEstado.bind(this);
    this.handleChangeMunicipio = this.handleChangeMunicipio.bind(this);
    this.handleChangeTurno = this.handleChangeTurno.bind(this);
    this.handleChangeTipoEleicao = this.handleChangeTipoEleicao.bind(this);
    this.handleChangeEleicao = this.handleChangeEleicao.bind(this);
    this.handleChangePartido = this.handleChangePartido.bind(this);
    this.handleChangeEspectro = this.handleChangeEspectro.bind(this);
    this.handleChangeCargo = this.handleChangeCargo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  /**
   * Iniciar o objeto state
   */
  getInitialState() {
    const { selectCargo, selectPartido, selectEspectroPolitico } = this.props;
    this.state = {
      startForm: true,
      btnReset: { disabled: false, loading: false },
      btnSubmit: { disabled: false, loading: false },
      ano: {
        data: [],
        disabled: false,
        objectDefault: '',
        value: '',
      },
      abrangencia: '',
      regiao: {
        data: [{ id: '', nome: 'Todas' }],
        dataEstados: [],
        disabled: false,
        value: '',
      },
      estado: {
        data: [{ id: '', nome: 'Todos' }],
        disabled: false,
        object: '',
        value: '',
      },
      municipio: {
        data: [{ id: '', nome: 'Todos' }],
        disabled: true,
        loading: false,
        onLoad: false,
        value: '',
      },
      tipoEleicao: {
        data: [],
        disabled: false,
        objectDefault: '',
        value: '',
      },
      turno: {
        data: [],
        disabled: false,
        objectDefault: '',
        value: '',
      },
      eleicao: {
        data: [{ id: '', nome: 'Todas' }],
        disabled: true,
        loading: false,
        value: '',
      },
      partido: selectPartido
        ? {
            data: [{ id: '', nome: 'Todos' }],
            disabled: false,
            value: '',
          }
        : {},
      espectroPolitico: selectEspectroPolitico
        ? {
            data: [{ id: '', nome: 'Todos' }],
            disabled: false,
            value: '',
          }
        : {},
      cargo: selectCargo
        ? {
            data: [{ id: '', nome: 'Todos' }],
            dataAll: [],
            disabled: false,
            value: '',
          }
        : {},
    };
  }

  /**
   * Método chamado após a renderização do componente
   */
  componentDidMount() {
    const { state } = this;

    // Carregar formulário com as opções e dados padrões
    if (state.startForm) {
      this.onLoadFilters();
      state.startForm = false;
      this.setState(state);
    }
  }

  /**
   * Atualização do campo Ano
   * @param {String} valueSelected
   */
  handleChangeAno(valueSelected) {
    const { state } = this;

    state.ano.value = isEmptyValue(valueSelected)
      ? state.ano.objectDefault.id
      : parseInt(valueSelected, 10);

    this.setState(state);

    // Limpar demais campos
    this.setDefault();
  }

  /**
   * Atualização do campo Região
   * @param {String} valueSelected
   */
  handleChangeRegiao(valueSelected) {
    const { state } = this;
    state.regiao.value = isEmptyValue(valueSelected)
      ? ''
      : parseInt(valueSelected, 10);

    const { data, value } = state.regiao;
    // Carregar os estados da região
    let dataEstados = [];
    if (!isEmptyValue(value)) {
      dataEstados = selectDataEstadoRegiao(data, value);
    }
    state.regiao.dataEstados = dataEstados;
    state.estado.value = '';

    // Atualizar as opções de cargos
    if (!isEmptyObject(state.cargo)) {
      const { dataAll } = state.cargo;
      const { abrangencia } = state;
      state.cargo.data = selectDataCargo(dataAll, abrangencia, value);
    }

    this.setState(state);
  }

  /**
   * Atualização do campo Estado
   * @param {String} valueSelected
   */
  handleChangeEstado(valueSelected) {
    const { state } = this;
    state.estado.value = isEmptyValue(valueSelected) ? '' : valueSelected;

    const { data, value } = state.estado;

    if (!isEmptyValue(value) && isEmptyValue(state.regiao.value)) {
      // Selecinonar a região do estado
      data.forEach((item) => {
        if (item.id === value) state.regiao.value = item.regiao.id;
      });

      // Somente os estados da região
      const { regiao } = state;
      state.regiao.dataEstados = selectDataEstadoRegiao(
        regiao.data,
        regiao.value
      );
    }

    // Atualizar as opções de cargos
    if (!isEmptyObject(state.cargo)) {
      const { dataAll } = state.cargo;
      const { abrangencia } = state;
      state.cargo.data = selectDataCargo(dataAll, abrangencia, value);
    }

    this.setState(state);

    // Carregar municípios do estado
    if (state.municipio.onLoad) this.onLoadMunicipio(value);
  }

  /**
   * Atualização do campo Município
   * @param {String} value
   */
  handleChangeMunicipio(value) {
    const { state } = this;
    state.municipio.value = isEmptyValue(value) ? '' : parseInt(value, 10);

    this.setState(state);
  }

  /**
   * Atualização do campo Turno
   * @param {String} value
   */
  handleChangeTurno(value) {
    const { state } = this;
    state.turno.value = isEmptyValue(value)
      ? state.turno.objectDefault.id
      : parseInt(value, 10);

    this.setState(state);
  }

  /**
   * Atualização do campo Tipo de Eleição
   * @param {String} value
   */
  handleChangeTipoEleicao(value) {
    const { state } = this;
    state.tipoEleicao.value = isEmptyValue(value)
      ? state.tipoEleicao.objectDefault.id
      : parseInt(value, 10);

    this.setState(state);

    // Carregar Eleição
    this.onLoadEleicao(value);
  }

  /**
   * Atualização do campo Eleição
   * @param {String} value
   */
  handleChangeEleicao(value) {
    const { state } = this;
    state.eleicao.value = isEmptyValue(value) ? '' : parseInt(value, 10);

    this.setState(state);
  }

  /**
   * Atualização do campo Partido
   * @param {String} value
   */
  handleChangePartido(value) {
    const { state } = this;
    state.partido.value = isEmptyValue(value) ? '' : parseInt(value, 10);

    this.setState(state);
  }

  /**
   * Atualização do campo Espectro Político
   * @param {String} value
   */
  handleChangeEspectro(value) {
    const { state } = this;
    state.espectroPolitico.value = isEmptyValue(value)
      ? ''
      : parseInt(value, 10);

    this.setState(state);
  }

  /**
   * Atualização do campo Cargo
   * @param {String} value
   */
  handleChangeCargo(value) {
    const { state } = this;
    state.cargo.value = isEmptyValue(value) ? '' : parseInt(value, 10);

    this.setState(state);
  }

  /**
   * Requisição do formuluário
   * @param {Event} event
   */
  handleSubmit(event) {
    event.preventDefault();

    // Desabilitar botões
    this.setState({
      btnSubmit: { disabled: true, loading: true },
      btnReset: { disabled: true, loading: false },
    });

    // Carregar a busca
    this.onLoadSearch();
  }

  /**
   * Limpar os campos do formulário
   * @param  {Event} event
   */
  handleReset(event) {
    event.preventDefault();

    // Setar os campos com seus valores padrões
    this.setDefault(true);

    // Requisição com os campos de busca padrão
    this.onLoadSearch();
  }

  /**
   * Realiza a requisição para carregar os filtros do formulário
   * @returns {Promise<void>}
   */
  async onLoadFilters() {
    const { props, state } = this;
    if (!isEmptyValue(props.urlFilters)) {
      // Efeito loading nos campos do formulário
      state.ano.disabled = true;
      state.regiao.disabled = true;
      state.estado.disabled = true;
      state.turno.disabled = true;
      state.tipoEleicao.disabled = true;

      if (!isEmptyObject(state.partido)) state.partido.disabled = true;

      if (!isEmptyObject(state.espectroPolitico))
        state.espectroPolitico.disabled = true;

      if (!isEmptyObject(state.cargo)) state.cargo.disabled = true;

      this.setState(state);

      try {
        // Requisição para carregar os valores dos filtros
        const response = await API.get(props.urlFilters);
        const { data, dataFilter } = response.data;

        // Atualização dos campos de busca
        state.ano.data = [...data.ano];
        state.ano.disabled = false;
        state.ano.objectDefault = dataFilter.ano;
        state.ano.value = dataFilter.ano.id;

        state.abrangencia = dataFilter.ano.abrangencia;

        state.regiao.data = [{ id: '', nome: 'Todas' }, ...data.regiao];
        state.regiao.disabled = false;

        state.estado.data = [{ id: '', nome: 'Todos' }, ...data.estado];
        state.estado.disabled = false;

        state.municipio.onLoad = isEleicaoMunicipal(state.abrangencia);

        state.turno.data = [...data.turno];
        state.turno.disabled = false;
        state.turno.objectDefault = dataFilter.turno;
        state.turno.value = dataFilter.turno.id;

        state.tipoEleicao.data = [...data.tipoEleicao];
        state.tipoEleicao.disabled = false;
        state.tipoEleicao.objectDefault = dataFilter.tipoEleicao;
        state.tipoEleicao.value = dataFilter.tipoEleicao.id;

        if (!isEmptyObject(state.partido)) {
          state.partido.data = [{ id: '', nome: 'Todos' }, ...data.partido];
          state.partido.disabled = false;
        }

        if (!isEmptyObject(state.espectroPolitico)) {
          state.espectroPolitico.data = [
            { id: '', nome: 'Todos' },
            ...data.espectroPolitico,
          ];
          state.espectroPolitico.disabled = false;
        }

        if (!isEmptyObject(state.cargo)) {
          state.cargo.data = selectDataCargo(data.cargo, state.abrangencia);
          state.cargo.dataAll = data.cargo;
          state.cargo.disabled = false;
        }

        this.setState(state);
      } catch (e) {
        console.error(e);
      }

      await this.onLoadSearch();
    } else {
      console.error('Definir urlFilter');
    }
  }

  /**
   * Carregar todos os municípios de um estado
   * @param UF
   */
  onLoadMunicipio(UF) {
    const { municipio } = this.state;
    if (UF !== '') {
      this.setState(
        { municipio: { ...municipio, disabled: true, loading: true } },
        () => {
          API.get(`localidades/estados/${UF}/municipios`)
            .then((response) =>
              this.setState({
                municipio: {
                  ...municipio,
                  data: [{ id: '', nome: 'Todos' }, ...response.data.data],
                  disabled: false,
                  loading: false,
                },
              })
            )
            .catch((error) => {
              console.error(error);
            });
        }
      );
    } else {
      this.setState({
        municipio: {
          ...municipio,
          data: [{ id: '', nome: 'Todos' }],
          disabled: true,
          loading: false,
        },
      });
    }
  }

  /**
   * Carrega os dados do campo Eleição
   * @param {Number} tipoEleicaoId
   */
  onLoadEleicao(tipoEleicaoId) {
    if (isEleicaoSuplementar(tipoEleicaoId)) {
      // Parâmetros da busca
      const params = this.setParams();

      // Remover parâmetros não tilizados
      delete params.cargo;
      delete params.eleicao;
      delete params.partido;

      const { eleicao } = this.state;

      this.setState(
        { eleicao: { ...eleicao, disabled: true, loading: true } },
        () => {
          API.get('eleicoes', { params })
            .then((response) =>
              this.setState({
                eleicao: {
                  ...eleicao,
                  data: [{ id: '', nome: 'Todas' }, ...response.data.data],
                  disabled: false,
                  loading: false,
                },
              })
            )
            .catch((error) => {
              console.error(error);
            });
        }
      );
    } else {
      this.setState({
        eleicao: {
          data: [{ id: '', nome: 'Todas' }],
          disabled: true,
          loading: false,
        },
      });
    }
  }

  /**
   * Requisição na API com base nos filtros do formulário
   * @returns {Promise<void>}
   */
  async onLoadSearch() {
    const { onRefresh, urlSearch } = this.props;
    // Atualizar página antes da requisição
    onRefresh({ loading: true });
    try {
      // Parâmetros da requisição
      const params = this.setParams();

      // Requisição de busca
      const response = await API.get(urlSearch, { params });

      onRefresh({
        data: response.data,
        filters: this.setFilters(),
        loading: false,
      });

      // Habilitar os botões
      this.setState({
        btnReset: { disabled: false, loading: false },
        btnSubmit: { disabled: false, loading: false },
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Atualiza o campos do formulário com seus valores padrões
   * @param defaultAno
   */
  setDefault(defaultAno = false) {
    const { state } = this;

    if (defaultAno) {
      state.ano.value = state.ano.objectDefault.id;
    }

    // Atualizar a abrangência
    const { value, data } = state.ano;
    data.forEach((item) => {
      if (item.id === value) state.abrangencia = item.abrangencia;
    });

    state.regiao.value = '';
    state.regiao.dataEstados = [];

    state.estado.value = '';

    state.municipio.data = [{ id: '', nome: 'Todos' }];
    state.municipio.value = '';
    state.municipio.disabled = true;
    state.municipio.onLoad = isEleicaoMunicipal(state.abrangencia);

    state.turno.value = state.turno.objectDefault.id;

    state.tipoEleicao.value = state.tipoEleicao.objectDefault.id;

    state.eleicao.value = '';
    state.eleicao.data = [{ id: '', nome: 'Todas' }];
    state.eleicao.disabled = true;

    if (!isEmptyObject(state.partido)) state.partido.value = '';

    if (!isEmptyObject(state.espectroPolitico))
      state.espectroPolitico.value = '';

    if (!isEmptyObject(state.cargo)) {
      const { dataAll } = state.cargo;
      state.cargo.data = selectDataCargo(dataAll, state.abrangencia);
      state.cargo.value = '';
    }

    // Dabilitar botões
    if (defaultAno) {
      state.btnSubmit.disabled = true;
      state.btnSubmit.loading = false;
      state.btnReset.disabled = true;
      state.btnReset.loading = true;
    }

    this.setState(state);
  }

  /**
   * Obter os valores do filtro de busca
   * @returns {{}}
   */
  setFilters() {
    const { state } = this;
    const { selectCargo, selectEspectroPolitico, selectPartido } = this.props;
    const filters = {
      ano: state.ano.value,
    };

    const { turno } = state;
    filters.turno = searchDataNome(turno.data, turno.value);

    const { tipoEleicao } = state;
    filters.tipoEleicao = searchDataNome(tipoEleicao.data, tipoEleicao.value);

    const { regiao } = state;
    if (!isEmptyValue(state.regiao.value)) {
      filters.regiao = searchDataNome(regiao.data, regiao.value);
    } else {
      filters.regiao = 'Todas';
    }

    const { estado } = state;
    if (!isEmptyValue(state.estado.value)) {
      filters.estado = searchDataNome(estado.data, estado.value);
    } else {
      filters.estado = 'Todos';
    }

    const { municipio } = state;
    if (municipio.onLoad) {
      if (!isEmptyValue(municipio.value)) {
        filters.municipio = searchDataNome(municipio.data, municipio.value);
      } else {
        filters.municipio = 'Todos';
      }
    }

    const { eleicao } = state;
    if (!isEmptyValue(eleicao.value)) {
      filters.eleicao = searchDataNome(eleicao.data, eleicao.value);
    } else {
      filters.eleicao = 'Todas';
    }

    if (selectPartido) {
      const { data, value } = state.partido;
      if (!isEmptyValue(value)) filters.partido = searchDataNome(data, value);
      else filters.partido = 'Todos';
    }

    if (selectEspectroPolitico) {
      const { data, value } = state.espectroPolitico;
      if (!isEmptyValue(value))
        filters.espectroPolitico = searchDataNome(data, value);
      else filters.espectroPolitico = 'Todos';
    }

    if (selectCargo) {
      const { data, value } = state.cargo;
      if (!isEmptyValue(value)) filters.cargo = searchDataNome(data, value);
      else filters.cargo = 'Todos';
    }

    return filters;
  }

  /**
   * Obter os parâmetros de busca
   * @returns {{}}
   */
  setParams() {
    const { state } = this;
    const params = {};

    params.ano = state.ano.value;
    params.turno = state.turno.value;
    params.tipoEleicao = state.tipoEleicao.value;

    if (!isEmptyValue(state.regiao.value)) {
      params.regiao = state.regiao.value;
    }

    if (!isEmptyValue(state.estado.value)) {
      params.estado = state.estado.value;
    }

    if (!isEmptyValue(state.municipio.value)) {
      params.municipio = state.municipio.value;
    }

    if (!isEmptyValue(state.eleicao.value)) {
      params.eleicao = state.eleicao.value;
    }

    if (!isEmptyObject(state.partido) && !isEmptyValue(state.partido.value)) {
      params.partido = state.partido.value;
    }

    if (
      !isEmptyObject(state.espectroPolitico) &&
      !isEmptyValue(state.espectroPolitico.value)
    ) {
      params.espectroPolitico = state.espectroPolitico.value;
    }

    if (!isEmptyObject(state.cargo) && !isEmptyValue(state.cargo.value)) {
      params.cargo = state.cargo.value;
    }

    return params;
  }

  render() {
    const {
      ano,
      regiao,
      estado,
      municipio,
      tipoEleicao,
      turno,
      eleicao,
      partido,
      espectroPolitico,
      cargo,
      btnReset,
      btnSubmit,
    } = this.state;
    return (
      <Form
        role="search"
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
      >
        <Select
          label="Ano"
          name="input-ano"
          value={ano.value}
          disabled={ano.disabled}
          data={ano.data}
          onChange={this.handleChangeAno}
        />
        {ano.disabled ? <Loading /> : ''}

        <Select
          label="Região"
          name="input-regiao"
          value={regiao.value}
          disabled={regiao.disabled}
          data={regiao.data}
          onChange={this.handleChangeRegiao}
        />
        {regiao.disabled ? <Loading /> : ''}

        <Select
          label="Estado"
          name="input-estado"
          value={estado.value}
          disabled={estado.disabled}
          data={
            isEmptyArray(regiao.dataEstados) ? estado.data : regiao.dataEstados
          }
          onChange={this.handleChangeEstado}
        />
        {estado.disabled ? <Loading /> : ''}

        {municipio.onLoad ? (
          <Select
            label="Município"
            name="input-municipio"
            value={municipio.value}
            disabled={municipio.disabled}
            data={municipio.data}
            onChange={this.handleChangeMunicipio}
          />
        ) : (
          ''
        )}

        {municipio.onLoad && municipio.loading ? <Loading /> : ''}

        <Select
          label="Turno"
          name="input-turno"
          value={turno.value}
          disabled={turno.disabled}
          data={turno.data}
          onChange={this.handleChangeTurno}
        />
        {turno.disabled ? <Loading /> : ''}

        <Select
          label="Tipo de Eleição"
          name="input-tipoEleicao"
          value={tipoEleicao.value}
          disabled={tipoEleicao.disabled}
          data={tipoEleicao.data}
          onChange={this.handleChangeTipoEleicao}
        />
        {tipoEleicao.disabled ? <Loading /> : ''}

        <Select
          label="Eleição"
          name="input-eleicao"
          value={eleicao.value}
          disabled={eleicao.disabled}
          data={eleicao.data}
          onChange={this.handleChangeEleicao}
        />
        {eleicao.loading ? <Loading /> : ''}

        {!isEmptyObject(cargo) ? (
          <Select
            label="Cargo"
            name="input-cargo"
            value={cargo.value}
            disabled={cargo.disabled}
            data={cargo.data}
            onChange={this.handleChangeCargo}
          />
        ) : (
          ''
        )}

        {!isEmptyObject(cargo) && cargo.disabled ? <Loading /> : ''}

        {!isEmptyObject(partido) ? (
          <Select
            label="Partido"
            name="input-partido"
            value={partido.value}
            disabled={partido.disabled}
            data={partido.data}
            onChange={this.handleChangePartido}
          />
        ) : (
          ''
        )}

        {!isEmptyObject(partido) && partido.disabled ? <Loading /> : ''}

        {!isEmptyObject(espectroPolitico) ? (
          <Select
            label="Espectro Político"
            name="input-espectro"
            value={espectroPolitico.value}
            disabled={espectroPolitico.disabled}
            data={espectroPolitico.data}
            onChange={this.handleChangeEspectro}
          />
        ) : (
          ''
        )}

        {!isEmptyObject(espectroPolitico) && espectroPolitico.disabled ? (
          <Loading />
        ) : (
          ''
        )}

        <div className="mt-3">
          <ButtonSubmit
            disabled={btnSubmit.disabled}
            loading={btnSubmit.loading}
          />
          <ButtonReset
            disabled={btnReset.disabled}
            loading={btnReset.loading}
          />
        </div>
      </Form>
    );
  }
}
