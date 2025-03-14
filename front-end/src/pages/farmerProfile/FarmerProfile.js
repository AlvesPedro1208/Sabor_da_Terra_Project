import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

import React from 'react';

export const FarmerProfile = () => {
  return (
    <Container fluid='md' >
      <Row className='justify-content-center'>
        <Col className='text-center' xs='8'>
          <Image style={{ height: '15em', borderRadius: '50%', border: '4px solid black'}} src={require('../../assets/farmer.png')} />
        </Col>
      </Row>

      <Row className='justify-content-center' style={{ margin: '3em 0' }}>
        <Col className='text-center' xs='12'>
          <h2 style={{ fontWeight: 'bolder' }}>Gilson Ferreira</h2>
        </Col>
        <Col className='text-center' xs='12'>
          <Image style={{ height: '4em' }} src={require('../../assets/full-star.png')} />
          <Image style={{ height: '4em', margin: '0 .5em' }} src={require('../../assets/full-star.png')} />
          <Image style={{ height: '4em' }} src={require('../../assets/full-star.png')} />
          <Image style={{ height: '4em', margin: '0 .5em' }} src={require('../../assets/full-star.png')} />
          <Image style={{ height: '4em' }} src={require('../../assets/full-star.png')} />
        </Col>
      </Row>

      <Row className='justify-content-center'>
        <Col xs='8' className='d-flex justify-content-center align-items-center'>
          <div style={{ background: 'white', borderRadius: '30px', padding: '.75em', fontSize: '2.5em', textAlign: 'center' }}>
            Agricultor com mais de 20 anos de experiência com produção de milho verde.
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: '2em' }} className='justify-content-center'>
        <Col xs='8' className='d-flex justify-content-center align-items-center'>
          <Button className='button-effect' style={{ background: '#0d522c', border: 'transparent', width: '10em', height: 'auto', fontSize: '2em', borderRadius: '55px' }}>
            Conheça meus produtos
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
