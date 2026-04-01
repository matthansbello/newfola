"use client";

import ImageUploader from "./ImageUploader";
import { adminLabelClass } from "@/components/admin/form-classes";
import { FiX } from "react-icons/fi";

interface MultiImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
}

export default function MultiImageUploader({
  images,
  onChange,
  label = "Our work Images",
}: MultiImageUploaderProps) {

  const handleImageAdded = (url: string) => {
    onChange([...images, url]);
  };

  const handleRemove = (urlToRemove: string) => {
    onChange(images.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="mb-2 flex flex-col gap-3 border-b border-black/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label className={adminLabelClass}>{label}</label>
          <p className="text-[11px] leading-snug text-neutral-600">
            Upload photos one by one to add them to your collection context gallery.
          </p>
        </div>
        <ImageUploader 
          buttonText="Add Image" 
          onUploadSuccess={handleImageAdded} 
          className="text-xs shrink-0" 
        />
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 rounded-xl border border-neutral-200 bg-neutral-50/80 p-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url, i) => (
            <div key={`${url}-${i}`} className="relative group aspect-square rounded-md overflow-hidden bg-black/5 border border-black/5">
              <img src={url} alt={`Photo ${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-2 right-2 bg-white/90 text-black p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Remove image"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50/60 p-8 text-center transition-colors hover:bg-neutral-50">
          <p className="mb-2 text-sm text-neutral-600">No images added to our work yet.</p>
          <p className="text-xs text-neutral-500">Use the button above to upload images.</p>
        </div>
      )}
    </div>
  );
}
