// Google Reviews API Integration
// Fetches reviews from Google Places API

export interface GoogleReview {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

export interface GooglePlaceDetails {
  name: string
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
}

/**
 * Fetch Google Reviews for a business
 * @param placeId - Your Google Place ID
 * @param apiKey - Your Google Places API key
 * @returns Place details with reviews
 */
export async function fetchGoogleReviews(
  placeId: string,
  apiKey: string
): Promise<GooglePlaceDetails | null> {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
    
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK' && data.result) {
      return {
        name: data.result.name,
        rating: data.result.rating,
        user_ratings_total: data.result.user_ratings_total,
        reviews: data.result.reviews || []
      }
    }

    console.error('Google Places API error:', data.status)
    return null
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return null
  }
}

/**
 * Get your Google Place ID
 * Visit: https://developers.google.com/maps/documentation/places/web-service/place-id
 * Or use: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 */


