import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonSubmit = (props) => {
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
    btnContent.push('\u00A0\u00A0PESQUISANDO...');
  } else {
    btnContent.push(<FontAwesomeIcon key={0} icon={['fas', 'search']} />);
    btnContent.push('\u00A0\u00A0PESQUISAR');
  }

  return (
    <Button variant="success" type="submit" disabled={disabled} block>
      {btnContent}
    </Button>
  );
};

export default ButtonSubmit;
