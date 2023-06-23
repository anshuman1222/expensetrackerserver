const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser=require('cookie-parser');
const PORT =process.env.PORT || 3000;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(cookieParser())




dotenv.config({ path: './config.env' });

require('./db/conn');

app.use(express.json())



app.use(require('./router/auth'))

app.use(require('./router/amount'))






app.listen(PORT, () => {
    console.log(`server is listening at ${PORT} `);
})
