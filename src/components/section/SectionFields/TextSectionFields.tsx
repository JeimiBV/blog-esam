import TipTapEditor from "../../TipTapEditor";

const TextSectionFields = ({ setValue, errors }) => (
  <div className="w-full">
    <label className="text-sm font-semibold mb-2 block">Contenido</label>
    <TipTapEditor
      onChange={(html) => setValue("content", html, { shouldValidate: true })}
      error={errors?.content}
    />
    {errors?.content && (
      <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
    )}
  </div>
);

export default TextSectionFields;
