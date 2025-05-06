import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Underline, UnderlineIcon } from "lucide-react";
import React from "react";

const TipTapEditor = ({ content = "", onChange }) => {
  const buttonBase = "p-2 rounded hover:bg-gray-200 transition";

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  const toolbarItems = [
    {
      name: "bold",
      icon: <Bold size={18} />,
      isActive: editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "italic",
      icon: <Italic size={18} />,
      isActive: editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      name: "underline",
      icon: <UnderlineIcon size={18} />,
      isActive: editor.isActive("underline"),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
  ];


  return (
    <div className="space-y-2">
      <div className="flex gap-2 border-b pb-2">
        {toolbarItems.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={item.onClick}
            className={`${buttonBase} ${item.isActive ? "bg-gray-300" : ""}`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <EditorContent
        editor={editor}
        className={`
          w-full max-w-3xl min-h-[200px]
          p-4 rounded-md bg-white
          border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-indigo-600
        `}
      />
    </div>
  );
};

export default TipTapEditor;
