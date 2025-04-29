import Keycloak from "keycloak-js";

import {
  HASURA_CLAIMS_NAMESPACE,
  KEYCLOAK_TOKEN_MIN_VALIDITY,
} from "@/config/constants.ts";
import {
  authURL,
  bypassAuth,
  hasuraAdminSecret,
  hasuraUserId,
} from "@/config/env.ts";
import { type HasuraRole, isHasuraRole } from "@/config/hasura-roles.ts";
import { RoleTypeEnum } from "@/gql/graphql.ts";

const keycloak = new Keycloak({
  url: authURL,
  realm: "geyser",
  clientId: "geyser-spa",
});

// Callback listeners
keycloak.onAuthLogout = () => {
  console.debug("Logged out");
};
keycloak.onTokenExpired = () => {
  console.debug("Token expired");
};

export const auth = async () => {
  if (bypassAuth) {
    console.debug("Bypassing authentication...");
    return {
      userId: hasuraUserId,
      defaultRole: RoleTypeEnum.Admin,
      allowedRoles: [
        RoleTypeEnum.Admin,
        RoleTypeEnum.Commissioner,
        RoleTypeEnum.Teacher,
      ],
    };
  }
  try {
    const claims = initKeycloak();
  }
};


type HasuraClaims = {
  userId: string;
  defaultRole: HasuraRole;
  allowedRoles: HasuraRole[];
};

export const initKeycloak = async (): Promise<string | null> => {
  try {
    const authenticated = await keycloak.init({
      onLoad: "login-required",
    });
    if (authenticated) {
      console.debug("Authenticated!");
      if (keycloak.tokenParsed === undefined) {
        console.error("No parsed token");
        return null;
      }
      return keycloak.tokenParsed;
    } else {
      console.error("Authentication failed");
      return null;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
};

export const refreshToken = async () => {
  if (bypassAuth) {
    return;
  }
  try {
    const refreshed = await keycloak.updateToken(KEYCLOAK_TOKEN_MIN_VALIDITY);
    console.debug(refreshed ? "Token was refreshed" : "Token is still valid");
  } catch (error) {
    console.error("Failed to refresh the token:", error);
    keycloak.clearToken();
  }
};

export const getAuthHeader = (): Record<string, string> =>
  bypassAuth
    ? {
        "X-Hasura-Admin-Secret": hasuraAdminSecret,
        "X-Hasura-User-Id": hasuraUserId,
      }
    : { Authorization: `Bearer ${keycloak.token}` };

export const logout = async () => {
  if (!bypassAuth) {
    await keycloak.logout();
  }
};

const validateClaims = (
  tokenParsed: Record<string, unknown>,
): HasuraClaims | null => {
  if (!isRawHasuraClaims(HASURA_CLAIMS_NAMESPACE, tokenParsed)) {
    console.error("No valid X-Hasura claims in parsed token");
    return null;
  }
  const claims = tokenParsed[HASURA_CLAIMS_NAMESPACE];
  const validRoles = claims["x-hasura-allowed-roles"].filter(
    (role): role is HasuraRole => {
      if (!isHasuraRole(role)) {
        console.error(`Invalid allowed role: ${role}`);
        return false;
      }
      return true;
    },
  );
  if (!isHasuraRole(claims["x-hasura-default-role"])) {
    console.error(`Invalid default role: ${claims["x-hasura-default-role"]}`);
    return null;
  }
  if (!validRoles.includes(claims["x-hasura-default-role"])) {
    console.error(`Default role is not an allowed role`);
    return null;
  }
  return {
    userId: claims["x-hasura-user-id"],
    defaultRole: claims["x-hasura-default-role"],
    allowedRoles: validRoles,
  };
};

type RawHasuraClaims<T extends string> = Record<
  T,
  {
    "x-hasura-user-id": string;
    "x-hasura-default-role": string;
    "x-hasura-allowed-roles": string[];
  }
>;

const isRawHasuraClaims = <T extends string>(
  namespace: T,
  claims: unknown,
): claims is RawHasuraClaims<T> => {
  if (!claims || typeof claims !== "object" || !(namespace in claims)) {
    return false;
  }
  const namespaceClaims = (claims as Record<T, unknown>)[namespace];
  if (!namespaceClaims || typeof namespaceClaims !== "object") {
    return false;
  }
  return (
    "x-hasura-user-id" in namespaceClaims &&
    "x-hasura-default-role" in namespaceClaims &&
    "x-hasura-allowed-roles" in namespaceClaims &&
    typeof namespaceClaims["x-hasura-user-id"] === "string" &&
    typeof namespaceClaims["x-hasura-default-role"] === "string" &&
    Array.isArray(namespaceClaims["x-hasura-allowed-roles"]) &&
    namespaceClaims["x-hasura-allowed-roles"].every(
      (role) => typeof role === "string",
    )
  );
};
