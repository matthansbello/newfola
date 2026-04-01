"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAllowedEmail } from "@/lib/auth-context";

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
    <div className="min-h-screen bg-[#EFE4DB] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <h1 className="apris text-5xl text-black mb-2">Fola PR</h1>
          <p className="text-black/50 text-sm uppercase tracking-widest">Admin Portal</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-black/8 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-black mb-1">Sign In</h2>
          <p className="text-black/50 text-sm mb-6">Welcome back. Enter your credentials to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-widest text-black/60 mb-1.5">
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
                className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder:text-black/30"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-widest text-black/60">
                  Password
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-xs text-black/50 hover:text-black underline underline-offset-2 transition-colors"
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
                className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder:text-black/30"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-black text-black py-3 rounded-lg font-medium uppercase tracking-[0.1em] text-sm hover:bg-black/10 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-black/40 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/admin/register" className="text-black underline underline-offset-2 hover:opacity-70">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
