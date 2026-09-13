import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "uxi_jwt_secret_key_production_2026_super_secure_9959593027_uxitech";

const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface AdminTokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  [key: string]: unknown;
}

/**
 * Sign an admin JWT with 7 days expiration
 */
export async function signAdminToken(payload: AdminTokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

/**
 * Verify an admin JWT and return payload, or null if invalid/expired
 */
export async function verifyAdminToken(
  token: string
): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as AdminTokenPayload;
  } catch {
    return null;
  }
}
