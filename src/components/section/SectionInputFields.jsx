import DefaultSectionFields from "./SectionFields/DefaultSectionFields";
import ImageSectionFields from "./SectionFields/ImageSectionFields";
import SocialSectionFields from "./SectionFields/SocialSectionFields";
import TextSectionFields from "./SectionFields/TextSectionFields";
import VideoSectionFields from "./SectionFields/VideoSectionFields";

const SectionInputFields = ({ type, register, setValue, errors  }) => {

  const sectionTypeName = type.sectionTypeName.toLowerCase();

  switch (sectionTypeName) {
    case "imagen":
      return <ImageSectionFields register={register} setValue={setValue} errors={errors} />;
    case "texto":
      return <TextSectionFields setValue={setValue} errors={errors} />;
    case "video":
      return <VideoSectionFields register={register} setValue={setValue} errors={errors} />;
    case "rrss":
      return <SocialSectionFields register={register} setValue={setValue} errors={errors} />;
    default:
      return <DefaultSectionFields sectionTypeName={sectionTypeName} register={register} setValue={setValue} errors={errors} />;
  }
};

export default SectionInputFields;
