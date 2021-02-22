import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

function Option(props) {
  const { value, name } = props;
  return <option value={value}>{name}</option>;
}

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    const { onChange, onLoad } = this.props;

    onChange(e.target.value);

    if (onLoad !== undefined && onLoad !== null) {
      onLoad(e.target.value);
    }
  }

  renderOptions() {
    const options = [];
    const { data } = this.props;

    data.forEach((item) => {
      options.push(<Option key={item.id} value={item.id} name={item.nome} />);
    });

    return options;
  }

  render() {
    const { disabled, label, name, value } = this.props;

    return (
      <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="select"
          name={name}
          value={value}
          disabled={disabled}
          custom
          onChange={this.handleChange}
        >
          {this.renderOptions()}
        </Form.Control>
      </Form.Group>
    );
  }
}
