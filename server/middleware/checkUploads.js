import createError from "http-errors";

/**
 * @desc  Validates and converts media links to embed format
 */
export const checkMediaLinks = () => {
  return (req, res, next) => {
    try {
      const { media } = req.body;
      if (!media || !media.length) return next();

      const allowedPlatforms = [
        "YouTube",
        "Vimeo",
        "Spotify",
        "SoundCloud",
        "Apple Music",
        "Bandcamp",
        "Audiomack",
      ];

      req.body.media = media.map((item) => {
        if (!item.url || !item.platform) {
          throw createError(
            400,
            "Media items must include both URL and platform"
          );
        }

        if (!allowedPlatforms.includes(item.platform)) {
          throw createError(
            400,
            `Invalid platform. Allowed: ${allowedPlatforms.join(", ")}`
          );
        }

        return {
          ...item,
          url: convertToEmbed(item.url, item.platform),
        };
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * @desc  Validates image URLs (Cloudinary only)
 * TODO: Users dont upload cloudinary link. We use "form data" in FE and then save images using cloudinary and send the link to the backend
 */
export const checkImages = () => {
  return (req, res, next) => {
    try {
      const { images } = req.body;
      if (!images || !images.length) return next();

      req.body.images = images.map((url) => {
        validateUrl(url);
        if (!url.includes("cloudinary.com")) {
          throw createError(400, "Images must be hosted on Cloudinary");
        }
        return url;
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * @desc  Validates social media links
 */
export const checkSocialLinks = () => {
  return (req, res, next) => {
    try {
      const { socialLinks } = req.body;
      if (!socialLinks || !socialLinks.length) return next();

      const allowedDomains = [
        "instagram.com",
        "facebook.com",
        "twitter.com",
        "linkedin.com",
        "tiktok.com",
        "youtube.com",
        "soundcloud.com",
        "spotify.com",
      ];

      req.body.socialLinks = socialLinks.map((url) => {
        validateUrl(url);
        if (!allowedDomains.some((domain) => url.includes(domain))) {
          throw createError(
            400,
            `Invalid social media link. Allowed: ${allowedDomains.join(", ")}`
          );
        }
        return url;
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Helper function to validate URLs
const validateUrl = (url) => {
  try {
    new URL(url);
  } catch (error) {
    throw createError(400, "Invalid URL format");
  }
};

// Helper function to convert URLs to embed format
const convertToEmbed = (url, platform) => {
  switch (platform) {
    case "YouTube":
      const youtubeMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\s]+)/
      );
      if (!youtubeMatch) {
        throw createError(400, "Invalid YouTube URL format");
      }
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;

    case "Vimeo":
      const vimeoMatch = url.match(/vimeo\.com\/([0-9]+)/);
      if (!vimeoMatch) {
        throw createError(400, "Invalid Vimeo URL format");
      }
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

    case "Spotify":
      const spotifyMatch = url.match(
        /spotify\.com\/(?:track|album|playlist)\/([a-zA-Z0-9]+)/
      );
      if (!spotifyMatch) {
        throw createError(400, "Invalid Spotify URL format");
      }
      return `https://open.spotify.com/embed/${spotifyMatch[1]}`;

    case "SoundCloud":
      const soundcloudMatch = url.match(/soundcloud\.com\/([^\/]+\/[^\/]+)/);
      if (!soundcloudMatch) {
        throw createError(400, "Invalid SoundCloud URL format");
      }
      return `https://w.soundcloud.com/player/?url=${soundcloudMatch[1]}`;

    case "Bandcamp":
      const bandcampMatch = url.match(
        /([a-zA-Z0-9-]+\.bandcamp\.com\/track\/[a-zA-Z0-9-]+)/
      );
      if (!bandcampMatch) {
        throw createError(400, "Invalid Bandcamp URL format");
      }
      return `https://bandcamp.com/EmbeddedPlayer/track=${bandcampMatch[1]}`;

    case "Apple Music":
      const appleMusicMatch = url.match(
        /music\.apple\.com\/(?:\w+\/)?(?:album|playlist)\/[^\/]+\/([0-9]+)/
      );
      if (!appleMusicMatch) {
        throw createError(400, "Invalid Apple Music URL format");
      }
      return `https://embed.music.apple.com/embed/album/${appleMusicMatch[1]}`;

    case "Audiomack":
      const audiomackMatch = url.match(/audiomack\.com\/([^\/]+\/[^\/]+)/);
      if (!audiomackMatch) {
        throw createError(400, "Invalid Audiomack URL format");
      }
      return `https://audiomack.com/embed/${audiomackMatch[1]}`;

    default:
      throw createError(
        400,
        `Embed conversion not supported for platform: ${platform}`
      );
  }
};
