// create server here 

const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')
const userRoutes = require('./routes/user.routes')
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // ye frontend ka address hai jaha se request aayegi
    credentials: true // ye isliye taaki cookies ko allow kiya jaa sake cross-origin requests me
}));
app.use(express.json()); // ye middelware req.body me data le kr aata hai jo ki client deta hai aur usko readable banata hai.
app.use(cookieParser()); //Browser cookies bhejta hai string format me, Ye middleware Incoming request ke cookies ko read karta hai aur Unko object bana deta hai


app.get("/", (req, res) => {
    res.send("Hello world");
})

//yaha pr hamne server ko bataya ki hamare pass authentication ke liye api hai voh exist krti hai ye hamne bataya.
app.use('/api/auth', authRoutes) // ye , /api/auth , prefix hai jo lagana padta hai api kaam kam kregi, isse lagana jaruri nahi hai lekin recommended hai 
app.use('/api/food', foodRoutes)
app.use('/api/food-partner', foodPartnerRoutes)
app.use('/api/user', userRoutes)


module.exports = app;   