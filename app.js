// Core express
const express = require('express');
// Config info
const config = require('config');
// Use for route & controller
const controllers = require(__dirname + '/apps/controllers');
// Use express
const app = express();


// Dua req ve dang json va chi lam viec voi json
app.use(express.json());
// Set thu muc view cua ung dung
app.set('views', __dirname + '/apps/views');
// Su dung engine la ejs cho view - tra ve html dong cho res
app.set('view engine', 'ejs');
// Cau hinh file static
app.use('/static', express.static(__dirname + "/public"));
// them vao app cac route & controller
app.use(controllers);

// lang nghe cong ket noi
const host = config.get("server.host")||"http://localhost";
const port = config.get("server.port")||3000;
app.listen(port, host, () => {
    console.log("Serve is running on port " +port);
});