import type { AccessTokenPayload } from "@geyser/shared";

interface AuthContext {
  orgId?: number;
  userId?: number;
  isAdmin?: boolean;
  role?: string;
  jwtPayload?: AccessTokenPayload;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}
