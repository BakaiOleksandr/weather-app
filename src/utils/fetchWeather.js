import {API_KEY} from './api_key';
export async function fetchWeather(city, country) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error of loading');
  }

  return data;
}
