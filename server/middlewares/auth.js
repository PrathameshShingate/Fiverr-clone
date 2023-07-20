const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers.authorization;
  if (!token) return res.status(401).send("You are not authenticated!");

  token = token.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload?.userID;
    next();
  });
}

module.exports = verifyToken;
