"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type BlogPost = {
  id: string;
  title: string;
  status: string;
  createdAt: any;
};

export default function AdminBlogDashboard() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogPost[];
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post? This cannot be undone.")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete the post.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
        <div>
          <h1 className="apris text-5xl font-normal tracking-tight text-black">
            Posts
          </h1>
          <p className="mt-2 text-sm text-[#00000099] font-inter">
            Manage your blog articles, drafts, and published works.
          </p>
        </div>
        <Link
          href="/admin/blog/create"
          className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-[#D0D0D0] sm:rounded-none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#D0D0D0]">
            <thead>
              <tr className="bg-[#EFE4DB]/30">
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-black uppercase tracking-wider sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0D0D0] bg-white">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                    Loading posts...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                    No posts found. Start writing!
                  </td>
                </tr>
              ) : (
                blogs.map((post) => (
                  <tr key={post.id} className="hover:bg-[#EFE4DB]/20 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6 max-w-[200px] sm:max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#00000099]">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        post.status === 'published' 
                        ? 'bg-green-50 text-green-700 ring-green-600/20' 
                        : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                      }`}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#00000099]">
                      {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-4">
                      <Link href={`/admin/blog/edit/${post.id}`} className="text-black hover:underline transition-colors">
                        Edit<span className="sr-only">, {post.title}</span>
                      </Link>
                      <button 
                        onClick={() => handleDelete(post.id)} 
                        className="text-red-600 hover:text-red-900 hover:underline transition-colors"
                      >
                        Delete<span className="sr-only">, {post.title}</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
