// Use this helper to upload a File object directly to Cloudinary from the browser
export async function uploadToCloudinary(file: File): Promise<string> {
  // TODO: Replace with your Cloudinary Cloud Name & Upload Preset
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME";
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "YOUR_UPLOAD_PRESET";

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Cloudinary Upload Failed");
    }

    const data = await response.json();
    return data.secure_url; // Returns the uploaded image URL string
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
