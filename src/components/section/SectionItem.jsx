import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URLS } from "../../constants/urls";
import toast from "react-hot-toast";
import TipTapEditor from "../TipTapEditor";
import Input from "../Input";
import { Pencil, Save, Trash2, X } from "lucide-react";
import FileDropzone from "../ui/FileDropzone";

const SectionItem = ({ section, fetchData, onStartDelete }) => {
  const { register, reset, setValue, getValues } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(section.content);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("content", editContent);
      formData.append("position", section.position || 0);

      const fileList = getValues("image");
      if (fileList) formData.append("image", fileList);

      const response = await fetch(`${API_URLS.SECTIONS}/${section.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al actualizar la sección");

      toast.success("Sección actualizada");
      fetchData();
      setIsEditing(false);
      reset();
    } catch (err) {
      toast.error(err.message || "No se pudo actualizar la sección");
    }
  };

  const renderEditMode = () => {
    if (section.sectionTypeName === "Imagen") {
      return (
        <FileDropzone
          name="image"
          label="Imagen de la publicación"
          register={register}
          setValue={setValue}
        />
      );
    }
    if (section.sectionTypeName === "Texto") {
      return <TipTapEditor content={editContent} onChange={setEditContent} />;
    }
    return (
      <Input
        name="content"
        type="text"
        defaultValue={section.content}
        register={register}
        onChange={(e) => setEditContent(e.target.value)}
      />
    );
  };

  const renderContent = () => {
    switch (section.sectionTypeName) {
      case "Título":
        return <h2 className="text-xl font-semibold">{section.content}</h2>;
      case "Texto":
        return (
          <div
            className="prose prose-sm"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        );
      case "Imagen":
        return (
          <img
            src={
              section.content
                ? `${API_URLS.UPLOADS}/${section.content}`
                : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            }
            alt="Imagen de sección"
            className="max-w-full rounded"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-2 mt-4 bg-white rounded flex justify-between items-start hover:bg-gray-100">
      <div className="flex-1 space-y-2">
        {isEditing ? renderEditMode() : renderContent()}
      </div>
      <div className="flex gap-2 mt-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800"
              title="Guardar"
            >
              <Save size={18} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-600 hover:text-red-800"
              title="Cancelar"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-600 hover:text-indigo-800"
              title="Editar"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onStartDelete(section)}
              className="text-gray-600 hover:text-red-800"
              title="Eliminar"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SectionItem;
