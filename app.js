// Core express
const express = require('express');
// Config info
const config = require('config');
// Format request
const bodyParser = require('body-parser');
// User for VIEWS


const app = express();
const controllers = require(__dirname + '/apps/controllers');

// Dua req ve dang json va chi lam viec voi json
app.use(bodyParser.json());
// Set thu muc view cua ung dung
app.set('views', __dirname + '/apps/views');
// Su dung engine la ejs cho view - tra ve html dong cho res
app.set('view engine', 'ejs');
// them vao app
app.use(controllers);

// lang nghe
const host = config.get("server.host");
const port = config.get("server.port");
app.listen(port, host, () => {
    console.log("Serve is running on port 3000");
});