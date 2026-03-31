"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./quill-fola.css"; // We will create this customized CSS

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[200px] flex items-center justify-center text-black/40 text-sm uppercase tracking-widest bg-white/50 border border-black/10 rounded-lg">
      Loading Editor...
    </div>
  ),
});

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div className="rounded-lg border border-black/10 bg-white shadow-sm overflow-hidden quill-fola-editor">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="text-black font-inter min-h-[200px]"
      />
    </div>
  );
}
