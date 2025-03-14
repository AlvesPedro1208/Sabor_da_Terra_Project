import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
  const { isLogin = false } = props;
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    nome: '',
    password: ''
  });

  return (
    <Container fluid='md' >
      <Row>
        <Col className='text-end' xs='4'>
          <Image src={require('../../assets/logo.png')} />
        </Col>

        <Col xs='8' style={{ position: 'relative' }}>
          <h1 style={{ color: '#0d522c' }}>Sabor da Terra</h1>
          <span style={{ position: 'absolute', top: '2.5em', left: '2em' }}>Agro e Tecnologia lado a lado</span>
        </Col>
      </Row>

      <Row className='justify-content-center' style={{ margin: '3em 0' }}>
        <Col className='text-center' xs='12'>
          <h3 style={{ color: '#0d522c' }}>{ isLogin ? 'Login' : 'Cadastre-se'}</h3>
        </Col>
      </Row>

      <Row className='justify-content-center'>
        <Col xs='8' className='d-flex justify-content-center align-items-center'>
          <Form style={{ width: '100%' }}>
            { !isLogin && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '15%' }}>
                  <Image style={{ height: '3.5em' }} src={require('../../assets/user-icon.png')} />
                </div>
                <div style={{ width: '85%', background: 'white', color: '#0d522c', borderRadius: '30px', border: '1px solid #49688d', padding: '.75em', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                  <input style={{ width: '100%', border: 'none' }} placeholder='Nome' type='text' value={state.nome} onChange={(e) => {
                    setState({ ...state, nome: e.target.value });
                  }} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2em 0' }}>
              <div style={{ width: '15%' }}>
                <Image style={{ height: '3.5em' }} src={require('../../assets/email-icon.png')} />
              </div>
              <div style={{ width: '85%', background: 'white', color: '#0d522c', borderRadius: '30px', border: '1px solid #49688d', padding: '.75em', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <input style={{ width: '100%', border: 'none' }} placeholder='Email' type='text' value={state.email} onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                }} />
              </div>
            </div>

            <div style={isLogin ? { display: 'flex', justifyContent: 'space-between', margin: '2em 0' } : { display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '15%' }}>
                <Image style={{ height: '3.5em' }} src={require('../../assets/password-icon.png')} />
              </div>
              <div style={{ width: '85%', background: 'white', color: '#0d522c', borderRadius: '30px', border: '1px solid #49688d', padding: '.75em', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <input style={{ width: '100%', border: 'none' }} placeholder='Senha' type='password' value={state.password} onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                }} />
              </div>
            </div>
          </Form>
        </Col>
      </Row>

      <Row style={{ marginTop: '2em' }} className='justify-content-center'>
        <Col xs='8' className='d-flex justify-content-center align-items-center'>
          <Button
            className='button-effect' style={{ background: '#0d522c', border: 'transparent', width: '8em', height: '2em', fontSize: '2em', borderRadius: '35px' }}
            onClick={async () => {
              if (isLogin) {
                fetch('http://localhost:8000/login', {
                  method: 'POST',
                  body: JSON.stringify({
                    email: state.email,
                    senha: state.password,
                  })
                })
                .then(response => response.json())
                .then(response => {
                  if (response.status === 'success') {
                    localStorage.setItem('user', state.email);
                    navigate('/home');
                  } else {
                    alert('Credenciais Inválidas');
                  }
                })
                .catch(err => {
                  console.log(`err: isLogin ${isLogin}`, err);
                })
              }
              if (!isLogin) {
                fetch('http://localhost:8000/cadastrar', {
                  method: 'POST',
                  body: JSON.stringify({
                    nome: state.nome,
                    email: state.email,
                    senha: state.password,
                    tipo_usuario: 'usuario',
                  }),
                })
                .then(response => response.json())
                .then(response => {
                  if (response.status === 'success') {
                    navigate('/');
                  } else {
                    alert(`Não foi possível cadastrar o usuário ${state.email}`);
                  }
                })
                .catch(err => {
                  console.log(`err: isLogin ${isLogin}`, err);
                })
              }
              setState({
                email: '',
                password: '',
                nome: '',
              });
            }}
          >
            { isLogin ? 'Login' : 'Cadastrar'}
          </Button>
        </Col>
      </Row>

      { !isLogin && (
        <Row style={{ marginTop: '2em' }} className='justify-content-center'>
          <Col xs='8' className='d-flex justify-content-center align-items-center'>
            <div style={{ width: 'auto' }}>
              <a href='http://localhost:3000/'>Já possuí uma conta?</a>
            </div>
          </Col>
        </Row>
      )}

      { isLogin && (
        <Row style={{ marginTop: '2em' }} className='justify-content-center'>
          <Col xs='8' className='d-flex justify-content-center align-items-center'>
            <div style={{ width: 'auto' }}>
              <a href='http://localhost:3000/cadastro'>Cadastrar-se</a>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};
