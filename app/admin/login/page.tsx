"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAllowedEmail } from "@/lib/auth-context";
import { adminInputClass, adminLabelClass } from "@/components/admin/form-classes";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isAllowedEmail(email)) {
      setError("Only @folapr.com or @wewantfola.com email addresses are permitted.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/blog");
    } catch (err: any) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Incorrect email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7efe6] to-[#EFE4DB] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="apris mb-2 text-4xl text-neutral-900 sm:text-5xl">Fola PR</h1>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-600">
            Admin Portal
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-lg shadow-black/5">
          <h2 className="text-xl font-semibold text-neutral-900">Sign In</h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">
            Welcome back. Enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="login-email" className={adminLabelClass}>
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@folapr.com"
                className={adminInputClass}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label htmlFor="login-password" className={`${adminLabelClass} mb-0`}>
                  Password
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-xs font-medium text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={adminInputClass}
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl border-2 border-neutral-900 bg-neutral-900 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#EFE4DB] transition-colors hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-neutral-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/admin/register"
            className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-neutral-700"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
