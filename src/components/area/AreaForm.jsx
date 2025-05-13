import React, { useEffect } from "react";
import Modal from "../Modal";
import Input from "../Input";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Edit2Icon, PlusCircleIcon } from "lucide-react";

const AreaForm = ({
  isModalOpen,
  setModalOpen,
  fetchData,
  selectedArea,
  setSelectedArea,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (selectedArea) {
      reset({
        name: selectedArea.areaName,
      });
    } else {
      reset();
    }
  }, [selectedArea, reset]);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedArea(null);
  };

  const onSubmit = async (data) => {
    try {
      const url = selectedArea
        ? `http://localhost:8081/areas/${selectedArea.id}`
        : "http://localhost:8081/areas";

      const method = selectedArea ? "PUT" : "POST";

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
      toast.success(
        selectedArea
          ? "Área actualizada exitosamente"
          : "Área creada exitosamente"
      );
    } catch (error) {
      toast.error(error.message || "Error al guardar el área");
    }
  };

  return (
    <Modal
      open={isModalOpen}
      setOpen={setModalOpen}
      title={selectedArea ? "Editar Área" : "Crear Área"}
      confirmText="Guardar"
      confirmClassName={
        selectedArea
          ? "bg-blue-600 text-white hover:bg-blue-500"
          : "bg-green-600 text-white hover:bg-green-500"
      }
      cancelText="Cancelar"
      cancelClassName="bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
      icon={
        selectedArea ? (
          <Edit2Icon className="w-8 h-8 text-blue-600" />
        ) : (
          <PlusCircleIcon className="w-8 h-8 text-green-600" />
        )
      }
      iconColor={selectedArea ? "text-blue-600" : "text-green-600"}
      iconColorBackground={selectedArea ? "bg-blue-100" : "bg-green-100"}
      onConfirm={closeModal}
      onCancel={closeModal}
    >
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            name="name"
            label="Nombre del área"
            placeholder="Escribe el nombre del área..."
            register={register}
            required="Este campo es obligatorio"
            errors={errors}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AreaForm;
