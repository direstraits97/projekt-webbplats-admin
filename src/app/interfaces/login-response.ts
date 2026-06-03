/**
 * Nödvändigt interface som gör det möjligt att hantera token vid inloggning.
 * av: Josefine Backlund
 */

export interface LoginResponse {
  response: {
    message: string;
    token: string;
  };
}
