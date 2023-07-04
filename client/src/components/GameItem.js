import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@iconify/react';
import './styles/GameItem.css';

const GameItem = (props) => {
  const baseURL = 'http://localhost:3004/api';

  const [isEditable, setIsEditable] = useState(false);
  const [gameName, setGameName] = useState(props.gameName);
  const [gamePrice, setGamePrice] = useState(props.gamePrice);
  const [gameImage, setGameImage] = useState(props.gameImage);

  const updateGame = async () => {
    const response = await fetch(baseURL + '/updateGame', props.game._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameName: gameName,
        gamePrice: gamePrice,
        isAvailable: props.game.isAvailable,
        genreId: props.game.genreId,
        gameDescription: props.game.gameDescription,
        gameImage: props.game.gameImage,
      }),
    });
    const data = await response.json();
    setIsEditable(false);
    props.loadAllGames();
  };

  // return (
  //   <>
  //     {isEditable ? (
  //       <>
  //         <Card style={{ marginTop: 12 }}>
  //           <div style={{ overflow: 'hidden', width: '100%', height: 180 }}>
  //             <Card.Img variant='top' src={props.game.gameImage} />
  //           </div>
  //           <Card.Body>
  //             <Form.Control
  //               type='text'
  //               value={gameName}
  //               onChange={(e) => {
  //                 setGameName(e.target.value);
  //               }}
  //             />
  //             <Form.Control
  //               type='text'
  //               value={gamePrice}
  //               onChange={(e) => {
  //                 setGamePrice(e.target.value);
  //               }}
  //             />

  //             <Container>
  //               <Row>
  //                 <Col>
  //                   <Button variant='info' onClick={() => setIsEditable(!isEditable)}>
  //                     Back
  //                   </Button>
  //                 </Col>
  //                 <Col>
  //                   <Button variant='success' onClick={updateGame}>
  //                     Save
  //                   </Button>
  //                 </Col>
  //               </Row>
  //             </Container>
  //           </Card.Body>
  //         </Card>
  //       </>
  //     ) : (
  //       <>
  //         <Card style={{ marginTop: 12 }}>
  //           <div style={{ overflow: 'hidden', width: '100%', height: 180 }}>
  //             <Card.Img variant='top' src={props.game.gameImage} />
  //           </div>
  //           <Card.Body>
  //             <Card.Title style={{ fontSize: 15 }}>{props.game.gameName}</Card.Title>
  //             <Card.Text>Genre: {props.game.genreId.genreName}</Card.Text>
  //             <Card.Text>
  //               <b style={{ fontSize: 24 }}>${props.game.gamePrice}</b>
  //             </Card.Text>
  //             <Container>
  //               <Row>
  //                 <Col>
  //                   <Button variant='info' onClick={() => setIsEditable(!isEditable)}>
  //                     Edit
  //                   </Button>
  //                 </Col>
  //                 <Col>
  //                   <Button variant='danger' onClick={props.deleteGameClick}>
  //                     Delete
  //                   </Button>
  //                 </Col>
  //               </Row>
  //             </Container>
  //           </Card.Body>
  //         </Card>
  //       </>
  //     )}
  //   </>
  // );

  return (
    <div>
      {isEditable ? (
        <div style={{ color: 'orange' }}>Is Editable</div>
      ) : (
        <div className='card-container'>
          <img className='card-img' src={gameImage} alt='' />
          <div className='card-description'>
            <h5>Name: {gameName}</h5>
            <h5>Price: {gamePrice}$</h5>
          </div>
          <div className='card_info'>
            <div>
              <Icon style={{ margin: 12 }} icon='iconamoon:dislike' /> 12
              <Icon style={{ margin: 12 }} icon='iconamoon:like-light' />
              5310
            </div>
            <div>
              <a className='card-btn' href=''>
                more info
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameItem;
