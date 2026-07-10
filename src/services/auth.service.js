import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "Email already exists"
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Generate JWT
  const token = generateToken(user);

  // Remove password before returning
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};