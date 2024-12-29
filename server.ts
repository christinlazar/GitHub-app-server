import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './config/dbConnect';
import userRoute from './routes/userRoute'
import bodyParser from 'body-parser';
const app = express()
app.use(cors({
    origin:['http://localhost:3000'],
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    optionsSuccessStatus:200}))
    app.use(express.urlencoded({extended:true}))
    app.use(bodyParser.json())
app.use('/',userRoute)
connectDB()
app.listen(process.env.PORT,()=>{
    console.log(`server started running on ${process.env.PORT}`)
})

