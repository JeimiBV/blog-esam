import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Select = ({
  options,
  name,
  label,
  placeholder,
  optionId,
  register,
  required,
  errors,
  onChange: externalOnChange,
}) => {
  const [selected, setSelected] = useState([0]);

  const handleChange = (e) => {
    const selectedItem = options.find((p) => String(p.id) === e.target.value);
    setSelected(selectedItem);
    if (externalOnChange) {
      externalOnChange(e, selectedItem);
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label || placeholder}
      </label>
      <div className="relative mt-2">
        <select
          id={name}
          className={`
    block w-full appearance-none rounded-md bg-white py-2 pl-3 pr-10 text-base text-gray-900
    outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 
    focus:outline-indigo-600 sm:text-sm
    ${errors?.[name] ? "outline-red-500" : ""}
  `}
          defaultValue="0"
          {...register(name, {
            required: required && "Este campo es obligatorio",
            validate: (value) =>
              value !== "0" || "Selecciona una opción válida",
          })}
          onChange={handleChange}
        >
          <option value="0" disabled hidden>
            -- {placeholder || `Selecciona el ${name}`} --
          </option>

          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item[optionId]}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown size={15} />
        </div>
      </div>

      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1" id={`${name}-error`}>
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default Select;
