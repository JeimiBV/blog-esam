import { Edit2Icon, PlusCircleIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import { API_URLS } from "../../constants/urls";

const PostTypeForm = ({
  isModalOpen,
  setModalOpen,
  fetchData,
  selectedPostType,
  setSelectedPostType,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (selectedPostType) {
      reset({
        name: selectedPostType.roleName,
      });
    } else {
      reset({
        name: "",
      });
    }
  }, [selectedPostType, reset]);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPostType(null);
  };

  const onSubmit = async (data) => {
    try {
      const url = selectedPostType
        ? `${API_URLS.POST_TYPES}/${selectedPostType.id}`
        : API_URLS.POST_TYPES;

      const method = selectedPostType ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          selectedPostType
            ? "Error al actualizar el tipo de publicación"
            : "Error al crear el tipo de publicación"
        );
      }

      reset();
      fetchData();
      setModalOpen(false);
      toast.success(
        selectedPostType
          ? "Tipo de publicación actualizado exitosamente"
          : "Tipo de publicación creado exitosamente"
      );
    } catch (error) {
      toast.error(error.message || "Error al guardar el tipo de publicación");
    }
  };

  return (
    <Modal
      open={isModalOpen}
      setOpen={setModalOpen}
      title={
        selectedPostType
          ? "Editar tipo de publicación"
          : "Crear tipo de publicación"
      }
      confirmText="Guardar"
      confirmClassName={
        selectedPostType
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-green-600 hover:bg-green-700 text-white"
      }
      cancelText="Cancelar"
      cancelClassName="bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
      icon={
        selectedPostType ? (
          <Edit2Icon className="w-8 h-8 text-blue-600" />
        ) : (
          <PlusCircleIcon className="w-8 h-8 text-green-600" />
        )
      }
      iconColor={selectedPostType ? "text-blue-600" : "text-green-600"}
      iconColorBackground={selectedPostType ? "bg-blue-100" : "bg-green-100"}
      onConfirm={() => handleSubmit(onSubmit)()}
      onCancel={() => closeModal()}
      onClose={() => closeModal()}
    >
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            name="name"
            label="Nombre del tipo de publicación"
            placeholder="Escribe el nombre del tipo de publicación..."
            register={register}
            required="Este campo es obligatorio"
            errors={errors}
          />
        </div>
      </form>
    </Modal>
  );
};

export default PostTypeForm;
