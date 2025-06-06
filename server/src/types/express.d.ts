import type { AccessTokenPayload } from "@geyser/shared";

interface AuthContext {
  userId?: number;
  userRole?: string;
  jwtPayload?: AccessTokenPayload;
  isSuperAdmin?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}
