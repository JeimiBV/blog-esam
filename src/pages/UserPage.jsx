import React from "react";
import Header from "../components/common/Header";
import Table from "../components/common/Table";
import { Pencil, Trash } from "lucide-react";
import { useFetch } from "../hooks/useFetch ";

const UserPage = () => {
  const {
    data: users,
    loading,
    error,
    //refetch,
  } = useFetch("http://localhost:8081/users/search");

  const columns = [
    { label: "N°", key: "" },
    { label: "Nombre", key: "name" },
    { label: "Apellido", key: "lastName" },
    { label: "Correo", key: "email" },
    { label: "Rol", key: "roleName" },
    {
      label: "Acciones",
      type: "actions",
      actions: [
        {
          label: "Editar",
          icon: Pencil,
          onClick: (row) => console.log("Edit", row),
          className: "hover:text-blue-800",
        },
        {
          label: "Eliminar",
          icon: Trash,
          onClick: (row) => console.log("Delete", row),
          className: "hover:text-red-800",
        },
      ],
    },
  ];
  return (
    <div className="flex-1 overflow-auto relative z-10">
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <Header title={"Usuarios"} />

      {!loading && !error && (
        <div className="min-h-screen px-4 py-6 bg-white">
          <Table
            tableName={"Usuarios"}
            tableDescription={"Lista de usuarios"}
            columns={columns}
            data={users}
            addButton={
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Agregar Rol
              </button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default UserPage;
