import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const Cart = () => {
  const { cartItems, setCartItems, favGames, setFavGames, games } =
    useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    cartItems.map((item, index) => {
      console.log(item.product._id + ", ");
    });
  }, []);

  const favoriteGamesText =
    favGames.length > 0
      ? "These are your favorite games"
      : "You have no favorite games";
  const cartItemsText =
    cartItems.length > 0
      ? "This is your cart:"
      : "There are no games in your cart";

  const gotoGame = async () => {
    navigate("/game");
  };

  const EmptyCart = () => {
    setCartItems([]);
    navigate("/cart");
  };

  const AddQuantity = (id) => {
    const existingCartItem = cartItems.find(
      (item) => id === item.product.gameId
    );

    if (existingCartItem) {
      const updatedItems = cartItems.map((item) => {
        if (item.product.gameId === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedItems);
    }
  };

  const DecQuantity = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.product.gameId === id) {
        item = {
          ...item,
          quantity: item.quantity - 1,
        };
        if (item.quantity <= 0) {
          return null;
        }
      }
      return item;
    });

    const filteredItems = updatedItems.filter((item) => item !== null);
    setCartItems(filteredItems);
  };

  return (
    <div>
      <Button style={{ float: "right", margin: "20px" }} onClick={gotoGame}>
        <img
          style={{ width: "100px" }}
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
          alt="user info"
        />
      </Button>
      <div className="cards" style={{ marginLeft: "25%", flexFlow: "column" }}>
        <h2
          className="card-container"
          style={{
            color: "DimGrey",
            textAlign: "center",
            background: "WhiteSmoke",
          }}
        >
          {favoriteGamesText}
        </h2>
        {favGames.length > 0 &&
          favGames.map((favGameId) => {
            const game = games.find((game) => game._id === favGameId);
            return game ? (
              <div
                className="card-container"
                style={{
                  gridAutoFlow: "left",
                  maxWidth: "200px",
                  maxHeight: "auto",
                  backgroundColor: "DimGrey",
                }}
              >
                <img
                  style={{ width: "100%" }}
                  className="card-img"
                  src={game.gameImage}
                  alt=""
                />
                <h5
                  style={{
                    background: "DimGrey",
                    color: "WhiteSmoke",
                    padding: "4px",
                  }}
                >
                  {game.gameName}
                </h5>
              </div>
            ) : null;
          })}
      </div>

      <div className="cart-games" style={{ marginLeft: "25%" }}>
        <h2 style={{ color: "Ivory" }}>{cartItemsText}</h2>
        {cartItems.length > 0 && (
          <>
            {cartItems.map((cartItem) => {
              const game = games.find(
                (game) => game._id === cartItem.product.gameId
              );
              return game ? (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button onClick={() => DecQuantity(game._id)}>
                    <Icon icon="typcn:minus" />
                  </Button>
                  <h5 style={{ color: "PowderBlue", margin: "4px" }}>
                    {game.gameName} - amount: {cartItem.quantity} - cost:{" "}
                    {game.gamePrice}$
                  </h5>
                  <Button onClick={() => AddQuantity(game._id)}>
                    <Icon icon="typcn:plus" />
                  </Button>
                </div>
              ) : null;
            })}
            <div>
              <h4
                style={{
                  marginLeft: "50px",
                  marginTop: "10px",
                  color: "green",
                }}
              >
                Total Cost:{" "}
                {cartItems.reduce((total, cartItem) => {
                  const game = games.find(
                    (game) => game._id === cartItem.product.gameId
                  );
                  return game
                    ? total + game.gamePrice * cartItem.quantity
                    : total;
                }, 0)}
                $
              </h4>
            </div>
            <Button style={{ marginLeft: "50px" }} onClick={EmptyCart}>
              Checkout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
