import { cookies } from "next/headers";
import { verifyAdminToken, AdminTokenPayload } from "./jwt";

export const ADMIN_COOKIE_NAME = "uxi_admin_token";

/**
 * Retrieves and validates the current admin session from incoming cookies.
 * Returns the payload if valid, or null if unauthenticated.
 */
export async function getAdminSession(): Promise<AdminTokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch (error) {
    console.error("Error retrieving admin session:", error);
    return null;
  }
}
