import {  useState } from "react";
import Dropzone from "react-dropzone";

const FileDropzone = ({ name, label, setValue, errors }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setValue(name, file, { shouldValidate: true });
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {label}
        </label>
      )}

      <Dropzone
        onDrop={handleDrop}
        multiple={false}
        accept={{ "image/*": [] }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => {
          const borderClass = `
            flex flex-col items-center justify-center px-4 py-12 text-center rounded-md border-2 border-dashed cursor-pointer transition h-[115px]
            ${
              isDragActive
                ? "border-indigo-400 bg-indigo-50"
                : "border-gray-300 bg-white hover:bg-gray-50 hover:border-indigo-600"
            }
            ${errors?.[name] ? "border-red-500 bg-red-50" : ""}
          `;

          return (
            <div {...getRootProps({ className: borderClass })}>
              <input id={name} name={name} {...getInputProps()} />
              {selectedFile ? (
                <>
                  <p className="text-gray-700 text-sm font-medium mb-2">
                    Archivo seleccionado:
                  </p>
                  <p className="text-gray-600 text-sm">{selectedFile.name}</p>
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  {isDragActive
                    ? "Suelta el archivo aquí..."
                    : "Arrastra una imagen o haz clic para seleccionarla"}
                </p>
              )}
            </div>
          );
        }}
      </Dropzone>

      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FileDropzone;