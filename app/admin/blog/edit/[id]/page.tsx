"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Link from "next/link";
import "react-quill-new/dist/quill.snow.css";

// ReactQuill must be loaded dynamically on client-side only for NextJS
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  
  // Multiple images for gallery 
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  
  const [uploadingMedia, setUploadingMedia] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setContent(data.content || "");
          setCoverImageUrl(data.coverImage || "");
          setGalleryUrls(data.galleryImages || []);
        } else {
          setError("Post not found.");
        }
      } catch (err: any) {
        setError("Error fetching post: " + err.message);
      } finally {
        setFetching(false);
      }
    }
    fetchPost();
  }, [id]);

  // Handlers for file selection
  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      try {
        setUploadingMedia(true);
        const url = await uploadToCloudinary(file);
        setCoverImageUrl(url);
      } catch (err: any) {
        setError("Cover image upload failed: " + err.message);
      } finally {
        setUploadingMedia(false);
      }
    }
  };

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...files]);
      
      try {
        setUploadingMedia(true);
        const urls = await Promise.all(files.map((f) => uploadToCloudinary(f)));
        setGalleryUrls((prev) => [...prev, ...urls]);
      } catch (err: any) {
        setError("Gallery image upload failed: " + err.message);
      } finally {
        setUploadingMedia(false);
      }
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGalleryUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Update Firebase
      await updateDoc(doc(db, "blogs", id), {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        content,
        coverImage: coverImageUrl || "",
        galleryImages: galleryUrls || [],
        status,
        updatedAt: serverTimestamp(),
      });

      router.push("/admin/blog");
    } catch (err: any) {
      setError("Error updating post: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
        <div>
          <h1 className="apris text-5xl font-normal tracking-tight text-black">
            Edit Blog Post
          </h1>
          <p className="mt-1 text-sm text-[#00000099] font-inter">
            Make changes to your article and save them.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            Cancel
          </Link>
          <button
            onClick={() => handleSave("draft")}
            disabled={loading || uploadingMedia}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={loading || uploadingMedia}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50"
          >
            {loading ? "Saving..." : "Publish Updates"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="space-y-8 bg-white shadow-sm ring-1 ring-[#D0D0D0] p-6 md:p-8 rounded-none">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold leading-6 text-black uppercase tracking-wider">
            Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full border-0 py-2.5 px-3 text-black bg-white shadow-sm ring-1 ring-inset ring-[#D0D0D0] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-none"
              style={{ color: "black" }}
              placeholder="e.g. 5 Trends in African PR"
            />
          </div>
        </div>

        {/* Cover Image Upload (Cloudinary) */}
        <div>
          <label className="block text-sm font-semibold leading-6 text-black uppercase tracking-wider mb-2">
            Cover Image
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border border-[#D0D0D0] border-dashed cursor-pointer bg-white hover:bg-gray-50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <svg className="w-8 h-8 mb-4 text-[#888888]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-black"><span className="font-semibold">{coverImageUrl ? "Click to replace cover" : "Click to upload cover"}</span> or drag and drop</p>
                <p className="text-xs text-[#888888]">PNG, JPG or WEBP (MAX. 5MB)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleCoverChange} />
            </label>
          </div>
          {coverImageUrl && (
            <div className="mt-4">
              <img src={coverImageUrl} alt="Cover Preview" className="h-32 w-auto object-cover rounded shadow-sm border" />
            </div>
          )}
        </div>

        {/* Gallery Uploads */}
        <div className="pt-6 border-t border-[#D0D0D0]">
          <label className="block text-sm font-semibold leading-6 text-black uppercase tracking-wider mb-2">
            Gallery Images (Optional)
          </label>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleGalleryChange} 
            className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 transition-colors cursor-pointer"
          />
          {galleryUrls.length > 0 && (
            <div className="mt-4 flex gap-4 flex-wrap">
              {galleryUrls.map((url, i) => (
                <div key={i} className="relative inline-block">
                  <img src={url} alt={`Gallery ${i}`} className="h-24 w-24 object-cover rounded shadow-sm border" />
                  <button 
                    onClick={() => handleRemoveGalleryImage(i)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div className="pt-6 border-t border-[#D0D0D0] relative">
          <label className="block text-sm font-semibold leading-6 text-black uppercase tracking-wider mb-2">
            Content
          </label>
          <div className="bg-white text-black ring-1 ring-[#D0D0D0]" style={{ color: "black" }}>
            <ReactQuill 
              theme="snow" 
              value={content} 
              onChange={setContent} 
              className="min-h-[300px]"
              placeholder="Write the article content here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
