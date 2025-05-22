import React, { useState } from "react";
import SectionTypeButtons from "./SectionTypeButtons";
import SectionInputFields from "./SectionInputFields";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { API_URLS } from "../../constants/urls";

const SectionForm = ({ postId, refetch }) => {
  const [sectionType, setSectionType] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  console.log("SectionForm", sectionType);
  const onSubmit = async (data) => {
    console.log("Contenido HTML enviado:", data.content);

    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("position", data.position || "1");
    formData.append("sectionTypeId", sectionType.id);
    formData.append("postId", postId);

    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      const response = await fetch(API_URLS.SECTIONS, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al guardar la sección");

      await refetch();
      toast.success("Sección creada correctamente");
      resetForm();
    } catch (error) {
      toast.error(error.message || "No se pudo guardar la sección");
    }
  };

  const resetForm = () => {
    setSectionType(null);
    setShowForm(false);
    reset();
  };

  return (
    <div className="my-6">
      <SectionTypeButtons
        selected={sectionType}
        onSelect={(type) => {
          setSectionType(type);
          setShowForm(true);
          reset();
        }}
      />

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 border border-gray-300 p-4">
          <SectionInputFields
            type={sectionType}
            register={register}
            setValue={setValue}
            errors={errors}
          />

          {sectionType.sectionTypeName != "RRSS" && (
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Guardar sección
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SectionForm;
