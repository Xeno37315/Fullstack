import React, { useState, useContext } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "@iconify/react";
import "./styles/GameItem.css";
import axios from "axios";
import GameCardActions from "./GameCardActions";
import { CartContext } from "../App";

const GameItem = (props) => {
  const baseURL = "http://localhost:3004/api";

  const [isEditable, setIsEditable] = useState(true);
  const [gameItem, setGameItem] = useState({
    gameId: props.gameId,
    gameName: props.gameName,
    gamePrice: props.gamePrice,
    gameDescription: props.gameDescription,
    gameImage: props.gameImage,
  });

  const { cartItems, setCartItems, favGames, setFavGames } =
    useContext(CartContext);

  const editItem = () => {
    if (!props.openModal) {
      props.setGame({
        gameId: gameItem.gameId,
        gameName: gameItem.gameName,
        gamePrice: gameItem.gamePrice,
        gameDescription: gameItem.gameDescription,
        gameImage: gameItem.gameImage,
      });
      props.setOpenModal(true);
    }
  };

  const delItem = async () => {
    await axios
      .delete(baseURL + "/deleteGame/" + props.gameId)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      {!isEditable ? (
        <></>
      ) : (
        <div className="card-container">
          <img className="card-img" src={gameItem.gameImage} alt="" />
          <div
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Button className="card-btn" href="" onClick={delItem}>
              <Icon icon="fluent:delete-12-filled" />
            </Button>
            <Button className="card-btn" onClick={editItem}>
              <Icon icon="clarity:edit-solid" />
            </Button>
          </div>
          <div className="card-description">
            <h5>Name: {gameItem.gameName}</h5>
            <h5>Price: {gameItem.gamePrice}$</h5>
          </div>
          <div
            className="card_info"
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <div>
              <Icon style={{ margin: 12 }} icon="iconamoon:dislike" /> 12
              <Icon style={{ margin: 12 }} icon="iconamoon:like-light" />
              5310
            </div>
            <div>
              <GameCardActions
                gameItem={gameItem}
                cartItems={cartItems}
                setCartItems={setCartItems}
                favGames={favGames}
                setFavGames={setFavGames}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameItem;
