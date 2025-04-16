import React from "react";
import Header from "../components/common/Header";
import { useFetch } from "../hooks/useFetch ";
import { Pencil, Trash } from "lucide-react";
import Table from "../components/common/Table";

const PostTypePage = () => {
  const {
    data: users,
    loading,
    error,
    //refetch,
  } = useFetch("http://localhost:8081/post-types/search");

  const columns = [
    { label: "N°", key: "" },
    { label: "Nombre del tipo de publicación", key: "postTypeName" },
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

      <Header title={"Áreas"} />

      {!loading && !error && (
        <div className="min-h-screen px-4 py-6 bg-white">
          <Table
            tableName={"Tipos de publicación"}
            tableDescription={"Lista de tipos de publicación"}
            columns={columns}
            data={users}
            addButton={
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                onClick={() => console.log("Add Post Type")}
              >
                Agregar Rol
              </button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default PostTypePage;
