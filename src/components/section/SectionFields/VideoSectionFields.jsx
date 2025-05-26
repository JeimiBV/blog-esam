import { useState } from "react";
import Input from "../../Input";

const extractYouTubeVideoId = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : "";
};

const VideoSectionFields = ({ register, setValue, errors }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    const id = extractYouTubeVideoId(url);
    setVideoId(id);
    setValue("video", url, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <Input
        name="content"
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
};

export default VideoSectionFields;
