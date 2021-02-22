import React, { Component } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../Footer';
import Env from '../../includes/Env';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lg: 10,
      md: 9,
      classNameOpen: '',
      openSidebar: true,
      toggle: false,
    };
    this.onOpenSidebar = this.onOpenSidebar.bind(this);
  }

  /**
   * Abrir/Fechar Sidebar (Tablets e Desktop)
   * @param  {Event} e
   */
  onOpenSidebar(e) {
    e.preventDefault();
    let { openSidebar } = this.state;

    const lg = openSidebar ? 12 : 10;
    const md = openSidebar ? 12 : 9;
    const classNameOpen = openSidebar ? 'd-md-none' : '';
    openSidebar = !openSidebar;

    this.setState({ lg, md, classNameOpen, openSidebar });
  }

  /**
   * Renderizar o Breadcrumb da página
   * @returns {[]}
   */
  breadcrumbRender() {
    const { navigation } = this.props;
    const breadcrumb = [];

    breadcrumb.push(
      <Breadcrumb.Item key={0} href="/" title={Env.name}>
        <FontAwesomeIcon icon={['fas', 'home']} />
      </Breadcrumb.Item>
    );

    navigation.forEach((item) => {
      if (item.active) {
        breadcrumb.push(
          <Breadcrumb.Item key={item.key} aria-current="page" active>
            {item.name}
          </Breadcrumb.Item>
        );
      } else if (item.href) {
        breadcrumb.push(
          <Breadcrumb.Item key={item.key} href={item.href} title={item.name}>
            {item.name}
          </Breadcrumb.Item>
        );
      } else {
        breadcrumb.push(
          <Breadcrumb.Item className="text-primary" key={item.key}>
            {item.name}
          </Breadcrumb.Item>
        );
      }
    });

    return breadcrumb;
  }

  render() {
    const { title, icon, children } = this.props;
    const { lg, md, classNameOpen, openSidebar, toggle } = this.state;
    return (
      <div className="box">
        <Container /* Cabeçalho */
          as="header"
          className="border-bottom pt-2 pb-2"
          fluid
          role="heading"
        >
          <Row className="align-items-md-center">
            <Col md={6} className="d-none d-md-flex">
              <h3 className="mb-0 text-primary">
                <FontAwesomeIcon icon={icon} />
                &nbsp;
                {title}
              </h3>
            </Col>
            <Col md={6}>
              <Breadcrumb className="float-md-right">
                {this.breadcrumbRender()}
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <div className="wrapper">
          <Row className="ml-0 mr-0 h-100">
            {/* Sidebar */}
            <Col md={3} lg={2} className={`pl-0 pr-0 sidebar ${classNameOpen}`}>
              {/* Fechar Sidebar */}
              <div className="clearfix d-none d-md-block">
                <Button
                  className="btn-sidebar-close float-right"
                  variant="link"
                  aria-label="Fechar Barra Lateral"
                  title="Fechar Barra Lateral"
                  onClick={this.onOpenSidebar}
                >
                  <FontAwesomeIcon icon={['fas', 'times']} />
                </Button>
              </div>
            </Col>
            <Col as="main" md={md} lg={lg} className="pl-0 pr-0">
              {/* Abrir Sidebar */}
              {!openSidebar ? (
                <div className="d-none d-md-block">
                  <Button
                    className="btn-sidebar-open"
                    variant="link"
                    aria-label="Abrir Barra Laterar"
                    title="Abrir Barra Laterar"
                    onClick={this.onOpenSidebar}
                  >
                    <FontAwesomeIcon icon={['fas', 'bars']} />
                  </Button>
                </div>
              ) : (
                ''
              )}

              {toggle ? children : ''}
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}
