"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
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
      <div className="flex items-center justify-between mb-2 border-b border-black/10 pb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-black/70 mb-1">{label}</label>
          <p className="text-black/50 text-[11px]">Upload photos one by one to add them to your collection context gallery.</p>
        </div>
        <ImageUploader 
          buttonText="Add Image" 
          onUploadSuccess={handleImageAdded} 
          className="text-xs shrink-0" 
        />
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-white/50 border border-black/10 rounded-lg p-4">
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
        <div className="bg-white/50 border border-dashed border-black/20 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-white/70 transition-colors">
          <p className="text-black/50 text-sm mb-2">No images added to our work yet.</p>
          <p className="text-black/40 text-xs">Use the button above to upload images.</p>
        </div>
      )}
    </div>
  );
}
