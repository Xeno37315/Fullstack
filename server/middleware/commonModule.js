import { getGenres } from "../controllers/game_actions.js";

export const requestSuccess = async (data) => {
  data.success = true;
  return {
    success: true,
    json: data,
  };
};

export const requestFailure = async (data) => {
  data.success = false;
  return {
    success: false,
    json: data,
  };
};

export const getAllGenresRequest = async (req) => {
  const result = await getGenres(req.filter);
  return requestSuccess({ data: result });
};
