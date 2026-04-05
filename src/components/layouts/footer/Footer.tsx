import { Link } from "react-router-dom";
import Logo from "/icons/LOGO.svg";
import { FaFacebookF, FaInstagram, FaFigma, FaGithub } from "react-icons/fa6";
import SocialButton from "./SocialButton";

const navLinksCol1 = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about" },
  { label: "YOUR CART", to: "/cart" },
  { label: "WISHLIST", to: "/wishlist" },
];

const navLinksCol2 = [
  { label: "ADD AUTHOR", to: "/add-author" },
  { label: "WANT TO BE A VENDOR", to: "/vendor" },
  { label: "REPORT A BUG", to: "/report-bug" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFigma, href: "#", label: "Figma" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-black px-6 pt-2 pb-6">
      {/* Main bordered container */}
      <div className="w-full border-secondary-btn px-6 py-6 sm:px-10 md:px-14">
        <div className="flex justify-between items-end">
          <div className="flex items-end gap-20 h-full">
            {/* Left — Logo */}
            <div className="transition-opacity hover:opacity-80">
              <Link to="/">
                <img src={Logo} alt="logo image" width={100} />
              </Link>
            </div>
            {/* Center — Nav Links */}
            <div className="flex gap-10">
              <ul className="flex flex-col gap-2 justify-end">
                {navLinksCol1.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xl font-medium tracking-wide text-secondary-btn transition-opacity hover:opacity-80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 justify-end">
                {navLinksCol2.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xl font-medium tracking-wide text-secondary-btn transition-opacity hover:opacity-80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Social Media */}
          <div className="flex flex-col gap-3">
            <span className="text-xl font-semibold tracking-wider text-secondary-btn">
              FOLLOW US ON
            </span>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <SocialButton
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="flex w-full items-center justify-center gap-10 px-6 text-xs text-secondary-btn">
        <div>© All rights reserved</div>
        <div>
          <Link to="/privacy" className="opacity-90 hover:opacity-100">
            Privacy and Policy
          </Link>
          {" | "}
          <Link to="/terms" className="opacity-90 hover:opacity-100">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
