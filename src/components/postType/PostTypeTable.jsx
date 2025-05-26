import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch ";
import toast from "react-hot-toast";
import { Pencil, Trash } from "lucide-react";
import PostTypeForm from "./PostTypeForm";
import Modal from "../Modal";
import Table from "../common/Table";
import { API_URLS, API_URLS_SEARCH } from "../../constants/urls";

const PostTypeTable = () => {
  const loadingToastId = useRef(null);
  const prevError = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState(null);

  const {
    data: areas,
    loading,
    error,
    fetchData,
  } = useFetch(API_URLS_SEARCH.POST_TYPES);

  useEffect(() => {
    if (loading && !loadingToastId.current) {
      loadingToastId.current = toast.loading("Cargando áreas...");
    }

    if (!loading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }

    if (error && error !== prevError.current) {
      toast.error("Error al cargar las áreas");
      prevError.current = error;
    }

    if (!error) {
      prevError.current = null;
    }
  }, [loading, error]);

  const handleEdit = (postType) => {
    console.log("Edit Area:", postType);
    setSelectedPostType(postType);
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (postType) => {
    setSelectedPostType(postType);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${API_URLS.POST_TYPES}/${selectedPostType?.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la publicación");
      }

      toast.success("Publicación eliminada correctamente");

      await fetchData();
    } catch (err) {
      toast.error(err.message || "No se pudo eliminar la publicación");
    } finally {
      setIsModalOpen(false);
      setSelectedPostType(null);
    }
  };

  const columns = [
    { label: "N°", key: "" },
    { label: "Nombre del tipo de publicación", key: "postTypeName" },
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "Editar",
          icon: Pencil,
          className: "text-blue-900",
          onClick: (area) => handleEdit(area),
        },
        {
          label: "Eliminar",
          icon: Trash,
          className: "text-red-500",
          onClick: (area) => handleDelete(area.id),
        },
      ],
    },
  ];

  return (
    <>
      <Table
        tableName={"Tipos de publicación"}
        tableDescription={"Lista de tipos de publicación"}
        columns={columns}
        data={areas}
        addButton={
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Agregar Tipo de Publicación
          </button>
        }
      />

      <PostTypeForm
        isModalOpen={isCreateModalOpen}
        setModalOpen={setIsCreateModalOpen}
        selectedPostType={selectedPostType}
        setSelectedPostType={setSelectedPostType}
        fetchData={fetchData}
      />

      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Eliminar tipo de publicación"
        message="¿Seguro que deseas eliminar este tipo de publicación? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        confirmClassName="bg-red-600 text-white hover:bg-red-500"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        icon={<Trash className="w-8 h-8 text-red-600" />}
      />
    </>
  );
};

export default PostTypeTable;
