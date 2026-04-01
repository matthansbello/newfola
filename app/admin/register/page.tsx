"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAllowedEmail } from "@/lib/auth-context";

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
    <div className="min-h-screen bg-[#EFE4DB] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="apris text-5xl text-black mb-2">Fola PR</h1>
          <p className="text-black/50 text-sm uppercase tracking-widest">Admin Portal</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-black/8 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-black mb-1">Create Account</h2>
          <p className="text-black/50 text-sm mb-6">
            Registration is restricted to{" "}
            <span className="text-black/70 font-medium">@folapr.com</span> and{" "}
            <span className="text-black/70 font-medium">@wewantfola.com</span> addresses.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-email" className="block text-xs font-semibold uppercase tracking-widest text-black/60 mb-1.5">
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
                className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder:text-black/30"
              />
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-xs font-semibold uppercase tracking-widest text-black/60 mb-1.5">
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
                className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder:text-black/30"
              />
            </div>

            <div>
              <label htmlFor="reg-confirm" className="block text-xs font-semibold uppercase tracking-widest text-black/60 mb-1.5">
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
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-black/40 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/admin/login" className="text-black underline underline-offset-2 hover:opacity-70">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
