import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch ";
import Input from "../Input";
import Select from "../Select";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { API_URLS, API_URLS_SEARCH } from "../../constants/urls";
import { Edit, Trash } from "lucide-react";
import FileDropzone from "../ui/FileDropzone";
import SocialIcon from "../common/SocialIcon";

const getIconClassName = (name) => {
  switch (name) {
    case "Facebook":
      return "h-5 w-5 text-[#1877F2]";
    case "Instagram":
      return "h-5 w-5 text-[#E4405F]";
    case "Twitter":
      return "h-5 w-5 text-[#1DA1F2]";
    default:
      return "h-5 w-5 text-gray-500";
  }
};

const PostForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [newPlatform, setNewPlatform] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const { data: socialMediaOptions } = useFetch(
    API_URLS_SEARCH.SOCIAL_NETWORKS
  );
  const { data: areaData } = useFetch(API_URLS_SEARCH.AREAS);
  const { data: authorData } = useFetch(API_URLS_SEARCH.USERS);
  const { data: postTypeData } = useFetch(API_URLS_SEARCH.POST_TYPES);
  const { data: postData } = useFetch(
    isEdit ? `${API_URLS.POSTS}/${id}` : null
  );
  const { fetchData: savePost } = useFetch("", {}, false);
  const { data: socialMedia, fetchData } = useFetch(
    isEdit ? `${API_URLS_SEARCH.POST_SOCIAL_NETWORKS}${id}` : null
  );

  const cancelEdit = () => {
    setNewPlatform("");
    setEditingItem(null);
  };

  const handleEditSocial = (item) => {
    console.log(item);
    setEditingItem(item);
  };

  const handleUpdateSocial = async (socialNetwork) => {
    try {
      const response = await fetch(
        `${API_URLS.POST_SOCIAL_NETWORKS}/${socialNetwork.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            socialNetworkId: newPlatform,
            link: watch("link"),
            postId: socialNetwork.postId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error");
      }

      toast.success("Red social actualizada correctamente");
      setNewPlatform("");
      setEditingItem(null);
      await fetchData();
    } catch (err) {
      toast.error("Ocurrió un error al actualizar", err);
    }
  };

  const handleDeleteSocial = async (id) => {
    try {
      const response = await fetch(`${API_URLS.POST_SOCIAL_NETWORKS}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error");
      }

      toast.success("Red social eliminada correctamente");

      await fetchData();
    } catch (err) {
      toast.error("Ocurrió un error al eliminar", err);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("image", null);
  };

  useEffect(() => {
    if (isEdit && postData) {
      let fixedDate = "";

      if (postData.postDate) {
        const parts = postData.postDate.split("-");
        if (parts.length === 3) {
          const [day, month, year] = parts;
          fixedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
            2,
            "0"
          )}`;
        }
      }

      setImagePreview(
        postData.imageUrl ? `${API_URLS.UPLOADS}/${postData.imageUrl}` : null
      );

      reset({ ...postData, postDate: fixedDate });
    }
  }, [isEdit, postData, reset]);

  const onSubmit = async (data) => {
    console.log("Form data:", data);
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

      await savePost(url, { method, body: formData });

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
              <div className="flex items-center gap-4 p-3 bg-gray-50 border rounded-lg">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-[130px] h-auto rounded-md border object-cover"
                />
                <div>
                  <p className="text-sm text-gray-600 break-all max-w-xs">
                    {postData.imageUrl}
                  </p>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
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
            name="areaId"
            label="Área"
            placeholder="Selecciona un área"
            options={areaData}
            optionId="areaName"
            register={register}
            required="Este campo es obligatorio"
            errors={errors}
          />

          <Select
            name="authorId"
            label="Autor"
            placeholder="Selecciona un autor"
            options={authorData}
            optionId="name"
            register={register}
            required="Este campo es obligatorio"
            errors={errors}
          />

          <Select
            name="postTypeId"
            label="Tipo de publicación"
            placeholder="Selecciona un tipo de publicación"
            options={postTypeData}
            optionId="postTypeName"
            register={register}
            required="Este campo es obligatorio"
            errors={errors}
          />
        </div>

        {isEdit && (
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              Redes Sociales
            </dt>
            <div className="space-y-4 mt-2 col-span-2">
              {socialMedia.map((social, index) => (
                <div key={index} className="group">
                  {editingItem?.id === social.id ? (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Select
                        value={newPlatform}
                        onChange={(e) => setNewPlatform(e.target.value)}
                        options={socialMediaOptions}
                        className="w-1/2"
                        optionId="name"
                        placeholder="Selecciona una red social"
                      />
                      <Input
                        name="link"
                        label="Enlace"
                        register={register}
                        placeholder="Escribe el enlace..."
                        required="Este campo es obligatorio"
                        className="w-1/2"
                        errors={errors}
                      />
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateSocial(social)}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          ✓
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-2 py-1 bg-gray-500 text-white rounded"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <SocialIcon
                        name={social.socialNetworkIcon}
                        className={getIconClassName(social.socialNetworkIcon)}
                      />
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex-1"
                      >
                        {social.link}
                      </a>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditSocial(social)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSocial(social.id)}
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
          </div>
        )}
        <div className="flex gap-6 justify-end mt-4">
          <button
            type="button"
            onClick={() => navigate("/posts")}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Volver
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isEdit ? "Actualizar" : "Crear"} Publicación
          </button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
