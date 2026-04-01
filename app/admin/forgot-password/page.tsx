"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAllowedEmail } from "@/lib/auth-context";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isAllowedEmail(email)) {
      setError("Only @folapr.com or @wewantfola.com email addresses are supported.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        // Don't reveal whether account exists — show same success to prevent enumeration
        setSent(true);
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
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="apris text-5xl text-black mb-2">Fola PR</h1>
          <p className="text-black/50 text-sm uppercase tracking-widest">Admin Portal</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-black/8 rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-black mb-2">Check your inbox</h2>
              <p className="text-black/50 text-sm">
                If an account exists for <span className="text-black font-medium">{email}</span>, you will receive a password reset link shortly.
              </p>
              <Link
                href="/admin/login"
                className="inline-block mt-6 text-sm text-black underline underline-offset-2 hover:opacity-70"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-black mb-1">Reset Password</h2>
              <p className="text-black/50 text-sm mb-6">
                Enter your email address and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-xs font-semibold uppercase tracking-widest text-black/60 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@folapr.com"
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
                  className="w-full border-2 border-black text-black py-3 rounded-lg font-medium uppercase tracking-[0.1em] text-sm hover:bg-black/10 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending…" : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>

        {!sent && (
          <p className="text-center text-black/40 text-sm mt-6">
            Remembered it?{" "}
            <Link href="/admin/login" className="text-black underline underline-offset-2 hover:opacity-70">
              Back to Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
