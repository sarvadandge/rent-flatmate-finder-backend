import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Authentication required"
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Authentication required"
      );
    }

    const { password, ...safeUser } = user;

    req.user = safeUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;