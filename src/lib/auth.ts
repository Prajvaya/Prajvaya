import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "prajvaya-wisdom-secret-key-108";

export interface SessionPayload {
  userId: string;
  email: string;
  role: "User" | "Admin";
}

export const signToken = (payload: SessionPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token: string): SessionPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch (err) {
    return null;
  }
};
