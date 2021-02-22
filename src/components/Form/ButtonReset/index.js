import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonReset = (props) => {
  const { disabled, loading } = props;
  const btnContent = [];

  if (loading) {
    btnContent.push(
      <Spinner
        key={0}
        aria-hidden="true"
        animation="border"
        role="status"
        size="sm"
      />
    );
    btnContent.push('\u00A0\u00A0LIMPANDO...');
  } else {
    btnContent.push(<FontAwesomeIcon key={0} icon={['fas', 'times']} />);
    btnContent.push('\u00A0\u00A0LIMPAR');
  }

  return (
    <Button variant="secondary" type="reset" block disabled={disabled}>
      {btnContent}
    </Button>
  );
};

export default ButtonReset;
