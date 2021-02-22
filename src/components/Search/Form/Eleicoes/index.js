import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ButtonSubmit from '../../../Form/ButtonSubmit';
import ButtonReset from '../../../Form/ButtonReset';
import Select from '../../../Form/Select';
import Loading from '../../../Form/Loading';
import API from '../../../../includes/Api';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    // Iniciar state
    this.getInitialState();
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
        value: '',
        valueAbrangencia: '',
        valueDefault: '',
      },
      regiao: {
        data: [{ id: '', nome: 'Todas' }],
        dataUF: [],
        disabled: false,
        value: '',
      },
      estado: {
        data: [{ id: '', nome: 'Todos' }],
        disabled: false,
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
        value: '',
        valueDefault: '',
      },
      turno: {
        data: [],
        disabled: false,
        value: '',
        valueDefault: '',
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
        : null,
      espectroPolitico: selectEspectroPolitico
        ? {
            data: [{ id: '', nome: 'Todos' }],
            disabled: false,
            value: '',
          }
        : null,
      cargo: selectCargo
        ? {
            data: [{ id: '', nome: 'Todos' }],
            dataAll: [],
            disabled: false,
            value: '',
          }
        : null,
    };
  }

  /**
   * Método chamado após a renderização do componente
   */
  componentDidMount() {
    const { state } = this;

    if (state.startForm) {
      // this.onLoadFilters();
      this.setState({ startForm: !state.startForm });
    }
  }

  /**
   * Realiza a requisição para carregar os filtros do formulário
   * @returns {Promise<void>}
   */
  async onLoadFilters() {
    const { props, state } = this;
    if (props.urlFilters !== undefined && props.urlFilters !== '') {
      // Efeito loading nos campos do formulário
      state.ano.disabled = true;
      state.regiao.disabled = true;
      state.estado.disabled = true;
      state.turno.disabled = true;
      state.tipoEleicao.disabled = true;

      if (state.partido !== null) {
        state.partido.disabled = true;
      }

      if (state.espectroPolitico !== null) {
        state.espectroPolitico.disabled = true;
      }

      if (state.cargo !== null) {
        state.cargo.disabled = true;
      }

      this.setState(state);

      try {
        // Requisição para carregar os valores dos filtros
        const response = await API.get(props.urlFilters);
        const { data, dataFilter } = response;

        // Atualização dos campos de busca
        state.ano.data = [...data.ano];
        state.ano.disabled = false;
        state.ano.value = dataFilter.ano.id;
        state.ano.valueAbrangencia = dataFilter.ano.abrangencia;
        state.ano.valueDefault = dataFilter.ano;

        this.setState(state);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error('Definir urlFilter');
    }
  }

  render() {
    const { state } = this;
    return (
      <Form role="search">
        <Select
          label="Ano"
          name="input-ano"
          value={state.ano.value}
          disabled={state.ano.disabled}
          data={state.ano.data}
        />
        {state.ano.disabled ? <Loading /> : ''}

        <Select
          label="Região"
          name="input-regiao"
          value={state.regiao.value}
          disabled={state.regiao.disabled}
          data={state.regiao.data}
        />
        {state.regiao.disabled ? <Loading /> : ''}

        <Select
          label="Estado"
          name="input-estado"
          value={state.estado.value}
          disabled={state.estado.disabled}
          data={
            state.regiao.dataUF.length === 0
              ? state.estado.data
              : state.regiao.dataUF
          }
        />
        {state.estado.disabled ? <Loading /> : ''}

        <Select
          label="Município"
          name="input-municipio"
          value={state.municipio.value}
          disabled={state.municipio.disabled}
          data={state.municipio.data}
        />
        {state.municipio.loading ? <Loading /> : ''}

        <Select
          label="Turno"
          name="input-turno"
          value={state.turno.value}
          disabled={state.turno.disabled}
          data={state.turno.data}
        />
        {state.turno.disabled ? <Loading /> : ''}

        <Select
          label="Tipo de Eleição"
          name="input-tipoEleicao"
          value={state.tipoEleicao.value}
          disabled={state.tipoEleicao.disabled}
          data={state.tipoEleicao.data}
        />
        {state.tipoEleicao.disabled ? <Loading /> : ''}

        <Select
          label="Eleição"
          name="input-eleicao"
          value={state.eleicao.value}
          disabled={state.eleicao.disabled}
          data={state.eleicao.data}
        />
        {state.eleicao.loading ? <Loading /> : ''}

        {state.partido !== null ? (
          <Select
            label="Partido"
            name="input-partido"
            value={state.partido.value}
            disabled={state.partido.disabled}
            data={state.partido.data}
          />
        ) : (
          ''
        )}

        {state.partido !== null && state.partido.disabled ? <Loading /> : ''}

        {state.espectroPolitico !== null ? (
          <Select
            label="Espectro Político"
            name="input-espectro"
            value={state.espectroPolitico.value}
            disabled={state.espectroPolitico.disabled}
            data={state.espectroPolitico.data}
          />
        ) : (
          ''
        )}

        {state.espectroPolitico !== null && state.espectroPolitico.disabled ? (
          <Loading />
        ) : (
          ''
        )}

        {state.cargo !== null ? (
          <Select
            label="Cargo"
            name="input-cargo"
            value={state.cargo.value}
            disabled={state.cargo.disabled}
            data={state.cargo.data}
          />
        ) : (
          ''
        )}

        {state.cargo !== null && state.cargo.disabled ? <Loading /> : ''}

        <div className="mt-3">
          <ButtonSubmit
            disabled={state.btnSubmit.disabled}
            loading={state.btnSubmit.loading}
          />
          <ButtonReset
            disabled={state.btnReset.disabled}
            loading={state.btnReset.loading}
          />
        </div>
      </Form>
    );
  }
}
