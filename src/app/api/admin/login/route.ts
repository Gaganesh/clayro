import {
  ADMIN_COOKIE,
  createAdminSessionToken,
  getExpectedAdminPassword,
} from "@/lib/admin-session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  const expected = getExpectedAdminPassword();
  if (!expected) {
    return NextResponse.json(
      { error: "Admin password not configured on server" },
      { status: 503 }
    );
  }
  if (body.password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createAdminSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
