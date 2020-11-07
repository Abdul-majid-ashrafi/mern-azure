require('dotenv').config();
require('./server/db-conn');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// gives server access to static files, will generate by npm run build 
// app.use(express.static('./client/mern-azure/build/'))

app.get("/", (request, response) => {
    response.sendFile("index.html", { root: __dirname })
    // response.sendFile("index.html", { root: '/client/mern-azure/build/' })
})


app.use("/api/", require('./server/route/thoughts-route'))


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (error, req, res, next) {
        res.status(error.status || 500);
        if (error.code === "invalid_token") {
            res.send({
                message: error.code,
                error
            });
        } else {
            res.send({
                message: error.message,
                error
            });
        }
    });
}



app.listen(PORT, () => console.log("Your serve is running on localhost:" + PORT))