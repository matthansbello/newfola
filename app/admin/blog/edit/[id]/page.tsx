"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import MultiImageUploader from "@/components/admin/MultiImageUploader";

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
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
          setGalleryImages(data.galleryImages || []);
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
        galleryImages,
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
    return <div className="py-20 text-center uppercase tracking-widest text-sm text-black/50">Loading editor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10 border-b border-black/10 pb-4 flex justify-between items-center">
        <div>
          <h1 className="apris text-5xl text-black">Edit Post</h1>
          <p className="text-black/60 mt-2 font-inter">Update your story for the Fola PR blog.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
            className="px-6 py-2 border border-black/20 rounded font-medium uppercase tracking-wider text-xs hover:bg-black/5"
          >
            Save as Draft
          </button>
          <button
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="px-6 py-2 bg-black text-[#EFE4DB] rounded font-medium uppercase tracking-wider text-xs hover:opacity-80"
          >
            {loading ? "Saving..." : "Update & Publish"}
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
