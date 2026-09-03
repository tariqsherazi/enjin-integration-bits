const jwt = require("jsonwebtoken");
const { environment } = require("../environment");

const validateToken = async (ctx) => {
  if (
    !ctx.request.headers.authorization ||
    !ctx.request.headers.authorization.split(" ")[1]
  ) {
    throw new Error("invalid token");
  } else {
    let theToken = ctx.request.headers.authorization.split(" ")[1];
    return jwt.verify(theToken, environment.MY_SECRET, (err, decoded) => {
      if (decoded) {
        return "success";
      }
      if (err) {
        throw new Error("invalid token");
      }
    });
  }
};

module.exports = { validateToken };
