import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function () {
  return (
    <div className="mt-n2 mb-1">
      <Spinner
        className="spn-form"
        animation="border"
        role="status"
        variant="primary"
        size="sm"
      />
      <span className="text-primary ml-1">Carregando...</span>
    </div>
  );
}
