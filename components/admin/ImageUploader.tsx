"use client";

import { useState } from "react";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: any) => void;
  className?: string;
  buttonText?: string;
}

export default function ImageUploader({
  onUploadSuccess,
  onUploadError,
  className,
  buttonText = "Upload Image",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      
      if (data.secure_url) {
        onUploadSuccess(data.secure_url);
      } else {
        throw new Error("Upload failed, no URL returned.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      if (onUploadError) onUploadError(error);
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  return (
    <div className={`relative inline-block ${className || ""}`}>
      <label className="cursor-pointer inline-flex items-center justify-center rounded-md border border-black/10 bg-white/50 px-4 py-2 text-sm font-medium text-black shadow-sm transition-colors hover:bg-white focus:outline-none disabled:opacity-50">
        {isUploading ? "Uploading..." : buttonText}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
