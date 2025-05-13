import React from "react";

const Input = ({
  name,
  label,
  placeholder,
  register = () => {},
  required,
  value,
  errors,
  type = "text",
  as = "input",
  rows = 6,
  ...rest
}) => {
  const baseClass =
    "block grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm resize-none";

  const borderClass = `
    flex items-start rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300
    has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600
    ${errors?.[name] ? "outline-red-500" : ""}
  `;

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {label || placeholder}
        </label>
      )}
      <div className="">
        <div className={borderClass}>
          {as === "textarea" ? (
            <textarea
              rows={rows}
              id={name}
              placeholder={placeholder}
              value={value}
              {...register(name, { required })}
              className={baseClass}
              {...rest}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              value={value}
              placeholder={placeholder}
              {...register(name, { required })}
              className={baseClass}
              {...rest}
            />
          )}
        </div>
        {errors?.[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
