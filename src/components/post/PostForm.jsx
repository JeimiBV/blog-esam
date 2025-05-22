import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch ";
import Input from "../Input";
import Select from "../Select";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { API_URLS, API_URLS_SEARCH } from "../../constants/urls";
import { Facebook, Instagram, Twitter, Link2, Edit, Trash } from "lucide-react";
import FileDropzone from "../ui/FileDropzone";

const PostForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [socialMedia, setSocialMedia] = useState([
    {
      platform: "Facebook",
      url: "https://facebook.com/ejemplo",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/ejemplo",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/ejemplo",
    },
  ]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const socialMediaOptions = [
    { name: "Facebook", placeholder: "https://facebook.com/tu-pagina" },
    { name: "Instagram", placeholder: "https://instagram.com/tu-usuario" },
    { name: "Twitter", placeholder: "https://twitter.com/tu-perfil" },
  ];

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
    watch,
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

      setImagePreview(
        postData.imageUrl ? `${API_URLS.UPLOADS}/${postData.imageUrl}` : null
      );

      const fixedData = {
        ...postData,
        postDate: fixedDate,
      };

      reset(fixedData);
    }
  }, [isEdit, postData, reset]);

  // Handlers para redes sociales
  const handleAddSocial = () => {
    if (newPlatform && newUrl) {
      setSocialMedia([...socialMedia, { platform: newPlatform, url: newUrl }]);
      setNewPlatform("");
      setNewUrl("");
    }
  };

  const handleEditSocial = (index) => {
    setEditingIndex(index);
    setNewPlatform(socialMedia[index].platform);
    setNewUrl(socialMedia[index].url);
  };

  const handleUpdateSocial = () => {
    if (editingIndex >= 0 && newPlatform && newUrl) {
      const updatedSocials = [...socialMedia];
      updatedSocials[editingIndex] = { platform: newPlatform, url: newUrl };
      setSocialMedia(updatedSocials);
      cancelEdit();
    }
  };

  const handleDeleteSocial = (index) => {
    setSocialMedia(socialMedia.filter((_, i) => i !== index));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setNewPlatform("");
    setNewUrl("");
  };

  const getIcon = (platform) => {
    switch (platform) {
      case "Facebook":
        return <Facebook className="h-5 w-5 text-[#1877F2]" />;
      case "Instagram":
        return <Instagram className="h-5 w-5 text-[#E4405F]" />;
      case "Twitter":
        return <Twitter className="h-5 w-5 text-[#1DA1F2]" />;
      default:
        return <Link2 className="h-5 w-5 text-gray-500" />;
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("summary", data.summary);
      formData.append("postDate", data.postDate);
      formData.append("areaId", data.areaId);
      formData.append("authorId", data.authorId);
      formData.append("postTypeId", data.postTypeId);

      if (data.image instanceof File) {
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

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("image", null);
  };

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
            name="summary"
            label="Resumen"
            placeholder="Escribe un breve resumen..."
            register={register}
            watch={watch}
            required="Este campo es obligatorio"
            errors={errors}
            as="textarea"
            rows={5}
          />
          {imagePreview ? (
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
                    {postData.imageUrl}
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
          ) : (
            <FileDropzone
              name="image"
              label="Imagen de la publicación"
              register={register}
              setValue={setValue}
              required="La imagen es obligatoria"
              errors={errors}
            />
          )}

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

        <Input
          name="subtitle"
          label="Resumen"
          placeholder="Escribe un breve resumen..."
          register={register}
          required="Este campo es obligatorio"
          errors={errors}
          as="textarea"
          rows={6}
        />

        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">
            Redes Sociales
          </dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <div className="space-y-4">
              {socialMedia.map((social, index) => (
                <div key={index} className="group relative">
                  {editingIndex === index ? (
                    <div className="flex gap-2 items-center p-2 bg-gray-50 rounded-lg">
                      <select
                        value={newPlatform}
                        onChange={(e) => setNewPlatform(e.target.value)}
                        className="p-1 border rounded-md flex-1"
                      >
                        {socialMediaOptions.map((option) => (
                          <option key={option.name} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="url"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder={
                          socialMediaOptions.find((p) => p.name === newPlatform)
                            ?.placeholder
                        }
                        className="p-1 border rounded-md flex-2 w-full"
                      />
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={handleUpdateSocial}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          ✓
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      {getIcon(social.platform)}
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex-1"
                      >
                        {social.url}
                      </a>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditSocial(index)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSocial(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </dd>
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
