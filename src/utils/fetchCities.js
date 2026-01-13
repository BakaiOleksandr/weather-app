import {API_KEY} from './api_key';
export async function fetchCities(query) {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    const data = await response.json();

    return data;
  } catch {
    return [];
  }
}
