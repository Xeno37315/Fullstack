import React, { useState, useEffect, useContext, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import axios from "axios";

//Import Pages
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Cart from "./pages/Cart";
import Details from "./pages/Details";

export const CartContext = createContext();

function App() {
  const baseURL = "http://localhost:3004/api";

  const [cartItems, setCartItems] = useState([]);
  const [favGames, setFavGames] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    const storedFavGames = localStorage.getItem("favGames");
    const storedGames = localStorage.getItem("games");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    if (storedFavGames) {
      setFavGames(JSON.parse(storedFavGames));
    }

    if (storedGames) {
      setGames(JSON.parse(storedFavGames));
    }
  }, []);

  const LoadGames = async () => {
    const res = await axios.get(baseURL + "/readAllGames");
    const data = res.data;
    setGames(data.data);
  };

  return (
    <div>
      <CartContext.Provider
        value={{
          cartItems,
          setCartItems,
          favGames,
          setFavGames,
          games,
          LoadGames,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/details" element={<Details />} />
            <Route path="/game" element={<Game />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </CartContext.Provider>
    </div>
  );
}

export default App;
