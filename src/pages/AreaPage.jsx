import React, { useState } from "react";
import Header from "../components/common/Header";
import { Pencil, Trash } from "lucide-react";
import { useFetch } from "../hooks/useFetch ";
import PostCreationForm from "../components/area/PostCreationForm";
import AreasTable from "../components/area/AreasTable";

function AreaPage() {
  const [isCreating, setIsCreating] = useState(false);

  const {
    data: areas,
    loading,
    error,
    //refetch
  } = useFetch("http://localhost:8081/areas/search");

  const fields = [
    { name: "areaName", label: "Nombre del área", required: true },
  ];

  const columns = [
    { label: "N°", key: "" },
    { label: "Nombre del área", key: "areaName" },
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
      <Header title={"Áreas"} />
      {isCreating ? (
        <PostCreationForm fields={fields} setIsCreating={setIsCreating} />
      ) : (
        <AreasTable
          loading={loading}
          error={error}
          areas={areas}
          columns={columns}
          setIsCreating={setIsCreating}
        />
      )}
    </div>
  );
}

export default AreaPage;
