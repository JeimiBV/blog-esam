import React from "react";
import Input from "../../Input";

const DefaultSectionFields = ({
  sectionTypeName,
  register,
  setValue,
  errors,
}) => (
  <div className="w-full">
    <Input
      name="content"
      label="Contenido"
      placeholder={`Escribe un ${sectionTypeName}...`}
      as="input"
      setValue={setValue}
      register={register}
      required={`El ${sectionTypeName} es obligatorio`}
    />
    {errors?.content && (
      <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
    )}
  </div>
);

export default DefaultSectionFields;
