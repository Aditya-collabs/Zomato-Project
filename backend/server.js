// start server

require('dotenv').config() // this is important to process the .env file without this it will show undefiend
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB(); // this is the final call to connect the server to the server.

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on port ${process.env.PORT || 5000}`);
})