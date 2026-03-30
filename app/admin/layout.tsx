"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Inner component that handles checking auth rules
function AdminContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/register" || pathname === "/admin/forgot-password";

  useEffect(() => {
    if (!loading && mounted) {
      if (!user && !isAuthPage) {
        router.push("/admin/login");
      } else if (user && isAuthPage) {
        router.push("/admin/blog");
      }
    }
  }, [user, loading, isAuthPage, mounted, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  if (!mounted || loading) {
    return <div className="min-h-screen bg-[#EFE4DB] flex items-center justify-center">Loading...</div>;
  }

  // If we are on login/register/forgot-password route, do NOT show the sidebar layout
  if (isAuthPage) {
    return <main className="min-h-screen bg-[#EFE4DB]">{children}</main>;
  }

  // Ensure unauthenticated users don't see brief authenticated flashes
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#EFE4DB] flex flex-col md:flex-row font-inter text-black">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#D0D0D0] flex-shrink-0 flex flex-col pt-6 md:min-h-screen shadow-sm z-10">
        <div className="px-6 pb-6 border-b border-gray-100 flex items-center justify-between md:justify-start">
          <Link href="/admin/blog" className="text-xl font-bold tracking-tight text-black hover:opacity-80 transition-opacity apris">
            FOLA PR <span className="text-gray-400 font-normal">Admin</span>
          </Link>
          <Link href="/" className="md:hidden text-xs uppercase tracking-wider text-gray-500 hover:text-black transition-colors">
            Exit
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <Link
            href="/admin/blog"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-black bg-gray-100/50 rounded-lg transition-colors border border-gray-100"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
            Blog Articles
          </Link>
          <Link
            href="/admin/blog/create"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create New
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 hidden md:flex flex-col gap-2">
           <button onClick={handleLogout} className="flex w-full items-center gap-2 text-sm text-red-600 hover:text-red-800 transition-colors px-2 py-2 text-left">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
             </svg>
             Logout
           </button>
           <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors px-2 py-2">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
             Back to Website
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#EFE4DB]">
        <div className="max-w-6xl mx-auto p-6 md:p-10 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}

// Wrapper to provide the auth context
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}
