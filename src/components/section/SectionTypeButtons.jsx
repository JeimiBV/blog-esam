import { CaseUpper, Image, Text, Airplay, Youtube } from "lucide-react";
import React from "react";
import { useFetch } from "../../hooks/useFetch ";
import { API_URLS_SEARCH } from "../../constants/urls";

const SectionTypeButtons = ({ selected, onSelect }) => {
  const { data: sectionTypeData = [] } = useFetch(
    API_URLS_SEARCH.SECTION_TYPES
  );

  return (
    <div className="flex gap-2 mb-4">
      {sectionTypeData.map((type) => {
        const isSelected = selected?.id === type.id;

        return (
          <button
            key={type.id}
            onClick={() => onSelect(type)}
            className={`flex items-center gap-2 p-3 rounded-xl border ${
              isSelected
                ? "border-blue-500 bg-blue-100 text-blue-800"
                : "border-gray-300 bg-white text-gray-800"
            } shadow-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
          >
            {type.sectionTypeName === "Título" && <CaseUpper size={15} />}
            {type.sectionTypeName === "Texto" && <Text size={15} />} 
            {type.sectionTypeName === "Imagen" && <Image size={15} />}
             {type.sectionTypeName === "RRSS" && <Airplay size={15} />}
              {type.sectionTypeName === "Video" && <Youtube size={15} />}
            <span className="text-sm font-medium">{type.sectionTypeName}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SectionTypeButtons;
