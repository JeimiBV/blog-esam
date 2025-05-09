import React from "react";
import Input from "../Input";
import TipTapEditor from "../TipTapEditor";

const SectionInputFields = ({ type, register, setValue, errors }) => {
  if (!type) return null;

  const sectionTypeName = type.sectionTypeName.toLowerCase();

  if (sectionTypeName === "imagen") {
    return (
      <Input
        name="image"
        label="Imagen"
        type="file"
        setValue={setValue}
        register={register}
        errors={errors}
      />
    );
  }

  return (
    <div className="w-full">
      {sectionTypeName === "texto" ? (
        <div className="w-full">
          <label className="text-sm font-semibold mb-2 block">Contenido</label>
          <TipTapEditor
            onChange={(html) =>
              setValue("content", html, { shouldValidate: true })
            }
          />
        </div>
      ) : (
        <Input
          name="content"
          label="Contenido"
          placeholder={`Escribe un ${sectionTypeName}...`}
          as="input"
          setValue={setValue}
          register={register}
        />
      )}
      {errors.content && (
        <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
      )}
    </div>
  );
};

export default SectionInputFields;
