import GameItem from "../components/GameItem";
import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcPlus, FcEditImage, FcAddDatabase } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ModalItemGame from "../components/ModalItemGame";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../App";

export default function Game() {
  const baseURL = "http://localhost:3004/api";

  const navigate = useNavigate();

  const [genres, setGenres] = useState([]);
  const [game, setGame] = useState();

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGameName, setSelectedGameName] = useState("");
  const [selectedGamePrice, setSelectedGamePrice] = useState("");
  const [selectedGameDescription, setSelectedGameDescription] = useState("");
  const [selectedGameImage, setSelectedGameImage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { setCartItems, setFavGames, LoadGames, games, setGames } =
    useContext(CartContext);

  useEffect(() => {
    LoadGenres();
    LoadGames();
  }, []);

  const LoadGenres = async () => {
    const res = await axios.get(baseURL + "/readAllGenres");
    const data = res.data;
    setGenres(data.data);
  };

  const addNewGame = async () => {
    if (
      selectedGameName !== "" &&
      selectedGamePrice !== "" &&
      selectedGenre !== null
    ) {
      const new_game = {
        genreId: selectedGenre,
        gameName: selectedGameName,
        gamePrice: selectedGamePrice,
        gameDescription: selectedGameDescription,
        gameImage: selectedGameImage,
      };
      await axios
        .post(baseURL + "/createGame", new_game)
        .then((result) => {
          toast.success("Game was created");
          console.log(result.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });

      setSelectedGameName("");
      setSelectedGamePrice("");
      setSelectedGameDescription("");
      setSelectedGameImage("");
      LoadGames();
    } else {
      toast.error("GameName and price are require");
    }
  };

  const gotoCart = async () => {
    navigate("/cart");
  };

  const addGameToCart = async (gameItem) => {
    const newCartItem = {
      product: gameItem,
    };

    setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
  };

  //   const createGenre = async () => {
  //     try {
  //       const genreName = 'TEST';
  //       const res = axios.get(baseURL + '/createGenre');
  //       console.log(res);
  //     } catch (error) {
  //       console.error(error.response.data);
  //     }
  //   };

  return (
    <div>
      <Button style={{ float: "right", margin: "20px" }} onClick={gotoCart}>
        <img
          style={{ width: "100px" }}
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
          alt="user info"
        />
      </Button>

      <ToastContainer />

      <Row>
        {openModal && (
          <ModalItemGame
            setOpenModal={setOpenModal}
            genres={genres}
            game={game}
            LoadGames={LoadGames}
          />
        )}
        <Col xl={3} xs={12}>
          <Form style={{ marginTop: 100 }}>
            <Form.Select>
              <option>Select Genre</option>
              {genres.length > 0 &&
                genres.map((genre, index) => (
                  <option
                    key={index}
                    value={genre._id}
                    onChange={(e) => {
                      setSelectedGenre(e.target.value);
                    }}
                  >
                    {genre.genreName}
                  </option>
                ))}
            </Form.Select>
            <p>{selectedGenre}</p>
            <Form.Control
              type="text"
              value={selectedGameName}
              onChange={(e) => {
                setSelectedGameName(e.target.value);
              }}
              placeholder="Game name"
              style={{ marginTop: 10 }}
            />
            <Form.Control
              type="text"
              value={selectedGamePrice}
              onChange={(e) => {
                setSelectedGamePrice(e.target.value);
              }}
              placeholder="Game price"
              style={{ marginTop: 10 }}
            />
            <Form.Control
              type="text"
              value={selectedGameDescription}
              onChange={(e) => {
                setSelectedGameDescription(e.target.value);
              }}
              placeholder="Game description"
              style={{ marginTop: 10 }}
            />
            <Form.Control
              type="text"
              value={selectedGameImage}
              onChange={(e) => {
                setSelectedGameImage(e.target.value);
              }}
              placeholder="Game image"
              style={{ marginTop: 10 }}
            />
            <Button
              onClick={addNewGame}
              variant="info"
              style={{ marginTop: 10, width: "100%" }}
            >
              ADD NEW GAME
            </Button>
          </Form>
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <div className="cards" style={{ flexDirection: "row" }}>
          {games &&
            games.map((game, index) => (
              <GameItem
                key={index}
                gameId={game._id}
                gameName={game.gameName}
                gamePrice={game.gamePrice}
                gameDescription={game.gameDescription}
                gameImage={game.gameImage}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setGame={setGame}
              />
            ))}
        </div>
      </Row>
    </div>
  );
}
