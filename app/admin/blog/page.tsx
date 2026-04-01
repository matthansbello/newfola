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

export default function AdminBlogDashboard() {
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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-10 border-b border-black/10 pb-4">
        <div>
          <h1 className="apris text-5xl text-black">Blog Dashboard</h1>
          <p className="text-black/60 mt-2 font-inter">Manage your publications and stories.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="border-2 border-black text-black px-6 py-3 rounded-md font-medium uppercase tracking-[0.1em] text-sm hover:bg-black/10 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-black/50 uppercase tracking-widest text-sm">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="py-20 text-center text-black/50 border border-dashed border-black/20 rounded-lg">
          <p className="mb-4">No blog posts found.</p>
          <Link href="/admin/blog/new" className="text-black underline font-medium">Write your first post</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/40 p-6 rounded-lg border border-black/5 flex justify-between items-center hover:bg-white/60 transition-colors">
              <div>
                <h2 className="apris text-2xl tracking-tight">{post.title}</h2>
                <p className="text-black/60 text-sm mt-1 max-w-2xl truncate">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-black/50 uppercase tracking-wider">
                  <span>{post.createdAt?.toDate().toLocaleDateString() || "Unknown Date"}</span>
                  <span className="w-1 h-1 bg-black/20 rounded-full" />
                  <span className={post.published ? "text-green-600" : "text-amber-600"}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/blog/edit/${post.id}`}
                  className="px-4 py-2 text-sm border border-black/10 rounded hover:bg-black/5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
