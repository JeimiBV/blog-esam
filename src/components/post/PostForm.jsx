import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch ";
import Input from "../Input";
import Select from "../Select";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { API_URLS, API_URLS_SEARCH } from "../../constants/urls";
import FileDropzone from "../ui/FileDropzone";

const PostForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: areaData } = useFetch(API_URLS_SEARCH.AREAS);
  const { data: authorData } = useFetch(API_URLS_SEARCH.USERS);
  const { data: postTypeData } = useFetch(API_URLS_SEARCH.POST_TYPES);

  const { fetchData: savePost } = useFetch("", {}, false);
  const { data: postData } = useFetch(
    isEdit ? `${API_URLS.POSTS}/${id}` : null
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isEdit && postData) {
      let fixedDate = "";

      if (postData.postDate) {
        const parts = postData.postDate.split("-");
        if (parts.length === 3) {
          const day = parts[0];
          const month = parts[1];
          const year = parts[2];

          fixedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
            2,
            "0"
          )}`;
        }
      }

      const fixedData = {
        ...postData,
        postDate: fixedDate,
      };

      reset(fixedData);
    }
  }, [isEdit, postData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("summary", data.subtitle);
      formData.append("postDate", data.postDate);
      formData.append("areaId", data.areaId);
      formData.append("authorId", data.authorId);
      formData.append("postTypeId", data.postTypeId);

      if (data.image) {
        formData.append("image", data.image);
      }

      const url = isEdit ? `${API_URLS.POSTS}/${id}` : API_URLS.POSTS;
      const method = isEdit ? "PUT" : "POST";

      await savePost(url, {
        method,
        body: formData,
      });

      toast.success(
        `Publicación ${isEdit ? "actualizada" : "creada"} con éxito`
      );
      navigate("/posts");
    } catch (err) {
      console.error("Error:", err);
      toast.error(`Error al ${isEdit ? "actualizar" : "crear"} la publicación`);
    }
  };

  const pageTitle = isEdit ? "Editar Publicación" : "Crear Publicación";
  const pageDescription = `Formulario para ${
    isEdit ? "editar" : "crear"
  } una publicación`;

  return (
    <>
      <div className="px-6 py-4 flex justify-between items-center bg-gray-50 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{pageTitle}</h2>
          <p className="text-sm text-gray-500">{pageDescription}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
        <Input
          name="title"
          label="Título"
          placeholder="Escribe un título..."
          register={register}
          required="Este campo es obligatorio"
          errors={errors}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="subtitle"
            label="Resumen"
            placeholder="Escribe un breve resumen..."
            register={register}
            required="Este campo es obligatorio"
            errors={errors}
            as="textarea"
            rows={5}
          />
          <FileDropzone
            name="image"
            label="Imagen de la publicación"
            register={register}
            setValue={setValue}
            required="La imagen es obligatoria"
            errors={errors}
          />

          <Input
            name="postDate"
            label="Fecha de la publicación"
            type="date"
            register={register}
            required="Este campo es obligatorio"
            errors={errors}
          />

          <Select
            options={areaData}
            register={register}
            name={"areaId"}
            optionId={"areaName"}
            label={"Área"}
            placeholder={"Selecciona un área"}
            required="Este campo es obligatorio"
            errors={errors}
          />

          <Select
            options={authorData}
            register={register}
            name={"authorId"}
            optionId={"name"}
            label={"Autor"}
            placeholder={"Selecciona un autor"}
            required="Este campo es obligatorio"
            errors={errors}
          />

          <Select
            options={postTypeData}
            register={register}
            name={"postTypeId"}
            optionId={"postTypeName"}
            label={"Tipo de publicación"}
            placeholder={"Selecciona un tipo de publicación"}
            required="Este campo es obligatorio"
            errors={errors}
          />
        </div>

        <div className="flex gap-6 justify-end mt-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
            onClick={() => navigate("/posts")}
          >
            Volver
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isEdit ? "Actualizar" : "Crear"} Publicación
          </button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
