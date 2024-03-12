const jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");

const Auth = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    if (blacklist.includes(token)) {
      res.status(200).json({ msg: "login again" });
    }

    try {
      const decoded = jwt.verify(token, "tejareddy");
      if (decoded) {
        next();
      }
    } catch (error) {
      res.status(400).json({ err: error.message });
    }
  }
};

module.exports = { Auth };
