export interface IdentityTokenRequestParameters {
  client_id: string;
  client_secret: string;
  grant_type: "authorization_code";
  code: string;
  redirect_uri?: string;
}
