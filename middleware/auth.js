import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    if (!req.headers.autherization) {
      next();
      return;
    }
    const token = req.headers.autherization.split(" ")[1];

    if (token.length < 500) req.userId = jwt.verify(token, process.env.TOKEN_SECRET).id;
    else req.userId = jwt.decode(token).sub;

    next();
  } catch (e) {
    console.log(e);
  }
};

export default auth;
