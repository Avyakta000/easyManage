const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d"  // token expiration set to 1 day
  });

  res.cookie("jwt_auth", token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    httpOnly: true, // prevent XSS
    sameSite: "strict", // prevent CSRF (Cross-Site Request Forgery)
    secure: process.env.NODE_ENV !== "development", // ensure cookie is sent only over HTTPS in production
    domain: process.env.DOMAIN,
  });

  return token;
};

module.exports = generateToken;
