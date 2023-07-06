import express from "express"
import { getAllClients, getGeography, getOverAllStats, getProducts, getTransactions, getUsers, productStats } from "../controllers/salesStats.js"


export const Router = express.Router()


Router.get('/sales',getOverAllStats)
Router.get('/users/stats',getAllClients)
Router.get('/categories',productStats)
Router.get('/products',getProducts)
Router.get('/users',getUsers)
Router.get('/transactions',getTransactions)
Router.get('/geography',getGeography)


