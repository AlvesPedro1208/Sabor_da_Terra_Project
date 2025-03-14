import './layout.css';

import { Col, Container, Dropdown, DropdownButton, Image, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Layout = ({ children }) => {
  const path = useLocation().pathname;
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && (path !== '/' && path !== '/cadastro')) {
      navigate('/');
    }
  }, [path, navigate, user]);


  return (
    <Container fluid className='layout-container' style={{ height: '100%' }}>
        <Row className='justify-content-center' style={{ height: '125px', borderRadius: '0 0 20px 20px', zIndex: 2, position: 'relative', background: 'transparent' }}>
      { (path === '/' || path === '/cadastro') ? (<></>) : (
        <>
          <Col className='d-flex justify-content-start align-items-center' xs='4' style={{ position: 'relative' }}>
            {path !== '/' && (
              <>
                <Image style={{ height: '3em', marginTop: '-.75em', marginRight: '.5em' }} src={require('../assets/logo.png')} />
                <h6 style={{ color: '#0d522c' }}>Sabor da Terra</h6>
              </>
            )}
          </Col>
          <Col className='d-flex justify-content-end align-items-center' xs='2'>
            <DropdownButton
              title={<Image style={{ height: '2em'}} src={require('../assets/hamburg-icon.png')}/>} 
              drop="start"
              style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <Dropdown.Item href='/home'>Home</Dropdown.Item>
              <Dropdown.Item href='/farmer-profile'>Produtores</Dropdown.Item>
              <Dropdown.Item href='/kart'>Carrinho</Dropdown.Item>
              <Dropdown.Item href='/' onClick={() => localStorage.clear()}>Desconectar</Dropdown.Item>
            </DropdownButton>
          </Col>
        </>
      )}
        </Row>

      <Row className='justify-content-center' style={{ minHeight: 'calc(100% - 75px)' }}>
        <Col xs='6' className='backgroud-pag'>
          {children}
        </Col>
      </Row>

      <Row className='d-flex justify-content-center'>
        <Col xs='6' className='d-flex justify-content-center align-items-center'>
          <div className='Footer-Item'>
            Saiba Mais
          </div>
        </Col>
      </Row>
    </Container>
  )
};
