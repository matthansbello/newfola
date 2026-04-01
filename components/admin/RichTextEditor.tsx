"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiLink,
} from "react-icons/fi";
import { RxHeading } from "react-icons/rx";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const ToolbarButton = ({
  onClick,
  title,
  children,
  active,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  active?: boolean;
}) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault(); // prevent editor losing focus
      onClick();
    }}
    title={title}
    className={`p-2 rounded text-sm transition-colors ${
      active
        ? "bg-black text-[#EFE4DB]"
        : "text-black/70 hover:bg-black/10 hover:text-black"
    }`}
  >
    {children}
  </button>
);

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Set initial content once on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content || "";
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const exec = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLink = () => {
    const url = window.prompt("Enter URL:", "https://");
    if (url) exec("createLink", url);
  };

  const handleHeading = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    const parent = range.commonAncestorContainer.parentElement;

    if (parent?.tagName === "H2") {
      exec("formatBlock", "p");
    } else {
      exec("formatBlock", "h2");
    }
  };

  return (
    <div className="rounded-lg border border-black/10 bg-white shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-black/10 p-2 bg-[#EFE4DB]/50">
        <ToolbarButton onClick={() => exec("bold")} title="Bold">
          <FiBold />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} title="Italic">
          <FiItalic />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("underline")} title="Underline">
          <FiUnderline />
        </ToolbarButton>

        <span className="w-px h-5 bg-black/15 mx-1" aria-hidden />

        <ToolbarButton onClick={handleHeading} title="Heading 2">
          <RxHeading className="text-base" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertUnorderedList")} title="Bullet List">
          <FiList />
        </ToolbarButton>

        <span className="w-px h-5 bg-black/15 mx-1" aria-hidden />

        <ToolbarButton onClick={handleLink} title="Insert Link">
          <FiLink />
        </ToolbarButton>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className={[
          "focus:outline-none min-h-[240px] p-5 text-black text-[0.95rem] leading-relaxed",
          "[&_p]:mb-4",
          "[&_h2]:text-3xl [&_h2]:tracking-wider [&_h2]:mb-4 [&_h2]:mt-6",
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4",
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4",
          "[&_a]:underline [&_a]:text-black/70",
          "[&_strong]:font-semibold",
        ].join(" ")}
        data-placeholder="Start writing your story..."
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: rgba(0,0,0,0.3);
          pointer-events: none;
        }
        [contenteditable] h2 {
          font-family: 'apris', serif;
          font-weight: normal;
        }
      `}</style>
    </div>
  );
}
