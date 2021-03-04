import React from 'react';
import { Card } from 'react-bootstrap';
import { numberFormatBr } from '../../../../../includes/Helper';

export default function EleitosCard(props) {
  const { nome, total, percentual, percentualEspectro } = props;
  return (
    <Card className="card-eleitos shadow">
      <Card.Body className="text-center">
        <Card.Title>ELEITOS - {nome}</Card.Title>
        <Card.Text className="card-text-number">
          {numberFormatBr(total)}
        </Card.Text>
        <Card.Text>
          {numberFormatBr(percentualEspectro)} % dos candidatos foram eleitos
        </Card.Text>
        <Card.Text>
          {numberFormatBr(percentual)} % dos candidatos eleitos
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
