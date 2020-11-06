require('dotenv').config();
require('./server/db-conn');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// gives server access to static files, will generate by npm run build 
app.use(express.static('./client/mern-azure/build/'))

app.get("/*", (request, response) => {
    response.sendFile("index.html", { root: __dirname + './client/mern-azure/build/'})
})


app.use("/api/", require('./server/route/thoughts-route'))






app.listen(PORT, () => console.log("Your serve is running on localhost:" + PORT))