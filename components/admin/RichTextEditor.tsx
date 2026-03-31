"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ImageUploader from "./ImageUploader";
import { FiBold, FiItalic, FiList } from "react-icons/fi";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-black/10 p-2 bg-[#EFE4DB]/50 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-black/10 transition-colors ${
          editor.isActive("bold") ? "bg-black/10 text-black font-bold" : "text-black/70"
        }`}
        title="Bold"
      >
        <FiBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-black/10 transition-colors ${
          editor.isActive("italic") ? "bg-black/10 text-black font-bold" : "text-black/70"
        }`}
        title="Italic"
      >
        <FiItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-black/10 transition-colors font-bold ${
          editor.isActive("heading", { level: 2 }) ? "bg-black/10 text-black font-bold" : "text-black/70"
        }`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-black/10 transition-colors ${
          editor.isActive("bulletList") ? "bg-black/10 text-black font-bold" : "text-black/70"
        }`}
        title="Bullet List"
      >
        <FiList />
      </button>

      <div className="ml-auto flex items-center">
        <ImageUploader 
          onUploadSuccess={addImage} 
          buttonText="Add Image" 
        />
      </div>
    </div>
  );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[200px] p-4 text-black font-inter [&_p]:mb-4 [&_h2]:text-3xl [&_h2]:apris [&_h2]:tracking-wider [&_h2]:mb-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-md [&_img]:my-4",
      },
    },
  });

  return (
    <div className="rounded-lg border border-black/10 bg-white shadow-sm overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
