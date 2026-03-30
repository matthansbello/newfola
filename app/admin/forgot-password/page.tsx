"use client";

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Domain validation check
    const allowedDomains = ["folapr.com", "wewantfola.com"];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    
    if (!allowedDomains.includes(emailDomain)) {
      setError(`Unauthorized email domain. You must use an official @folapr.com or @wewantfola.com address.`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-inter bg-[#EFE4DB]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl font-normal leading-9 tracking-tight text-black apris">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-[#00000099]">
          Enter your email to receive recovery instructions
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 shadow-sm ring-1 ring-[#D0D0D0]">
        {!success ? (
          <form className="space-y-6" onSubmit={handleReset}>
            {error && (
              <div className="bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-black uppercase tracking-wider"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ color: "black" }}
                  className="block w-full border-0 py-2.5 px-3 text-black bg-white shadow-sm ring-1 ring-inset ring-[#D0D0D0] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-none"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center bg-black px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors disabled:opacity-50"
              >
                {loading ? "Sending link..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="bg-green-50 p-4 border border-green-200 rounded-md">
              <h3 className="text-sm font-medium text-green-800">
                Check your inbox!
              </h3>
              <p className="mt-2 text-sm text-green-700">
                A password reset link has been sent to <strong>{email}</strong>.
              </p>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-[#00000099]">
          Remember your password?{" "}
          <Link
            href="/admin/login"
            className="font-medium text-black hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
