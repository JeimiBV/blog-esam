import { Pencil, Trash } from "lucide-react";
import Table from "../common/Table";
import { useFetch } from "../../hooks/useFetch ";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import AreaForm from "./AreaForm";

const AreaTable = () => {
  const loadingToastId = useRef(null);
  const prevError = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);


  const {
    data: areas,
    loading,
    error,
    fetchData,
  } = useFetch("http://localhost:8081/areas/search");

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

  const handleEdit = (area) => {
    console.log("Edit Area:", area);
    setSelectedArea(area);
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (area) => {
    setSelectedArea(area);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/areas/${selectedArea?.id}`,
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
      setSelectedArea(null);
    }
  };

  const columns = [
    { label: "N°", key: "" },
    { label: "Nombre del área", key: "areaName" },
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
          onClick: (area) => handleDelete(area),
        },
      ],
    },
  ];

  return (
    <>
      <Table
        tableName={"Áreas"}
        tableDescription={"Lista de áreas"}
        columns={columns}
        data={areas}
        addButton={
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Agregar Área
          </button>
        }
      />

      <AreaForm
        isModalOpen={isCreateModalOpen}
        setModalOpen={setIsCreateModalOpen}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        fetchData={fetchData}
      />

      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Eliminar área"
        message="¿Seguro que deseas eliminar esta área? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        confirmClassName="bg-red-600 text-white hover:bg-red-500"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        icon={<Trash className="w-8 h-8 text-red-600" />}
      />
    </>
  );
};

export default AreaTable;
