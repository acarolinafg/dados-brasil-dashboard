import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" label="MENU" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto pl-2 pl-md-0">
            <Nav.Link href="/eleicoes/espectro-politico">
              Espectro Político
            </Nav.Link>
            <Nav.Link href="/eleicoes/partidos">Partidos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
