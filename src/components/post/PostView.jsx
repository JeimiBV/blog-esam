import {
  PaperclipIcon,
  Facebook,
  Instagram,
  Twitter,
  Link2,
} from "lucide-react";
import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch ";
import SectionManager from "../section/SectionManager";
import { API_URLS, API_URLS_SEARCH } from "../../constants/urls";
import SocialIcon from "../common/SocialIcon";
import { useEffect } from "react";

const getIconClassName = (name) => {
  switch (name) {
    case "Facebook":
      return "h-5 w-5 text-[#1877F2]";
    case "Instagram":
      return "h-5 w-5 text-[#E4405F]";
    case "Twitter":
      return "h-5 w-5 text-[#1DA1F2]";
    default:
      return "h-5 w-5 text-gray-500";
  }
};

const PostView = () => {
  const { id } = useParams();
  const {
    data: postData,
    loading,
    error,
  } = useFetch(`${API_URLS.POSTS}/${id}`);
  const { data: socialData } = useFetch(
    `${API_URLS_SEARCH.POST_SOCIAL_NETWORKS}${id}`
  );

  useEffect(() => {
    console.log("Social Data:", socialData);
  }, [socialData]);

  if (loading)
    return <div className="p-4 text-gray-600">Cargando publicación...</div>;
  if (error)
    return <div className="p-4 text-red-600">Error: {error.message}</div>;

  const infoItems = [
    {
      label: "Autor",
      value:
        `${postData?.authorName || ""} ${
          postData?.authorLastName || ""
        }`.trim() || "Cargando...",
    },
    {
      label: "Fecha de publicación",
      value: postData?.postDate || "Fecha no disponible",
    },
    {
      label: "Tipo de publicación",
      value: postData?.postTypeName || "Tipo no especificado",
    },
    {
      label: "Área",
      value: postData?.areaName || "Área no definida",
    },
  ];

  return (
    <div className="px-6 py-4">
      <img
        src={
          postData?.imageUrl
            ? `http://localhost:8081/uploads/${postData.imageUrl}`
            : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }
        alt={postData?.title || "Post"}
        className="w-full max-h-[400px] object-cover rounded-lg shadow"
      />

      <div className="space-y-2 mt-2">
        <h1 className="text-3xl font-semibold text-gray-800">
          {postData?.title || "Título del post"}
        </h1>
        <p className="mt-1 text-sm/6 text-gray-500">{postData?.summary}</p>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {infoItems.map(({ label, value }, idx) => (
            <div
              key={idx}
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt className="text-sm/6 font-medium text-gray-900">{label}</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {value}
              </dd>
            </div>
          ))}

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Redes Sociales
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="space-y-2">
                {socialData?.map((social, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <SocialIcon
                      name={social.socialNetworkIcon}
                      className={getIconClassName(social.socialNetworkIcon)}
                    />
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {social.link}
                    </a>
                  </div>
                ))}
                {socialData?.length === 0 && (
                  <div className="text-gray-500">
                    No hay redes sociales agregadas
                  </div>
                )}
              </div>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Archivos Adjuntos
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="flex w-0 flex-1 items-center">
                <PaperclipIcon className="size-5 shrink-0 text-gray-400" />
                <div className="flex min-w-0 flex-1 gap-2">
                  <span className="mx-4 font-medium">
                    {postData?.attachments?.[0]?.name || "documento.pdf"}
                  </span>
                  <span className="shrink-0 text-gray-400">
                    {postData?.attachments?.[0]?.size || "2.4mb"}
                  </span>
                </div>
              </div>
            </dd>
          </div>

          <SectionManager postId={id} />
        </dl>
      </div>
    </div>
  );
};

export default PostView;
