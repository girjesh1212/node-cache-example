const express = require('express');

// initialize server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Path to routes
const Post = require('./api/routes/posts');

// //Use routes
app.use('/', Post);

const port = 5000;
app.listen(port, function () {
    console.log("Server running on port " + port);
});