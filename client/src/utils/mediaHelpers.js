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
