// Create a new utility file for shared media helpers
export const getYouTubeId = (url) => {
  // Handle both regular and embed URLs
  if (url.includes("embed/")) {
    return url.split("embed/")[1];
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const getSpotifyId = (url) => {
  // Handle both regular and embed URLs
  if (url.includes("embed/")) {
    return url.split("embed/")[1];
  }
  const trackId = url.split("/track/")[1]?.split("?")[0];
  return trackId || null;
};

export const getSoundCloudUrl = (url) => {
  // If it's already a player URL, return it
  if (url.includes("w.soundcloud.com/player")) {
    return url;
  }
  // Otherwise, construct the player URL
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url
  )}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false&show_playcount=false`;
};

// Constant for platform ordering
export const MEDIA_PLATFORM_ORDER = ["YouTube", "Spotify", "SoundCloud"];
