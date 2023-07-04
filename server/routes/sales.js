import express from "express"
import { getOverAllStats } from "../controllers/salesStats.js"


export const Router = express.Router()


Router.get('/sales',getOverAllStats)