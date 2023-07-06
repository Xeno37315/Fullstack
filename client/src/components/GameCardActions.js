import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  Table,
} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

const GameCardActions = (props) => {
  const [favGames, setFavGames] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setFavGames(props.favGames);
    setCartItems(props.cartItems);
  }, []);

  const navigate = useNavigate();

  const addToCart = () => {
    const existingCartItem = cartItems.find(
      (item) => item.product.gameId === props.gameItem.gameId
    );

    if (existingCartItem) {
      const updatedItems = cartItems.map((item) => {
        if (item.product.gameId === props.gameItem.gameId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedItems);
      props.setCartItems(updatedItems);
    } else {
      const newCartItem = {
        product: props.gameItem,
        quantity: 1,
        price: props.gameItem.gamePrice,
      };
      const updatedItems = [...cartItems, newCartItem];
      setCartItems(updatedItems);
      props.setCartItems(updatedItems);
    }
  };

  const addToFav = async () => {
    const existingFavGame = props.favGames.find(
      (game) => game === props.gameItem.gameId
    );

    if (!existingFavGame) {
      props.setFavGames((favGames) => [...favGames, props.gameItem.gameId]);
    }
  };

  const gotoDetails = async () => {
    navigate("/details");
  };

  return (
    <div>
      <Button className="card-btn" href="" onClick={gotoDetails}>
        <Icon icon="tabler:list-details" />
      </Button>

      <Button className="card-btn" href="">
        <Icon icon="carbon:favorite-filled" onClick={addToFav} />
      </Button>

      <Button className="card-btn" href="">
        <Icon icon="uil:cart" onClick={addToCart} />
      </Button>
    </div>
  );
};

export default GameCardActions;
