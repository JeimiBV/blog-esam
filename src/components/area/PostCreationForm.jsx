import PostForm from "../Form";

const PostCreationForm = ({ fields, setIsCreating }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Nueva Publicación</h2>
      <PostForm fields={fields} backButton={setIsCreating} />
    </div>
  );
};

export default PostCreationForm;
