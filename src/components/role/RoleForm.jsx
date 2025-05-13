import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import { Edit2Icon, PlusCircleIcon } from "lucide-react";
import Input from "../Input";

const RoleForm = ({
  isModalOpen,
  setModalOpen,
  fetchData,
  selectedRole,
  setSelectedRole,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (selectedRole) {
      reset({
        name: selectedRole.roleName,
      });
    } else {
      reset({
        name: "",
      });
    }
  }, [selectedRole, reset]);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRole(null);
  };

  const onSubmit = async (data) => {
    try {
      const url = selectedRole
        ? `http://localhost:8081/roles/${selectedRole.id}`
        : "http://localhost:8081/roles";

      const method = selectedRole ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        errorData.map((error) => toast.error(error.message));
        reset();
        return;
      }

      reset();
      fetchData();
      setModalOpen(false);
      setSelectedRole(null);
      toast.success(
        selectedRole
          ? "Rol actualizado exitosamente"
          : "Rol creado exitosamente"
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      open={isModalOpen}
      setOpen={setModalOpen}
      title={selectedRole ? "Editar Rol" : "Crear Rol"}
      confirmText="Guardar"
      confirmClassName={
        selectedRole
          ? "bg-blue-600 text-white hover:bg-blue-500"
          : "bg-green-600 text-white hover:bg-green-500"
      }
      cancelText="Cancelar"
      cancelClassName="bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
      icon={
        selectedRole ? (
          <Edit2Icon className="w-8 h-8 text-blue-600" />
        ) : (
          <PlusCircleIcon className="w-8 h-8 text-green-600" />
        )
      }
      iconColor={selectedRole ? "text-blue-600" : "text-green-600"}
      iconColorBackground={selectedRole ? "bg-blue-100" : "bg-green-100"}
      onConfirm={() => handleSubmit(onSubmit)()}
      onCancel={() => closeModal()}
      onClose={() => closeModal()}
    >
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="Nombre del rol"
          placeholder="Escribe el nombre del rol..."
          register={register}
          required="Este campo es obligatorio"
          errors={errors}
        />
      </form>
    </Modal>
  );
};

export default RoleForm;
