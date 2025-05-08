import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  ListIcon,
  ListOrderedIcon,
  UnderlineIcon,
} from "lucide-react";
import React from "react";

const TipTapEditor = ({ content = "", onChange }) => {
  const buttonBase = "p-2 rounded hover:bg-gray-200 transition";

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      BulletList,
      OrderedList,
    ],
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
    {
      name: "bulletList",
      icon: <ListIcon size={18} />,
      isActive: editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "orderedList",
      icon: <ListOrderedIcon size={18} />,
      isActive: editor.isActive("orderedList"),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
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
          w-full min-h-[200px]
          p-4 bg-red-50
          list-disc
          list-inside
        `}
        height={200}
      />
    </div>
  );
};

export default TipTapEditor;
