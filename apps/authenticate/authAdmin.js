const rateLimit = require("express-rate-limit");
 
const reqLimit = (a = 3, b = 5) => rateLimit({
  windowMs: a * 60 * 1000,        // minutes
  max: b,                         // maximum
});

const isAdmin = req => {
    
}

module.exports = {
    reqLimit,
}