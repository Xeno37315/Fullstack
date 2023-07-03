import express from 'express';
import { getAllGenresRequest } from '../middleware/commonModule.js';
import { respond } from './util.js';

const Router = express.Router();

Router.get('/readAllGenres', async (req, res) => {
  return respond(await getAllGenresRequest(req.query), res);
});

export default Router;
