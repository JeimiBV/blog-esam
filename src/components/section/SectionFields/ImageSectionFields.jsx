import React, { useState } from "react";
import FileDropzone from "../../ui/FileDropzone";

const ImageSectionFields = ({ register, setValue, errors }) => {
  const [showMetadata, setShowMetadata] = useState(false);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setShowMetadata(checked);

    if (!checked) {
    
      setValue("referencia", "");
      setValue("autor", "");
    }
  };

  return (
    <div className="space-y-4">
      <FileDropzone
        name="image"
        label="Imagen de la publicación"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showMetadata"
          onChange={handleCheckboxChange}
          checked={showMetadata}
          className="w-4 h-4"
        />
        <label htmlFor="showMetadata" className="text-sm text-gray-700">
          ¿Incluir referencia Y/O autor?
        </label>
      </div>

      {showMetadata && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Referencia</label>
            <input
              type="text"
              {...register("referencia")}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            />
            {errors?.referencia && (
              <p className="text-red-500 text-xs mt-1">{errors.referencia.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Autor</label>
            <input
              type="text"
              {...register("autor")}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            />
            {errors?.autor && (
              <p className="text-red-500 text-xs mt-1">{errors.autor.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSectionFields;
