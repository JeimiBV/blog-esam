import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import { API_URLS } from "../../constants/urls";
import SectionItem from "./SectionItem";

const SectionEditor = ({ sectionData, fetchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_URLS.SECTIONS}/${sectionToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error al eliminar la sección");

      toast.success("Sección eliminada");
      fetchData();
    } catch (err) {
      toast.error(err.message || "No se pudo eliminar la sección");
    } finally {
      setIsModalOpen(false);
      setSectionToDelete(null);
    }
  };

  return (
    <div className="mt-6 divide-y divide-gray-100 w-full">
      {sectionData?.map((section) => (
        <SectionItem
          key={section.id}
          section={section}
          fetchData={fetchData}
          onStartDelete={(section) => {
            setSectionToDelete(section);
            setIsModalOpen(true);
          }}
        />
      ))}

      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Eliminar sección"
        message="¿Seguro que deseas eliminar esta sección? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        confirmClassName="bg-red-600 text-white hover:bg-red-500"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        icon={<Trash className="w-8 h-8 text-red-600" />}
      />
    </div>
  );
};

export default SectionEditor;
