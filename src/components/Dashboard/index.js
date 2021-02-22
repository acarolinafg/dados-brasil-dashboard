import React, { Component } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Env from '../../includes/Env';
import Footer from '../Footer';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSidebar: true,
      toggle: false,
    };
    this.onOpenSidebar = this.onOpenSidebar.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  /**
   * Abrir/Fechar Sidebar (Tablets e Desktop)
   * @param  {Event} e
   */
  onOpenSidebar(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      openSidebar: !state.openSidebar,
    }));
  }

  /**
   * Abrir/Fechar Sidebar (Smartphones)
   * @param  {Event} e
   */
  onToggle(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      toggle: !state.toggle,
    }));
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
    const { title, icon, children, sidebar, filters } = this.props;
    const { openSidebar, toggle } = this.state;

    const lg = openSidebar ? 10 : 12;
    const md = openSidebar ? 9 : 12;
    const classNameOpen = openSidebar ? '' : 'd-md-none';

    const classNameToggle = toggle ? 'd-block' : 'd-none';
    const labelToggle = toggle ? 'Fechar formulário' : 'Abrir formulário';

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

              {/* Toggle Sidebar  */}
              <div className="d-block d-md-none">
                <Button
                  className="text-uppercase"
                  variant="primary"
                  aria-label={labelToggle}
                  title={labelToggle}
                  block
                  onClick={this.onToggle}
                >
                  <FontAwesomeIcon icon={['fas', 'bars']} /> &nbsp;&nbsp;
                  {labelToggle}
                </Button>
              </div>

              {/* Formulário de busca */}
              <div className={`${classNameToggle} d-md-block search-form`}>
                {sidebar !== undefined ? sidebar : ''}
              </div>
            </Col>
            <Col as="main" md={md} lg={lg} className="pl-0 pr-0">
              {/* Abrir Sidebar */}
              {!openSidebar ? (
                <div className="d-none d-md-block">
                  <Button
                    className="btn-sidebar-open"
                    variant="link"
                    aria-label="Abrir Barra Lateral"
                    title="Abrir Barra Lateral"
                    onClick={this.onOpenSidebar}
                  >
                    <FontAwesomeIcon icon={['fas', 'bars']} />
                  </Button>
                </div>
              ) : (
                ''
              )}

              {/* Filtros de busca */}
              {filters !== undefined ? (
                <Row>
                  <Col className={openSidebar ? 'mt-2 mb-2' : 'mb-2'}>
                    {filters}
                  </Col>
                </Row>
              ) : (
                ''
              )}

              {/* Conteúdo da página */}
              <Row className="ml-0 mr-0">
                <Col className="pl-0 pr-0" xs={12}>
                  {children}
                </Col>
                <Col
                  className="pl-0 pr-0 footer-dashboard d-none d-md-block"
                  md={12}
                >
                  <Footer />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Footer classFooter="d-md-none" />
      </div>
    );
  }
}
