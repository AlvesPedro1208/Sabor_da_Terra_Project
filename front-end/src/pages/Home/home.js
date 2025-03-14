import './home.css';
import { Carousel, Card, Col, Container, Image, Row, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';

export const Home = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearchBar = () => {
    setShowSearch(prevState => !prevState);
  };

  return (
    <Container fluid='md'>
      <Row className='justify-content-center'>
        <Col className='div-seach' xs='8'>
          <div className='text-seach'> Pesquisar </div>
          <Image
            className='icon-seach'
            src={require('../../assets/icon-seach.png')}
            onClick={toggleSearchBar} // Chama a função quando o ícone é clicado
          />
          <FormControl
            type="text"
            placeholder="Digite sua pesquisa..."
            className={`search-bar ${showSearch ? 'show' : ''}`} // Alterna a classe CSS para expandir a barra
          />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs='auto'>
            <Carousel variant='dark' className='carousel-slide-carousel-dark'>
             <Carousel.Item>
                <Row className='justify-content-center'>
                  <Col xs={4}>
                    <Card className='group-card'>
                      <Card.Body className='group-card-body'>
                        <Card.Title className='group-card-body-title'>OFERTA ESPECIAL DO DIA</Card.Title>
                        <Card.Subtitle className='group-card-body-subtitle'>Todos os produtos de origem animal com 20% de desconto!!!</Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row className='justify-content-center'>
                  <Col xs={4}>
                    <Card className='group-card'>
                      <Card.Body className='group-card-body'>
                        <Card.Title className='group-card-body-title' id='2'>NOTICIA DA SEMANA</Card.Title>
                        <Card.Subtitle className='group-card-body-subtitle' id='2'>Previsão de chuva para a colheita desse ano!!!</Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row className='justify-content-center'>
                  <Col xs={4}>
                    <Card className='group-card'>
                      <Card.Body className='group-card-body'>
                        <Card.Title className='group-card-body-title' id='3'>NOVIDADE NO SITE</Card.Title>
                        <Card.Subtitle className='group-card-body-subtitle' id='3'>Em breve teremos um chat para vendedor e comprador negociarem!!!</Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col className='div-vegetal-menu' xs='8'>
          <div className='text-vegetal-menu'> Menu Vegetal </div>
          <Image
            className='three-points-icon'
            src={require('../../assets/tres-pontos.png')}
          />
        </Col>
      </Row>
      <Row>
        <Col className='div-item-vegetal-menu' id='1' xs='4'>
            <Card className='card-item-vegetal-menu'>
                <Image className='MilhoVerdeImg' src={require('../../assets/MilhoVerde.jpg')}></Image>
                <div className='text-cad-vegetal-one'>Milho Verde</div>
            </Card>
        </Col>
        <Col className='div-item-vegetal-menu' id='2' xs='4'>
            <Card className='card-item-vegetal-menu'>
                <Image className='feijaoCariocaImg' src={require('../../assets/feijãoCarioca.jpg')}></Image>
                <div className='text-cad-vegetal-two'>Feijão Carioca</div>
            </Card>
        </Col>
        <Col className='div-item-vegetal-menu' id='3' xs='4'>
            <Card className='card-item-vegetal-menu'>
                <Image className='arrozBrancoImg' src={require('../../assets/arrozBranco.jpeg')}></Image>
                <div className='text-cad-vegetal-three'>Arroz Branco</div>
            </Card>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col className='div-animal-menu' xs='8'>
          <div className='text-animal-menu'> Menu Animal </div>
          <Image
            className='three-points-icon'
            src={require('../../assets/tres-pontos.png')}
          />
        </Col>
      </Row>
      <Row>
        <Col className='div-item-animal-menu' xs='4'>
            <Card className='card-item-animal-menu'>
                <Image className='CostelaBovinaImg' src={require('../../assets/OvoCaipira.jpg')}></Image>
                <div className='text-cad-animal-one'>Ovo Caipira</div>
            </Card>
        </Col>
        <Col className='div-item-animal-menu' xs='4'>
            <Card className='card-item-animal-menu'>
                <Image className='OvoCaipiraImg' src={require('../../assets/CostelaBovina.jpg')}></Image>
                <div className='text-cad-animal-two'>Costela Bovina</div>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};
