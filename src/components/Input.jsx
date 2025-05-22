
const Input = ({
  name,
  label,
  placeholder,
  register = () => {},
  required,
  watch = () => {},
  value,
  errors,
  type = "text",
  as = "input",
  rows = 6,
  maxLength = 500,
  ...rest
}) => {
  const currentValue = watch(name) || "";

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
              maxLength={maxLength}
              defaultValue={value}
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
        {as === "textarea" && (
          <div className="mt-1 text-right text-sm text-gray-500">
            {currentValue.length}/{maxLength} caracteres
          </div>
        )}
        {errors?.[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
