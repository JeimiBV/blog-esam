import Table from "../common/Table";

const AreasTable = ({ loading, error, areas, columns, setIsCreating }) => {
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen px-4 py-6">
      <Table
        tableName={"Áreas"}
        tableDescription={"Lista de áreas"}
        columns={columns}
        data={areas}
        addButton={
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => setIsCreating(true)}
          >
            Agregar Área
          </button>
        }
      />
    </div>
  );
};

export default AreasTable;
