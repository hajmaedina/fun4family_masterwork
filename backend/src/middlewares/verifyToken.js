import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.header("Authorization");
  const authtoken = token.split(" ")[1];

  if (!authtoken) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(authtoken, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
