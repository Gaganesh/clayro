"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [needsConfig, setNeedsConfig] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNeedsConfig(false);
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = "/admin/dashboard";
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (
        res.status === 503 &&
        data.error === "Admin password not configured on server"
      ) {
        setNeedsConfig(true);
      }
      setError(data.error ?? "Login failed");
    } catch {
      setError("Network error");
    }
    setPending(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f5f2]">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-center text-2xl font-semibold text-gray-900">
          Admin login
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Sign in to manage products
        </p>

        {needsConfig && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <p className="font-medium">Admin is not configured.</p>
            <p className="mt-1">
              Set <code className="rounded bg-amber-100 px-1">ADMIN_PASSWORD</code>{" "}
              (and ideally{" "}
              <code className="rounded bg-amber-100 px-1">
                ADMIN_SESSION_SECRET
              </code>
              ) in your production environment variables, then redeploy.
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="rounded border border-gray-300 p-3 text-gray-900"
            autoComplete="current-password"
          />

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-black py-3 text-white disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
