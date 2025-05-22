import SectionForm from "./SectionForm";
import { useFetch } from "../../hooks/useFetch ";
import { API_URLS_SEARCH } from "../../constants/urls";
import SectionEditor from "./SectionEditor";

const SectionManager = ({ postId }) => {
  const {
    data: sectionData,
    loading,
    error,
    fetchData,
  } = useFetch(`${API_URLS_SEARCH.SECTIONS}?postId=${postId}`);

  return (
    <>
      <div className="bg-white border-b border-gray-200 pb-2 mt-4">
        <h2 className="text-2xl font-bold mb-4">Gestión de Secciones</h2>
        <p className="text-sm">
          Aquí puedes gestionar las secciones de tu publicación. Agrega, edita o
          elimina secciones según sea necesario.
        </p>
      </div>
      <SectionEditor
        sectionData={sectionData}
        loading={loading}
        error={error}
        fetchData={fetchData}
      />
      <SectionForm postId={postId} refetch={fetchData} />
    </>
  );
};

export default SectionManager;