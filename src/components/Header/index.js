import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

import Env from '../../includes/Env';
import logo from '../../assets/images/logo72.png';

export default function () {
  return (
    <Navbar
      className="flex-md-nowrap p-1 shadow"
      bg="primary"
      expand="md"
      variant="dark"
      role="navigation"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="pl-2 pl-md-0">
          <img
            src={logo}
            className="d-inline-block"
            height={30}
            width={30}
            alt={Env.name}
          />
          &nbsp;&nbsp;{Env.name}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
