import { useState } from "react";
import Input from "../../Input";
import Select from "../../Select";
import { useFetch } from "../../../hooks/useFetch ";
import { API_URLS, API_URLS_SEARCH } from "../../../constants/urls";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const SocialSectionFields = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const { data: socialMediaTypes } = useFetch(API_URLS_SEARCH.SOCIAL_NETWORKS);
  const { data: postSocialNetworks, fetchData } = useFetch(
    `${API_URLS_SEARCH.POST_SOCIAL_NETWORKS}${id}`
  );

  const onSubmit = async (data) => {
    data.postId = id;
    try {
      const url = `${API_URLS.POST_SOCIAL_NETWORKS}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error");
      }

      reset();
      await fetchData();
      toast.success("Red social agregada correctamente");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveLink = async (id) => {
    try {
      const response = await fetch(`${API_URLS.POST_SOCIAL_NETWORKS}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la red social");
      }

      toast.success("Red social eliminada correctamente");
      reset();
      await fetchData();
    } catch (err) {
      toast.error("Ocurrió un error al eliminar", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Select
          name="socialNetworkId"
          optionId="name"
          options={socialMediaTypes}
          value={selectedPlatform}
          placeholder="Selecciona una red social"
          register={register}
          onChange={(e) => {
            const selectedItem = socialMediaTypes.find(
              (p) => p.id === Number(e.target.value)
            );
            setSelectedPlatform(selectedItem);
          }}
        />
      </div>

      {selectedPlatform && (
        <div className="flex gap-2 items-end">
          <Input
            name="link"
            label="Enlace"
            type="url"
            register={register}
            errors={errors}
            required
          />
          <button
            type="button"
            className="mb-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleSubmit(onSubmit)}
          >
            Agregar
          </button>
        </div>
      )}

      <div className="space-y-2">
        {postSocialNetworks.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-100 rounded"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.socialNetworkName}:</span>
                <a
                  href={item.link}
                  target="_blank"
                  className="text-blue-600 underline text-sm"
                >
                  {item.link}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveLink(item.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Eliminar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialSectionFields;
