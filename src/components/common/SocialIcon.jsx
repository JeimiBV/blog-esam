import * as Icons from "lucide-react";

const SocialIcon = ({ name, className = "w-5 h-5" }) => {
  const IconComponent = Icons[name];

  if (!IconComponent) return null;

  return <IconComponent className={className} />;
};

export default SocialIcon;
