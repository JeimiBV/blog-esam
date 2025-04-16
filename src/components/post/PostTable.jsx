import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch ";
import Table from "../common/Table";
import toast from "react-hot-toast";
import { Eye, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import Modal from "../Modal";

const PostTable = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const {
    data: posts,
    loading,
    error,
    fetchData,
  } = useFetch("http://localhost:8081/posts/search");

  const loadingToastId = useRef(null);
  const prevError = useRef(null);

  useEffect(() => {
    if (loading && !loadingToastId.current) {
      loadingToastId.current = toast.loading("Cargando publicaciones...");
    }

    if (!loading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }

    if (error && error !== prevError.current) {
      toast.error("Error al cargar las publicaciones");
      prevError.current = error;
    }

    if (!error) {
      prevError.current = null;
    }
  }, [loading, error]);

  const handleEdit = (id) => {
    navigate(`/posts/edit/${id}`);
  };

  const handleDelete = (id) => {
    setSelectedPostId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/posts/${selectedPostId}`,
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
      toast.error("Ocurrió un error al eliminar", err);
    } finally {
      setIsModalOpen(false);
      setSelectedPostId(null);
    }
  };

  const columns = [
    { label: "N°", key: "" },
    { label: "Título", key: "title" },
    { label: "Imagen", key: "imageUrl", type: "image" },
    { label: "Fecha de publicación", key: "postDate" },
    { label: "Tipo de publicación", key: "postTypeName" },
    { label: "Área", key: "areaName" },
    { label: "Autor", key: "authorName" },
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "Ver",
          icon: Eye,
          className: "text-green-500",
          onClick: (post) => navigate(`/posts/${post.id}`),
        },
        {
          label: "Editar",
          icon: Pencil,
          className: "text-blue-900",
          onClick: (post) => handleEdit(post.id),
        },
        {
          label: "Eliminar",
          icon: Trash,
          className: "text-red-500",
          onClick: (post) => handleDelete(post.id),
        },
      ],
    },
  ];

  return (
    <>
      <Table
        tableName="Publicaciones"
        tableDescription="Lista de publicaciones"
        columns={columns}
        data={posts}
        actionButtons
        addButton={
          <button
            onClick={() => navigate("/posts/create")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Agregar Publicación
          </button>
        }
      />

      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Eliminar publicación"
        message="¿Seguro que deseas eliminar esta publicación? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        icon={<Trash className="w-8 h-8 text-red-600" />}
      />
    </>
  );
};

export default PostTable;
