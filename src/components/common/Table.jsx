import React from "react";
import Input from "../Input";

const Table = ({ tableName, tableDescription, columns, data, addButton }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
      <div className="px-6 py-4 flex flex-col justify-between items-center bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col items-start w-full">
          <h2 className="text-xl font-semibold text-gray-800">{tableName}</h2>
          <p className="text-sm text-gray-500">{tableDescription}</p>
        </div>
        <div className="flex items-center w-full justify-end gap-4">
          {addButton && <div className="">{addButton}</div>}
          <Input
            placeholder="Buscar..."
            type="text"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 ">
            {data.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => {
                  if (col.type === "actions") {
                    return (
                      <td
                        key={`${item.id || colIndex}-${col.key}`}
                        className="px-6 py-4 whitespace-nowrap flex gap-2 "
                      >
                        {col.actions.map((action, i) => (
                          <span
                            key={i}
                            title={action.label}
                            onClick={() => action.onClick(item)}
                            className={`cursor-pointer hover:bg-gray-200 rounded-full p-2 ${action.className}`}
                          >
                            <action.icon size={20} />
                          </span>
                        ))}
                      </td>
                    );
                  }

                  return (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                      {col.type === "image" && col.key != "" ? (
                        <img
                          src={
                            item[col.key] ||
                            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                          }
                          alt="Imagen"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : col.key === "" ? (
                        index + 1
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
