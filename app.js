// Core express
const express = require('express');
// Config info
const config = require(__dirname+'/config/config.json');
// Use for route & controller
const controllers = require(__dirname + '/apps/controllers');
// Use express
const app = express();


// Dua req ve dang json va chi lam viec voi json
app.use(express.json());
// Cau hinh file static
app.use('/static', express.static(__dirname + "/public"));
// them vao app cac route & controller
app.use(controllers);

// lang nghe cong ket noi
const host = config.server.host||"http://localhost";
const port = config.server.port||3000;
app.listen(port, host, () => {
    console.log("Serve is running on port " +port);
});