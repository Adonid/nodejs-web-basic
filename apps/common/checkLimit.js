const rateLimit = require("express-rate-limit");
 
checkLimit = (a = 3, b = 5) => rateLimit({
  windowMs: a * 60 * 1000,        // minutes
  max: b,                         // maximum
  message: {
    code: 429,
    error: "Uh chậm thôi! chờ trong ít phút rồi thử lại nhé"
  }
});

module.exports=checkLimit