import createError from "http-errors";

/**
 * @desc  Validates and converts media links to embed format
 */
export const checkMediaLinks = (req, res, next) => {
  try {
    const { media } = req.body;
    if (!media || !media.length)
      return next(createError(400, "No media link provided"));

    const allowedPlatforms = ["YouTube", "Spotify", "SoundCloud"];

    req.body.media = media.map((item) => {
      if (!item.url || !item.platform) {
        return next(
          createError(400, "Media items must include both URL and platform")
        );
      }

      if (!allowedPlatforms.includes(item.platform)) {
        return next(
          createError(
            400,
            `Invalid platform. Allowed: ${allowedPlatforms.join(", ")}`
          )
        );
      }

      return {
        ...item,
        url: convertToEmbed(item.url, item.platform, next),
      };
    });

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Validates social media links
 */
export const checkSocialLinks = (req, res, next) => {
  try {
    const { socialLinks } = req.body;

    if (!socialLinks || !socialLinks.length)
      return next(createError(400, "No social links provided"));

    const allowedDomains = [
      "instagram.com",
      "facebook.com",
      "linkedin.com",
      "tiktok.com",
      "youtube.com",
      "soundcloud.com",
      "spotify.com",
    ];

    req.body.socialLinks = socialLinks.map((url) => {
      validateUrl(url);
      if (!allowedDomains.some((domain) => url.includes(domain))) {
        return next(
          createError(
            400,
            `Invalid social media link. Allowed: ${allowedDomains.join(", ")}`
          )
        );
      }
      return url;
    });

    next();
  } catch (error) {
    next(error);
  }
};

// Helper function to validate URLs
const validateUrl = (url) => {
  try {
    new URL(url);
  } catch (error) {
    return next(createError(400, "Invalid URL format"));
  }
};

// Helper function to convert URLs to embed format
const convertToEmbed = (url, platform, next) => {
  switch (platform) {
    case "YouTube":
      const youtubeMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\s]+)/
      );
      if (!youtubeMatch) {
        return next(createError(400, "Invalid YouTube URL format"));
      }
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;

    case "Spotify":
      const spotifyMatch = url.match(
        /https:\/\/open\.spotify\.com\/(?:intl-[a-z]{2}\/)?track\/([a-zA-Z0-9]+)(?:\?si=[a-zA-Z0-9]+)?/
      );
      if (!spotifyMatch) {
        return next(createError(400, "Invalid Spotify URL format"));
      }
      return `https://open.spotify.com/embed/${spotifyMatch[1]}`;

    case "SoundCloud":
      const soundcloudMatch = url.match(/soundcloud\.com\/([^\/]+\/[^\/]+)/);
      if (!soundcloudMatch) {
        return next(createError(400, "Invalid SoundCloud URL format"));
      }
      return `https://w.soundcloud.com/player/?url=${soundcloudMatch[1]}`;

    default:
      return next(
        createError(
          400,
          `Embed conversion not supported for platform: ${platform}`
        )
      );
  }
};
