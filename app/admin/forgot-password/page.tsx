"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAllowedEmail } from "@/lib/auth-context";
import { adminInputClass, adminLabelClass } from "@/components/admin/form-classes";

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
    <div className="min-h-screen bg-gradient-to-b from-[#f7efe6] to-[#EFE4DB] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="apris mb-2 text-4xl text-neutral-900 sm:text-5xl">Fola PR</h1>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-600">
            Admin Portal
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-lg shadow-black/5">
          {sent ? (
            <div className="py-2 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#EFE4DB]/80">
                <svg className="h-7 w-7 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-neutral-900">Check your inbox</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                If an account exists for{" "}
                <span className="font-semibold text-neutral-900">{email}</span>, you will receive a
                password reset link shortly.
              </p>
              <Link
                href="/admin/login"
                className="mt-6 inline-block text-sm font-semibold text-neutral-900 underline underline-offset-2 hover:text-neutral-700"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-neutral-900">Reset Password</h2>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                Enter your email address and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="reset-email" className={adminLabelClass}>
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
                  className="w-full rounded-xl border-2 border-neutral-900 bg-neutral-900 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#EFE4DB] transition-colors hover:bg-neutral-800 disabled:opacity-50"
                >
                  {loading ? "Sending…" : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>

        {!sent && (
          <p className="mt-8 text-center text-sm text-neutral-600">
            Remembered it?{" "}
            <Link
              href="/admin/login"
              className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-neutral-700"
            >
              Back to Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
