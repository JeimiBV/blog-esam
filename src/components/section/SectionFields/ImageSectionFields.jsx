import React from "react";
import FileDropzone from "../../ui/FileDropzone";

const ImageSectionFields = ({ register, setValue, errors }) => (
  <FileDropzone
    name="image"
    label="Imagen de la publicación"
    register={register}
    setValue={setValue}
    errors={errors}
  />
);

export default ImageSectionFields;
