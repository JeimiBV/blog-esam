import { PaperclipIcon } from "lucide-react";
import React from "react";
import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch ";
import SectionForm from "../section/SectionForm";
import SectionManager from "../section/SectionManager";

const PostView = () => {
  const { id } = useParams();
  const { data: postData } = useFetch(`http://localhost:8081/posts/${id}`);

  const infoItems = [
    {
      label: "Autor",
      value: `${postData?.authorName} ${postData?.authorLastName}`,
    },
    { label: "Fecha de publicación", value: postData?.postDate },
    { label: "Tipo de publicación", value: postData?.postTypeName },
    { label: "Área", value: postData?.areaName },
  ];

  return (
    <div className="px-6 py-4">
      <img
        src={
          postData.imageUrl
            ? `http://localhost:8081/uploads/${postData.imageUrl}`
            : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }
        alt={postData.title}
        className="w-full max-h-[400px] object-cover rounded-lg shadow"
      />

      <div className="px-4 mt-2">
        <h1 className="text-3xl font-semibold text-gray-800">
          {postData?.title}
        </h1>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          {postData?.subtitle}
        </p>
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
            <dt className="text-sm/6 font-medium text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="flex w-0 flex-1 items-center">
                <PaperclipIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-gray-400"
                />
                <div className="flex min-w-0 flex-1 gap-2">
                  <span className="mx-4 font-medium">
                    resume_back_end_developer.pdf
                  </span>
                  <span className="shrink-0 text-gray-400">2.4mb</span>
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
