import type { AccessTokenPayload } from "@geyser/shared";

interface AuthContext {
  userId?: string;
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
