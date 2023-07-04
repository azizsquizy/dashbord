import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import morgan from "morgan"
import helmet from "helmet"
import * as dotenv from "dotenv"
import bodyParser from "body-parser"
import clientRouter from "./routes/client.js"
import { Router } from "./routes/sales.js"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("cummon"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


//Routes

app.use('/client',clientRouter)
app.use('/',Router)

mongoose.connect(process.env.MONGO_KEY,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("DB Started"))

app.listen(process.env.PORT,console.log("server STARTED"))