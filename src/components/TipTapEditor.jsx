import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Quote,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from "lucide-react";
import React from "react";
import Link from "@tiptap/extension-link";
import Modal from "./Modal";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

const TipTapEditor = ({ content = "", onChange }) => {
  const [showLinkModal, setShowLinkModal] = React.useState(false);
  const [url, setUrl] = React.useState("");
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
      Blockquote,
      Link.configure({
        openOnClick: false,
      }),
      Subscript,
      Superscript,
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
    {
      name: "blockquote",
      icon: <Quote size={18} />,
      isActive: editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      name: "link",
      icon: <LinkIcon size={18} />,
      isActive: editor.isActive("link"),
      onClick: () => {
        const existingUrl = editor?.getAttributes("link").href || "";
        setUrl(existingUrl);
        setShowLinkModal(true);
      },
    },
    {
      name: "subscript",
      icon: <SubscriptIcon size={18} />,
      isActive: editor.isActive("subscript"),
      onClick: () => editor.chain().focus().toggleSubscript().run(),
    },
    {
      name: "superscript",
      icon: <SuperscriptIcon size={18} />,
      isActive: editor.isActive("superscript"),
      onClick: () => editor.chain().focus().toggleSuperscript().run(),
    },
  ];

  return (
    <div className="space-y-2 w-full">
      <div className="flex gap-2 border-b border-gray-300 pb-2 w-full">
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
        className="w-full min-h-[200px] px-4 prose-xs"
        rows={5}
      />
      <Modal
        open={showLinkModal}
        setOpen={setShowLinkModal}
        title="Insertar enlace"
        message=""
        confirmText="Aplicar"
        onConfirm={() => {
          if (!editor || !url) return;

          const { empty } = editor.state.selection;

          editor.chain().focus();

          if (empty) {
            editor
              .chain()
              .insertContent(`<a href="${url}" target="_blank">${url}</a>`)
              .run();
          } else {
            editor.chain().extendMarkRange("link").setLink({ href: url }).run();
          }

          setShowLinkModal(false);
          setUrl("");
        }}
        onCancel={() => setUrl("")}
      >
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
      </Modal>
    </div>
  );
};

export default TipTapEditor;
