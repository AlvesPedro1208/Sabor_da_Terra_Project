import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import React from 'react';

export const CartPage = () => {
    return (
        <Container fluid='md'>
            {/* Header */}
            <Row className='align-items-center' style={{ marginBottom: '2em' }}>
                <Col xs='2' className='text-start'>
                    <Image
                        src={require('../../assets/shoppingCart.png')}
                        alt='Logo Placeholder'
                        style={{ height: '15em', width: '15em', marginLeft: '2em' }} // Ajustar para aumentar a largura e altura
                    />
                </Col>

                <Col xs='10'>
                    <h1 style={{ color: '#0d522c', marginLeft: '3em' }}>Carrinho de Compras</h1>
                </Col>
            </Row>

            {/* Lista de Produtos no Carrinho */}
            <Row className='justify-content-center'>
                <Col xs='8' className='d-flex justify-content-between align-items-center' style={{ background: 'white', padding: '1em', borderRadius: '30px', marginBottom: '1em', border: '1px solid #49688d' }}>
                    <Image src={require('../../assets/arrozBranco.jpeg')} alt='Produto Placeholder' style={{ height: '4em', borderRadius: '10px' }} />
                    <span style={{ fontSize: '1.5em', color: '#0d522c' }}>Arroz Branco</span>
                    <span style={{ fontSize: '1.5em', color: '#0d522c' }}>R$ 10,00</span>
                    <Button style={{ background: 'transparent', border: 'none', color: 'red' }}>Remover</Button>
                </Col>

                <Col xs='8' className='d-flex justify-content-between align-items-center' style={{ background: 'white', padding: '1em', borderRadius: '30px', marginBottom: '1em', border: '1px solid #49688d' }}>
                    <Image src={require('../../assets/feijãoCarioca.jpg')} alt='Feijão Carioca' style={{ height: '4em', borderRadius: '10px' }} />
                    <span style={{ fontSize: '1.5em', color: '#0d522c' }}>Feijão Carioca</span>
                    <span style={{ fontSize: '1.5em', color: '#0d522c' }}>R$ 8,00</span>
                    <Button style={{ background: 'transparent', border: 'none', color: 'red' }}>Remover</Button>
                </Col>
            </Row>

            {/* Resumo da Compra */}
            <Row className='justify-content-center' style={{ marginTop: '2em' }}>
                <Col xs='8' className='d-flex justify-content-between align-items-center' style={{ background: 'white', padding: '1em', borderRadius: '30px', border: '1px solid #49688d' }}>
                    <span style={{ fontSize: '1.5em', color: '#0d522c' }}>Total</span>
                    <span style={{ fontSize: '1.5em', color: '#0d522c' }}>R$ 18,00</span>
                </Col>
            </Row>

            {/* Botões */}
            <Row style={{ marginTop: '3em' }} className='justify-content-center'>
                <Col xs='8' className='d-flex justify-content-center align-items-center'>
                    <Button className='button-effect' style={{ background: '#0d522c', border: 'transparent', width: '12em', height: '3em', fontSize: '1.5em', borderRadius: '35px', marginRight: '1em' }}>
                        Finalizar Compra
                    </Button>
                    <Button className='button-effect' style={{ background: 'transparent', border: '2px solid #0d522c', width: '12em', height: '3em', fontSize: '1.5em', borderRadius: '35px', color: '#0d522c' }}>
                        Continuar Comprando
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};
