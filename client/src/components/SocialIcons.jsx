import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaSpotify,
  FaSoundcloud,
  FaGlobe,
} from "react-icons/fa";

// Helper function to determine social media icon
export const SocialIcons = ({ link }) => {
  if (link.includes("facebook")) return <FaFacebook size={24} />;
  if (link.includes("instagram")) return <FaInstagram size={24} />;
  if (link.includes("twitter")) return <FaTwitter size={24} />;
  if (link.includes("youtube")) return <FaYoutube size={24} />;
  if (link.includes("spotify")) return <FaSpotify size={24} />;
  if (link.includes("soundcloud")) return <FaSoundcloud size={24} />;
  // Add website icon as default
  return <FaGlobe size={24} />;
};
