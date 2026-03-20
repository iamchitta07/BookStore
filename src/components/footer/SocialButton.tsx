import type { IconType } from "react-icons";

interface SocialButtonProps {
  icon: IconType;
  href: string;
  label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon: Icon, href, label }) => {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-secondary-btn text-secondary-btn transition-colors hover:bg-secondary-btn hover:text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:border-black hover:shadow-[2px_2px_0px_rgba(255,197,103,1)]"
    >
      <Icon size={24} />
    </a>
  );
};

export default SocialButton;
