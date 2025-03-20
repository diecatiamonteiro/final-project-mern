const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchCityImage = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${cityName}+germany+city&orientation=landscape&per_page=1&content_filter=high`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    const data = await response.json();
    
    // Get the first result from the search
    if (data.results && data.results.length > 0) {
      // Add quality and size parameters to the URL
      const imageUrl = new URL(data.results[0].urls.regular);
      imageUrl.searchParams.set('q', '85');
      imageUrl.searchParams.set('w', '800');
      imageUrl.searchParams.set('fit', 'crop');
      return imageUrl.toString();
    }
    
    throw new Error('No image found');
  } catch (error) {
    console.error(`Error fetching image for ${cityName}:`, error);
    // Fallback to a default city image
    return 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=85';
  }
};
