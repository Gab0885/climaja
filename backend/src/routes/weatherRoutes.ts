import { Router } from "express";
import { getWeather } from "../controllers/weatherController";

const weatherRouter = Router();

weatherRouter.get("/weather", getWeather);

export { weatherRouter };