import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner
        animation="border"
        variant="primary"
        className="search-spinner"
        role="status"
      />
      <span className="search-spinner-text">Carregando...</span>
    </div>
  );
}
