import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ButtonSubmit from '../../../Form/ButtonSubmit';
import ButtonReset from '../../../Form/ButtonReset';

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
    this.state = {
      startForm: true,
      btnReset: { disabled: false, loading: false },
      btnSubmit: { disabled: false, loading: false },
    };
  }

  /**
   * Método chamado após a renderização do componente
   */
  componentDidMount() {
    const { state } = this;

    if (state.startForm) {
      this.setState({ startForm: !state.startForm });
    }
  }

  render() {
    const { state } = this;
    return (
      <Form role="search">
        <ButtonSubmit
          disabled={state.btnSubmit.disabled}
          loading={state.btnSubmit.loading}
        />
        <ButtonReset
          disabled={state.btnReset.disabled}
          loading={state.btnReset.loading}
        />
      </Form>
    );
  }
}
