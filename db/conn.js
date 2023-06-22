const mongoose = require('mongoose');
const database = process.env.DATABASE;

mongoose.connect(database).then(() => {
    console.log(`connection succesful`)
}).catch((err) => {
    console.log(`no connection`)
})