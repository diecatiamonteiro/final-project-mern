import createError from "http-errors";

/**
 * @desc  Validates and converts media links to embed format
 */
export const checkMediaLinks = (req, res, next) => {
  try {
    const { media } = req.body;

    // If no media is provided, continue without validation
    if (!media || !media.length) {
      return next();
    }

    const allowedPlatforms = ["YouTube", "Spotify", "SoundCloud"];

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

/**
 * @desc  Validates social media links
 */
export const checkSocialLinks = (req, res, next) => {
  try {
    const { socialLinks } = req.body;

    // If no social links are provided, continue without validation
    if (!socialLinks || !socialLinks.length) {
      return next();
    }

    req.body.socialLinks = socialLinks.map((url) => {
      try {
        const parsedUrl = new URL(url);

        // Security checks
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          return next(createError(400, "URLs must use HTTP or HTTPS protocol"));
        }

        // Prevent localhost, private IP addresses, and internal network access
        const hostname = parsedUrl.hostname.toLowerCase();
        if (
          hostname === "localhost" ||
          hostname.startsWith("127.") ||
          hostname.startsWith("192.168.") ||
          hostname.startsWith("10.") ||
          hostname.startsWith("169.254.") ||
          hostname.endsWith(".local") ||
          hostname.endsWith(".internal")
        ) {
          return next(createError(400, "Invalid domain"));
        }

        return url;
      } catch (error) {
        return next(createError(400, "Invalid URL format"));
      }
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
const convertToEmbed = (url, platform) => {
  switch (platform) {
    case "YouTube": {
      const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\s]+)/
      );
      if (!match) throw createError(400, "Invalid YouTube URL format");
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    case "Spotify":
      const spotifyMatch =
        url.match(/\/track\/([a-zA-Z0-9]+)(?:\?si=[a-zA-Z0-9]+)?/) ||
        url.match(/\/embed\/([a-zA-Z0-9]+)/); // <-- NEW: handle embed format

      if (!spotifyMatch) {
        return next(createError(400, "Invalid Spotify URL format"));
      }

      return `https://open.spotify.com/embed/${spotifyMatch[1]}`;

    case "SoundCloud": {
      const match = url.match(/soundcloud\.com\/([^\/]+\/[^\/]+)/);
      if (!match) throw createError(400, "Invalid SoundCloud URL format");
      return `https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2F${match[1]}`;
    }

    default:
      throw createError(
        400,
        `Embed conversion not supported for platform: ${platform}`
      );
  }
};
