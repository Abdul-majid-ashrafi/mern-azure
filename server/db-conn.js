const mongoose = require('mongoose');

const { DB_USERNAME, DB_PRIMARY_PASSWORD, DB_PRIMARY_CONNECTION_STRING } = process.env;


mongoose.connect(DB_PRIMARY_CONNECTION_STRING,
    {
        auth: { user: DB_USERNAME, password: DB_PRIMARY_PASSWORD },
        useNewUrlParser: true, useUnifiedTopology: true
    }
)
    .then(() => console.log("Mongoose connection open"))
    .catch((error) => console.log("Mongoose connection Fialed", error))
