"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthProvider, useAuth } from "@/lib/auth-context";

// Public auth routes that don't need protection
const PUBLIC_AUTH_PATHS = ["/admin/login", "/admin/register", "/admin/forgot-password"];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath = PUBLIC_AUTH_PATHS.includes(pathname ?? "");

  useEffect(() => {
    if (loading) return;
    if (!user && !isPublicPath) {
      router.replace("/admin/login");
    }
    if (user && isPublicPath) {
      router.replace("/admin/blog");
    }
  }, [user, loading, isPublicPath, router]);

  // Splash while firebase resolves auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFE4DB] flex items-center justify-center">
        <p className="text-black/40 text-sm uppercase tracking-widest">Loading…</p>
      </div>
    );
  }

  // Render public pages (login / register / forgot) with no nav shell
  if (isPublicPath) {
    return <>{children}</>;
  }

  // Guard — if somehow user is null and not on a public path, render nothing (redirect in effect)
  if (!user) return null;

  const handleSignOut = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#EFE4DB] text-black font-inter">
      <nav className="border-b border-black/10 bg-[#EFE4DB]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="apris text-2xl tracking-tight uppercase">Fola PR Admin</h1>
            <span className="text-xs px-2 py-1 rounded bg-black/10 text-black font-medium uppercase tracking-wider">
              Dashboard
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-xs text-black/40 hidden sm:block">{user.email}</span>
            <a
              href="/"
              className="text-sm border-b border-black/30 hover:border-black transition-colors pb-0.5"
            >
              Back to Site
            </a>
            <button
              onClick={handleSignOut}
              className="text-sm px-4 py-1.5 border border-black/30 rounded text-black hover:bg-black/10 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-[1400px] px-6 py-10">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
