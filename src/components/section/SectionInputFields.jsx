import React, { useState, useEffect } from "react";
import Input from "../Input";
import TipTapEditor from "../TipTapEditor";
import FileDropzone from "../ui/FileDropzone";
import { Facebook, Instagram, Twitter } from "lucide-react";

const SectionInputFields = ({ type, register, setValue, errors, postId }) => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [socialLinkInput, setSocialLinkInput] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const savedLinks = localStorage.getItem(`socialLinks-${postId}`);
    if (savedLinks) {
      const parsedLinks = JSON.parse(savedLinks);
      setSocialLinks(parsedLinks);
      setValue('socialLinks', parsedLinks);
    }
  }, [postId, setValue]);

  const socialMediaTypes = [
    {
      id: 1,
      name: 'Facebook',
      placeholder: 'https://facebook.com/tu-pagina',
      icon: <Facebook className="w-4 h-4 text-blue-600" />,
    },
    {
      id: 2,
      name: 'Instagram',
      placeholder: 'https://instagram.com/tu-usuario',
      icon: <Instagram className="w-4 h-4 text-pink-500" />,
    },
    {
      id: 3,
      name: 'Twitter',
      placeholder: 'https://twitter.com/tu-perfil',
      icon: <Twitter className="w-4 h-4 text-sky-500" />,
    },
  ];

  const handleAddSocialLink = () => {
    if (selectedPlatform && socialLinkInput) {
      const newLink = {
        platform: selectedPlatform,
        url: socialLinkInput,
      };

      const updatedLinks = [...socialLinks, newLink];
      setSocialLinks(updatedLinks);
      setValue("socialLinks", updatedLinks);
      localStorage.setItem(`socialLinks-${postId}`, JSON.stringify(updatedLinks));
      setSelectedPlatform("");
      setSocialLinkInput("");
    }
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
    setValue("socialLinks", updatedLinks);
    localStorage.setItem(`socialLinks-${postId}`, JSON.stringify(updatedLinks));
  };

  const extractYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : "";
  };

  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    const id = extractYouTubeVideoId(url);
    setVideoId(id);
    setValue("video", url, { shouldValidate: true });
  };



  if (!type) return null;

  const sectionTypeName = type.sectionTypeName.toLowerCase();

  if (sectionTypeName === "imagen") {
    return (
      <FileDropzone
        name="image"
        label="Imagen de la publicación"
        register={register}
        setValue={setValue}
        errors={errors}
      />
    );
  }

  if (sectionTypeName === "rrss") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Selecciona una red social
          </label>

          <select
            className="w-full p-2 border rounded-md"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="">-- Elegir red social --</option>
            {socialMediaTypes.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>

        {selectedPlatform && (
          <div className="flex gap-2 items-end">
            <Input
              name="socialLink"
              label="Enlace"
              value={socialLinkInput}
              onChange={(e) => setSocialLinkInput(e.target.value)}
              placeholder={
                socialMediaTypes.find((p) => p.name === selectedPlatform)?.placeholder
              }
              type="url"
              register={register}
              errors={errors}
              required
            />
            <button
              type="button"
              onClick={handleAddSocialLink}
              className="mb-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Agregar
            </button>
          </div>
        )}

        <div className="space-y-2">
          {socialLinks.map((link, index) => {
            const platformData = socialMediaTypes.find(p => p.name === link.platform);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded"
              >
                <div className="flex items-center gap-2">
                  {platformData?.icon}
                  <span className="font-medium">{link.platform}:</span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    {link.url}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Eliminar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (sectionTypeName === "video") {
    return (
      <div className="space-y-4">
        <Input
          name="video"
          label="Enlace de Video"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={videoUrl}
          onChange={handleVideoUrlChange}
          register={register}
          setValue={setValue}
          errors={errors}
        />

       {videoId && (
  <div className="mt-4">
    <p className="text-sm mb-1 font-medium">Miniatura del video:</p>
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="Miniatura del video"
        className="rounded-md shadow-md hover:opacity-90 transition w-full max-w-md"
      />
    </a>
  </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {sectionTypeName === "texto" ? (
        <div className="w-full">
          <label className="text-sm font-semibold mb-2 block">Contenido</label>
          <TipTapEditor
            onChange={(html) => setValue("content", html, { shouldValidate: true })}
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
