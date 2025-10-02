import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({ message: "No token, authorization denied" });

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer")
    return res.status(401).json({ message: "Invalid token format" });

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // now always exists
    // req.user = decoded.user || { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}
