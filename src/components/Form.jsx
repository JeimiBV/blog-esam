import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ fields, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-md shadow"
    >
      {fields.map(({ name, label, type = "text", required, options }) => (
        <div key={name}>
          <label className="block font-medium">{label}</label>

          {type === "text" || type === "number" || type === "email" ? (
            <input
              type={type}
              {...register(name, {
                required: required && `El campo ${label} es obligatorio`,
              })}
              className="w-full border border-gray-300 rounded p-2"
            />
          ) : type === "select" ? (
            <select
              {...register(name, {
                required: required && `El campo ${label} es obligatorio`,
              })}
              className="w-full border border-gray-300 rounded p-2"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === "file" ? (
            <input
              type="file"
              {...register(name, {
                required: required && `El campo ${label} es obligatorio`,
              })}
              className="w-full border border-gray-300 rounded p-2"
            />
          ) : null}

          {errors[name] && (
            <p className="text-red-500 text-sm">{errors[name].message}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Enviar
      </button>
    </form>
  );
};

export default Form;
