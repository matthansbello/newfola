"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAllowedEmail } from "@/lib/auth-context";
import { adminInputClass, adminLabelClass } from "@/components/admin/form-classes";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isAllowedEmail(email)) {
      setError("Only @folapr.com or @wewantfola.com email addresses are permitted to register.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/admin/blog");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please choose a stronger password.");
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
          <h2 className="text-xl font-semibold text-neutral-900">Create Account</h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">
            Registration is restricted to{" "}
            <span className="font-semibold text-neutral-800">@folapr.com</span> and{" "}
            <span className="font-semibold text-neutral-800">@wewantfola.com</span> addresses.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="reg-email" className={adminLabelClass}>
                Email Address
              </label>
              <input
                id="reg-email"
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
              <label htmlFor="reg-password" className={adminLabelClass}>
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className={adminInputClass}
              />
            </div>

            <div>
              <label htmlFor="reg-confirm" className={adminLabelClass}>
                Confirm Password
              </label>
              <input
                id="reg-confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
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
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link
            href="/admin/login"
            className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-neutral-700"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
