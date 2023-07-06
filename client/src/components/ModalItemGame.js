import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  Table,
} from "react-bootstrap";
import "./styles/Modal.css";
import axios from "axios";

// GameItem component
const ModalItemGame = (props) => {
  const baseURL = "http://localhost:3004/api";

  const [genre, setGenre] = useState("");
  const [gameName, setGameName] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameImage, setGameImage] = useState("");

  useEffect(() => {
    setGameName(props.game.gameName);
    setGamePrice(props.game.gamePrice);
    setGameDescription(props.game.gameDescription);
    setGameImage(props.game.gameImage);
  }, []);

  const UpdateGame = async () => {
    if (gameName !== "" && gamePrice !== "") {
      console.log("Updated game id: " + props.game.gameId);
      const new_game = {
        gameId: props.game.gameId,
        genreId: genre,
        gameName: gameName,
        gamePrice: gamePrice,
        gameDescription: gameDescription,
        gameImage: gameImage,
      };

      await axios
        .put(baseURL + "/updateGame/" + new_game.gameId, new_game)
        .then((result) => {
          //toast.success('Game was updated!');
          props.setOpenModal(false);
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error.message);
        });

      props.LoadGames();
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="closeBtn">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h2>{props.game.gameName}</h2>
        </div>
        <div className="body">
          <Form style={{ marginTop: 100 }}>
            <Form.Select>
              <option>Select Genre</option>
              {props.genres &&
                props.genres.map((genre, index) => (
                  <option
                    key={index}
                    value={genre._id}
                    onChange={(e) => {
                      setGenre(e.target.value);
                    }}
                  >
                    {genre.genreName}
                  </option>
                ))}
            </Form.Select>
            <p>{genre}</p>
            <Form.Control
              type="text"
              value={gameName}
              onChange={(e) => {
                setGameName(e.target.value);
              }}
              placeholder="Game name"
              style={{ marginTop: 10 }}
            />
            <Form.Control
              type="text"
              value={gamePrice}
              onChange={(e) => {
                setGamePrice(e.target.value);
              }}
              placeholder="Game price"
              style={{ marginTop: 10 }}
            />
            <Form.Control
              type="text"
              value={gameDescription}
              onChange={(e) => {
                setGameDescription(e.target.value);
              }}
              placeholder="Game description"
              style={{ marginTop: 10 }}
            />
            <Form.Control
              type="text"
              value={gameImage}
              onChange={(e) => {
                setGameImage(e.target.value);
              }}
              placeholder="Game image"
              style={{ marginTop: 10 }}
            />
          </Form>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={UpdateGame}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ModalItemGame;
