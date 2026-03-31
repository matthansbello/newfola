"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import MultiImageUploader from "@/components/admin/MultiImageUploader";

export default function NewBlogPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent, published: boolean) => {
    e.preventDefault();
    if (!title) return alert("Title is required");

    setLoading(true);
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      await addDoc(collection(db, "blogs"), {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        galleryImages,
        published,
        createdAt: serverTimestamp(),
      });
      
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10 border-b border-black/10 pb-4 flex justify-between items-center">
        <div>
          <h1 className="apris text-5xl text-black">New Post</h1>
          <p className="text-black/60 mt-2 font-inter">Craft a new story for the Fola PR blog.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
            className="px-6 py-2 border border-black/20 rounded font-medium uppercase tracking-wider text-xs hover:bg-black/5"
          >
            Save Draft
          </button>
          <button
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="px-6 py-2 bg-black text-[#EFE4DB] rounded font-medium uppercase tracking-wider text-xs hover:opacity-80"
          >
            {loading ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-black/70 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-1 focus:ring-black/30"
            placeholder="E.g., The Future of African Luxury"
            required
          />
        </div>

        <div>
           <label className="block text-xs font-semibold uppercase tracking-widest text-black/70 mb-2">Excerpt</label>
           <textarea
             value={excerpt}
             onChange={(e) => setExcerpt(e.target.value)}
             className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black/30 min-h-[100px]"
             placeholder="A short summary of the article..."
           />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-black/70 mb-2">Cover Image</label>
          {coverImage ? (
            <div className="relative rounded-lg overflow-hidden border border-black/10 inline-block">
              <img src={coverImage} alt="Cover" className="h-48 w-auto object-cover" />
              <button 
                onClick={() => setCoverImage("")}
                className="absolute top-2 right-2 bg-white/80 backdrop-blur text-black text-xs px-2 py-1 rounded shadow-sm hover:bg-white"
              >
                Remove
              </button>
            </div>
          ) : (
            <ImageUploader onUploadSuccess={setCoverImage} buttonText="Upload Cover Photo" />
          )}
        </div>

        <div>
           <MultiImageUploader images={galleryImages} onChange={setGalleryImages} />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-black/70 mb-2">Content</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}
