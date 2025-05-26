import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URLS } from "../../constants/urls";
import toast from "react-hot-toast";
import TipTapEditor from "../TipTapEditor";
import Input from "../Input";
import { Pencil, Save, Trash, Trash2, X } from "lucide-react";
import FileDropzone from "../ui/FileDropzone";
import '@justinribeiro/lite-youtube';


const SectionItem = ({ section, fetchData, onStartDelete }) => {
  const { register, reset, setValue, getValues, errors } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(section.content);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (section.sectionTypeName === "Imagen") {
      setImagePreview(
        section.content ? `${API_URLS.UPLOADS}/${section.content}` : null
      );
    }
  }, [section]);

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("image", null);
  };

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
        (imagePreview && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-800">
              Imagen seleccionada:
            </p>
            <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-[130px] h-auto rounded-md border border-gray-300 object-cover"
              />
              <div className="flex flex-col justify-between h-full">
                <p className="text-sm text-gray-600 break-all max-w-xs">
                  {section.imageUrl}
                </p>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-2 inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )) || (
          <FileDropzone
            name="image"
            label="Imagen de la publicación"
            register={register}
            setValue={setValue}
            required="La imagen es obligatoria"
            errors={errors}
          />
        )
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

  const extractYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    console.log(match[1])
    return match ? match[1] : "";
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
      case "Video":
        return (
          <lite-youtube
            videoid={extractYouTubeVideoId(section.content)}
            className="w-full max-w-2xl rounded-lg shadow"
          ></lite-youtube>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-2 mt-4 bg-white rounded flex justify-between items-start hover:bg-gray-100 space-x-3">
      <div className="flex-1 space-y-2 align-content-center">
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
