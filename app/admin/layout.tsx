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
      <div className="min-h-screen bg-gradient-to-b from-[#f7efe6] to-[#EFE4DB] flex items-center justify-center">
        <p className="text-neutral-600 text-sm font-medium uppercase tracking-widest">
          Loading…
        </p>
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
    <div className="min-h-screen bg-gradient-to-b from-[#f7efe6] to-[#EFE4DB] text-neutral-900 font-inter antialiased">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f5ebe3]/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="apris text-xl tracking-tight text-neutral-900 sm:text-2xl">
              Fola PR Admin
            </h1>
            <span className="rounded-md border border-black/10 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-800 shadow-sm">
              Dashboard
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="hidden max-w-[200px] truncate text-xs font-medium text-neutral-600 sm:inline md:max-w-[280px]">
              {user.email}
            </span>
            <a
              href="/"
              className="rounded-lg border border-black/15 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-white"
            >
              Back to Site
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border-2 border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-semibold text-[#EFE4DB] transition-colors hover:bg-neutral-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8 sm:py-12">
        {children}
      </main>
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
