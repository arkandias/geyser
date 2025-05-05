export interface KeycloakToken {
  accessToken: string;
  refreshToken: string;
  idToken?: string;
  expiresIn: number;
}
