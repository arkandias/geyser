export const makeClaims = (data: {
  adminSecret?: string;
  userId?: string;
  allowedRoles?: string[];
  defaultRole?: string;
  role?: string;
}): Record<string, string> => {
  const claims: Record<string, string> = {};

  if (data.adminSecret) {
    claims["X-Hasura-Admin-Secret"] = data.adminSecret;
  }

  if (data.userId) {
    claims["X-Hasura-User-Id"] = data.userId;
  }

  if (data.allowedRoles?.length) {
    claims["X-Hasura-Allowed-Roles"] = JSON.stringify(data.allowedRoles);
  }

  if (data.defaultRole) {
    claims["X-Hasura-Default-Role"] = data.defaultRole;
  }

  if (data.role) {
    claims["X-Hasura-Role"] = data.role;
  }

  return claims;
};
