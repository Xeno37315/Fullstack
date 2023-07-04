import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@iconify/react';
import './styles/GameItem.css';

const GameItem = (props) => {
  const baseURL = 'http://localhost:3004/api';

  const [isEditable, setIsEditable] = useState(true);
  const [gameName, setGameName] = useState(props.gameName);
  const [gamePrice, setGamePrice] = useState(props.gamePrice);
  const [gameDescription, setGameDescription] = useState(props.gameDescription)
  const [gameImage, setGameImage] = useState(props.gameImage);
  const [isActive, setIsActive] = useState(true);
  const [favorites, setFavorites] = useState(0);

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

  const editItem = () => {
    if(!props.openModal) {
      props.setGame({
        gameName: gameName,
        gamePrice: gamePrice,
        gameDescription: gameDescription,
        gameImage: gameImage
      })
      props.setOpenModal(true);
    }
  };

  const addFavorites = async () => {};

  return (
    <div>
      {!isEditable ? (
        <></>
      ) : (
        <div className='card-container'>
          <img className='card-img' src={gameImage} alt='' />
          <div
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <Button className='card-btn' href=''>
              <Icon icon='fluent:delete-12-filled' />
            </Button>
            <Button className='card-btn' onClick={editItem}>
              <Icon icon='clarity:edit-solid' />
            </Button>
          </div>
          <div className='card-description'>
            <h5>Name: {gameName}</h5>
            <h5>Price: {gamePrice}$</h5>
          </div>
          <div
            className='card_info'
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <Icon style={{ margin: 12 }} icon='iconamoon:dislike' /> 12
              <Icon style={{ margin: 12 }} icon='iconamoon:like-light' />
              5310
            </div>
            <div>
              <Button className='card-btn' href=''>
                <Icon icon='tabler:list-details' />
              </Button>
              <Button className='card-btn' href='' onChange={addFavorites}>
                <Icon icon='carbon:favorite-filled' />
              </Button>
              <Button className='card-btn' href=''>
                <Icon icon='bxs:basket' />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameItem;
