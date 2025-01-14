import express from 'express'
const app=express()
import mongoDB from './confic/mongodb.js'
import dotenv from'dotenv'
import routes from'./Routes/routes.js'
import cors from 'cors'
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
mongoDB()
app.use('/',routes)

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})