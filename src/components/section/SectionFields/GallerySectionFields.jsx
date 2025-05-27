import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GallerySectionFields = ({ setValue, errors }) => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const selected = Array.from(files);
    const previews = selected.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));
    const updatedImages = [...images, ...previews];
    setImages(updatedImages);
    setValue("gallery", updatedImages.map(img => img.file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <label className="block font-medium mb-2">Imágenes para la galería</label>

      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-all"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={openFileDialog}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleInputChange}
          ref={fileInputRef}
          className="hidden"
        />
        <p className="text-gray-600">Arrastra y suelta varias imágenes aquí, o haz clic para seleccionarlas.</p>
      </div>

      {errors?.gallery && (
        <p className="text-red-500 text-sm mt-2">{errors.gallery.message}</p>
      )}

      {images.length > 0 && (
        <div className="mt-6">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            loop={false} 
            speed={600} 
          referencia y autor 
            spaceBetween={10}
            slidesPerView={1}
            className="w-full max-w-md mx-auto"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={img.url}
                    alt={`Imagen ${index + 1}`}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default GallerySectionFields;
