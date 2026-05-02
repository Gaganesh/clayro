import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "clayro_admin";

const DEV_PLACEHOLDER_PASSWORD = "clayro@123";
const DEV_PLACEHOLDER_SECRET = "clayro-dev-insecure-secret-set-env-in-prod";

function sessionSecret(): string {
  const s =
    process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD;
  if (s) return s;
  if (process.env.NODE_ENV === "development") {
    return DEV_PLACEHOLDER_SECRET;
  }
  throw new Error(
    "Set ADMIN_PASSWORD or ADMIN_SESSION_SECRET in environment variables."
  );
}

/** Password for POST /api/admin/login (plain text). */
export function getExpectedAdminPassword(): string {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV === "development") return DEV_PLACEHOLDER_PASSWORD;
  return "";
}

export function createAdminSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  const payload = Buffer.from(JSON.stringify({ exp }), "utf8").toString(
    "base64url"
  );
  const sig = createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const secret = sessionSecret();
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;
    const expected = createHmac("sha256", secret)
      .update(payload)
      .digest("base64url");
    if (sig.length !== expected.length) return false;
    if (!timingSafeEqual(Buffer.from(sig, "utf8"), Buffer.from(expected, "utf8")))
      return false;
    const { exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { exp: number };
    return Math.floor(Date.now() / 1000) < exp;
  } catch {
    return false;
  }
}
