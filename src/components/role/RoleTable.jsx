import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch ";
import toast from "react-hot-toast";
import { Pencil, Trash } from "lucide-react";
import Table from "../common/Table";
import Modal from "../Modal";
import RoleForm from "./RoleForm";

const RoleTable = () => {
  const loadingToastId = useRef(null);
  const prevError = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const {
    data: areas,
    loading,
    error,
    fetchData,
  } = useFetch("http://localhost:8081/roles/search");

  useEffect(() => {
    if (loading && !loadingToastId.current) {
      loadingToastId.current = toast.loading("Cargando roles...");
    }

    if (!loading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }

    if (error && error !== prevError.current) {
      toast.error("Error al cargar las roles");
      prevError.current = error;
    }

    if (!error) {
      prevError.current = null;
    }
  }, [loading, error]);

  const handleEdit = (area) => {
    setSelectedRole(area);
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (id) => {
    setSelectedRoleId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/roles/${selectedRoleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la publicación");
      }

      toast.success("Rol eliminado correctamente");

      await fetchData();
    } catch (err) {
      toast.error("Ocurrió un error al eliminar", err);
    } finally {
      setIsModalOpen(false);
      setSelectedRoleId(null);
    }
  };

  const columns = [
    { label: "N°", key: "" },
    { label: "Nombre del rol", key: "roleName" },
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
        tableName={"Roles"}
        tableDescription={"Lista de roles"}
        columns={columns}
        data={areas}
        addButton={
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            onClick={() => {
              setIsCreateModalOpen(true);
            }}
          >
            Agregar Rol
          </button>
        }
      />

      <RoleForm
        isModalOpen={isCreateModalOpen}
        setModalOpen={setIsCreateModalOpen}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        fetchData={fetchData}
      />

      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Eliminar rol"
        message="¿Seguro que deseas eliminar este rol? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        confirmClassName="bg-red-600 text-white hover:bg-red-500"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        icon={<Trash className="w-8 h-8 text-red-600" />}
      />
    </>
  );
};

export default RoleTable;
