import type { RoleType } from "@geyser/shared";

declare global {
  namespace Grafast {
    interface RequestContext {
      user?: {
        uid: string;
        role: RoleType;
      };
    }
  }
}
