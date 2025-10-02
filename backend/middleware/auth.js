import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.header("Authorization"); // "Bearer TOKEN"
  if (!authHeader)
    return res.status(401).json({ message: "No token, authorization denied" });

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = tokenParts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // { id: userId }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
