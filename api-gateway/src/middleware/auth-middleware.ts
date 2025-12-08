import { Request, Response, NextFunction } from "express";
import { grpcClient } from "../grpc-client";

export interface AuthRequest extends Request {
  user?: {
    user_id: string;
    role: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      throw new Error("JWT_ACCESS_SECRET not configured");
    }

    const response = await grpcClient.validateToken(token, secret);

    if (response.invalid) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = {
      user_id: response.user_id,
      role: response.role,
    };
    return next();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
