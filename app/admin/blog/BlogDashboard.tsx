"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  createdAt: any;
  published: boolean;
}

export default function BlogDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "blogs", postId));
        setPosts((prev) => prev.filter((p) => p.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
      }
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogPost[];
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="apris text-4xl text-neutral-900 sm:text-5xl">Blog Dashboard</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            Manage your publications and stories.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex shrink-0 items-center justify-center rounded-xl border-2 border-neutral-900 bg-neutral-900 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.1em] text-[#EFE4DB] transition-colors hover:bg-neutral-800"
        >
          Create New Post
        </Link>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-black/10 bg-white/80 py-20 text-center text-sm font-medium uppercase tracking-widest text-neutral-500 shadow-sm">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/20 bg-white/60 py-16 text-center shadow-sm sm:py-20">
          <p className="mb-4 text-neutral-700">No blog posts found.</p>
          <Link
            href="/admin/blog/new"
            className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-neutral-700"
          >
            Write your first post
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="min-w-0 flex-1">
                <h2 className="apris text-xl tracking-tight text-neutral-900 sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-1 truncate text-sm text-neutral-600 sm:max-w-2xl">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  <span>{post.createdAt?.toDate().toLocaleDateString() || "Unknown Date"}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-neutral-300 sm:inline" aria-hidden />
                  <span
                    className={
                      post.published
                        ? "text-emerald-700"
                        : "text-amber-800"
                    }
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 sm:flex-nowrap">
                <Link
                  href={`/admin/blog/edit/${post.id}`}
                  className="rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-800 transition-colors hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
