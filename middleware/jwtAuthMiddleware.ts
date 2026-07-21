import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import logger from "../logger";

import { User } from "../models";

// Mapping JWT payload keys -> request header names
const HEADER_MAPPINGS: Record<string, string> = {
  userId: "x-user-id",
  email: "x-user-email",
};

export const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const jwtSecret = process.env.ACCESSTOKENSECRET || "jnkjsjv";

    if (!authHeader) {
      res.status(401).json({
        message: "Access token missing",
      });
      return;
    }

    let token = authHeader.trim();
    if (/^jwt\s+/i.test(token)) {
      token = token.replace(/^jwt\s+/i, "");
    } else if (/^bearer\s+/i.test(token)) {
      token = token.replace(/^bearer\s+/i, "");
    }
    token = token.trim();

    const decoded = jwt.verify(token, jwtSecret) as any;

    let numericUserId = decoded.userId || decoded.id;

    // Fallback: If userId missing from token payload, resolve from database
    if (!numericUserId && (decoded.externalId || decoded.email)) {
      const whereCondition: any = {};
      if (decoded.externalId) whereCondition.external_id = decoded.externalId;
      else if (decoded.email) whereCondition.email = decoded.email;

      const foundUser: any = await User.findOne({ where: whereCondition });
      if (foundUser) {
        numericUserId = foundUser.id;
      }
    }

    if (!numericUserId) {
      res.status(401).json({ message: "User not found or invalid token" });
      return;
    }

    (req as any).userId = Number(numericUserId);
    (req as any).user = decoded;
    req.headers["x-user-id"] = String(numericUserId);

    // Map JWT payload into headers
    Object.entries(HEADER_MAPPINGS).forEach(([payloadKey, headerName]) => {
      const value = decoded[payloadKey];
      if (value !== undefined) {
        req.headers[headerName] = String(value);
      }
    });

    next();
  } catch (error: any) {
    console.error("JWT verification failed:", error?.message || error);
    logger.error("Error verifying JWT token: ", error);
    res.status(401).json({
      message: "Access token missing or invalid",
    });
  }
};

