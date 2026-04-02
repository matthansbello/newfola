"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import MultiImageUploader from "@/components/admin/MultiImageUploader";
import { adminInputClass, adminLabelClass, adminTextareaClass } from "@/components/admin/form-classes";

export default function EditBlogForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [ourWorkImages, setOurWorkImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setExcerpt(data.excerpt || "");
          setContent(data.content || "");
          setCoverImage(data.coverImage || "");
          setOurWorkImages(data.galleryImages || []);
        } else {
          alert("No such document!");
          router.push("/admin/blog");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setFetching(false);
      }
    }

    fetchPost();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent, published: boolean) => {
    e.preventDefault();
    if (!title) return alert("Title is required");

    setLoading(true);
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const docRef = doc(db, "blogs", id);

      await updateDoc(docRef, {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        galleryImages: ourWorkImages,
        published,
        updatedAt: serverTimestamp(),
      });
      
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Check console.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white/80 py-20 text-center text-sm font-medium uppercase tracking-widest text-neutral-500 shadow-sm">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl pb-20">
      <div className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="apris text-4xl text-neutral-900 sm:text-5xl">Edit Post</h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Update your story for the Fola PR blog.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:shrink-0 sm:gap-3">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
            className="rounded-xl border border-black/20 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="rounded-xl border-2 border-neutral-900 bg-neutral-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#EFE4DB] transition-colors hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Update & Publish"}
          </button>
        </div>
      </div>

      <div className="space-y-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <label className={adminLabelClass}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${adminInputClass} text-lg sm:text-xl`}
            placeholder="E.g., The Future of African Luxury"
            required
          />
        </div>

        <div>
          <label className={adminLabelClass}>Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className={adminTextareaClass}
            placeholder="A short summary of the article..."
          />
        </div>

        <div>
          <label className={adminLabelClass}>Cover Image</label>
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
           <MultiImageUploader images={ourWorkImages} onChange={setOurWorkImages} />
        </div>

        <div>
          <label className={adminLabelClass}>Content</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}
