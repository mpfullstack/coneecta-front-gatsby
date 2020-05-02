import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Container, Row, Col } from 'react-bootstrap';

import './redux.css';

export default () => {
  return (
    <Provider store={store()}>
      <h1>Redux Gatsby</h1>
      <Container>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={6}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            xs lg="2"
          </Col>
          <Col md="auto">Variable width content</Col>
          <Col xs lg="2" xl="6">
            xs lg="2"  xl="6"
          </Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col md="auto">Variable width content</Col>
          <Col lg="2">
            xs lg="2"
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="2">
            xs="8"
          </Col>
          <Col xs="4" lg="2" xl="6">
            xs="4" lg="2" xl="6"
          </Col>
        </Row>
      </Container>
    </Provider>
  );
};