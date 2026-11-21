import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const sessionCookie = "faster_shop_session";
const sessionDuration = 8 * 60 * 60;

export function matchesSecret(value: string, expected: string) {
  const digest = (input: string) => createHash("sha256").update(input).digest();
  return timingSafeEqual(digest(value), digest(expected));
}

function signExpiration(expiration: string) {
  const secret = process.env.SESSION_SECRET;
  const password = process.env.SITE_PASSWORD;
  if (!secret || !password) return null;

  return createHmac("sha256", secret)
    .update(JSON.stringify([expiration, password]))
    .digest("base64url");
}

export async function hasSession() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token || !/^\d+\.[\w-]{43}$/.test(token)) return false;

  const [expiration, signature] = token.split(".");
  if (Number(expiration) <= Date.now()) return false;

  const expected = signExpiration(expiration);
  return expected !== null && matchesSecret(signature, expected);
}

export async function startSession() {
  const expiration = String(Date.now() + sessionDuration * 1000);
  const signature = signExpiration(expiration);
  if (!signature) return false;

  (await cookies()).set(sessionCookie, `${expiration}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionDuration,
  });
  return true;
}

export async function endSession() {
  (await cookies()).delete(sessionCookie);
}
