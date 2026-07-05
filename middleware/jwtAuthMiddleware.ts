import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../logger";

const JWT_SECRET = process.env.ACCESSTOKENSECRET;

// Mapping JWT payload keys -> request header names
const HEADER_MAPPINGS: Record<string, string> = {
  userId: "x-user-id",
  email: "x-user-email",
};

export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    // Expected format:
    // Authorization: Bearer <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Access token missing or invalid",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    logger.info("Token: ", token)
    logger.info("JWT SECRET: ", JWT_SECRET)
    const decoded = jwt.verify(token, JWT_SECRET);

    // Map JWT payload into headers
    Object.entries(HEADER_MAPPINGS).forEach(([payloadKey, headerName]) => {
      const value = decoded[payloadKey];

      if (value !== undefined) {
        req.headers[headerName] = String(value);
      }
    });


    next();
  } catch (error) {
    logger.error("Error: ", error)
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};