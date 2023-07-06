import express from "express";
import mongoose from "mongoose";
import Game from "../models/game.js";
import Genre from "../models/genre.js";

const router = express.Router();

router.post("/addToCart", async (req, res) => {
  const gameItem = body.req.Game;
  const newCartItem = {
    product: gameItem._id,
    quantity: 1,
    price: gameItem.gamePrice,
  };
});

router.post("/createGame", async (req, res) => {
  const { genreId, gameName, gamePrice, gameDescription, gameImage } = req.body;

  const id = new mongoose.Types.ObjectId();
  const query = Genre.where({ genreId: genreId._id });
  const _genre = await query.findOne({});
  const _newGame = new Game({
    _id: id,
    genreId: _genre,
    gameName: gameName,
    gamePrice: gamePrice,
    gameDescription: gameDescription,
    gameImage: gameImage,
  });

  _newGame
    .save()
    .then((results) => {
      return res.status(200).json({
        data: results,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.post("/createGenre", async (req, res) => {
  const { genreName, genreDesc } = req.body;
  const id = new mongoose.Types.ObjectId();

  const _newGenre = new Genre({
    _id: id,
    genreName: genreName,
    genreDesc: genreDesc,
  });
  _newGenre
    .save()
    .then((results) => {
      return res.status(200).json({
        data: results,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/readAllGames", async (req, res) => {
  Game.find()
    .populate("genreId")
    .then((gamesList) => {
      return res.status(200).json({
        data: gamesList,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/readAllGenres", async (req, res) => {
  Genre.find()
    .then((genresList) => {
      return res.status(200).json({
        data: genresList,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.delete("/deleteGame/:gid", async (req, res) => {
  const gid = req.params.gid;

  Game.findByIdAndDelete(gid)
    .then((results) => {
      return res.status(200).json({
        message: "Game deleted!",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.put("/updateGame/:gid", async (req, res) => {
  const gid = req.params.gid;

  const { gameId, genreId, gameName, gamePrice, gameDescription, gameImage } =
    req.body;

  const query = Genre.where({ genreId: genreId._id });
  const _genre = await query.findOne({});

  Game.findByIdAndUpdate(
    gameId,
    {
      genreId: _genre,
      gameName: gameName,
      gamePrice: gamePrice,
      gameDescription: gameDescription,
      gameImage: gameImage,
    },
    { new: true }
  )
    .then((game_updated) => {
      res.status(200).json({
        message: "Game updated successfully",
        game: game_updated,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error updating game",
        error: error.message,
      });
    });
});

router.get("/readGameById/:gid", async (req, res) => {
  const gid = req.params.gid;
  Game.findById(gid)
    .populate("genreId")
    .then((game) => {
      return res.status(200).json({
        message: game,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/readGamesByGenre/:genId", async (req, res) => {
  const genId = req.params.genId;
  Game.find({ genreId: genId })
    .then((gamesList) => {
      return res.status(200).json({
        message: gamesList,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

export default router;
