import { verifyToken } from "../utils/auth.util";
import { MiddlewareFunction } from "./middleware";

export const authMiddleware: (roles: Array<"admin" | "user">) => MiddlewareFunction = (
  roles: Array<"admin" | "user">
) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const user = verifyToken(token);
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  };
};
