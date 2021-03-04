import React from 'react';
import { Card } from 'react-bootstrap';
import { numberFormatBr } from '../../../../../includes/Helper';

export default function CanidatosCard(props) {
  const { nome, total, percentual } = props;
  return (
    <Card className="card-candidatos shadow">
      <Card.Body>
        <Card.Title>Candidatos - {nome}</Card.Title>
        <Card.Text className="card-text-number">{numberFormatBr(total)}</Card.Text>
        <Card.Text>{numberFormatBr(percentual)} % dos candidatos</Card.Text>
        <Card.Text>&nbsp;</Card.Text>
      </Card.Body>
    </Card>
  );
}
