import React, { Component } from 'react';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Env from '../../includes/Env';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

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
    const { toggle } = this.state;
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
        {toggle ? children : ''}
      </div>
    );
  }
}
